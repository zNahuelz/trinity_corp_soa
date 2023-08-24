//Formulario 
const formulario = document.querySelector("form")
const regresar = document.querySelector(".regresar")

//Otras variables
let idSedeUsuario;
let nombreSedeUsuario;
let otrasSedes = [];

//EventListeners
window.addEventListener("load", ()=>{
  obtenerIdSede();
  obtenerListadoSedes();
})

regresar.addEventListener("click", (evento) => {
  evento.preventDefault();
  window.location.assign("./index.html")
})

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault()
  ordenDeTablas()
})

//Funciones complementarias
function obtenerIdSede(){
  fetch(`http://localhost:8080/c/usuarios/activos`)
    .then(res => res.json())
    .then(datosUsuarioActivo => {
      idSedeUsuario = datosUsuarioActivo[0].id_sede
      nombreSedeUsuario = datosUsuarioActivo[0].ciudad
    })
}

//Obtiene un listado de Sedes que sean distintas a la del usuario
function obtenerListadoSedes(){
  fetch(`http://localhost:8080/c/sedes`)
    .then(res => res.json())
    .then(datosSede => {
      datosSede.forEach(elemento => {
        if (elemento.id_sede != idSedeUsuario){
          otrasSedes.push(elemento)
        }
      })
    })
}

//Llama a la función obtenerProducción para agrear los datos en las respectivas tablas
function ordenDeTablas(){
  obtenerProduccion('first', nombreSedeUsuario, idSedeUsuario);
  obtenerProduccion('second', otrasSedes[0].ciudad, otrasSedes[0].id_sede);
  obtenerProduccion('third', otrasSedes[1].ciudad, otrasSedes[1].id_sede);
}

//Obtiene la producción dependiendo de la sede
function obtenerProduccion(orden_tabla, nombre_ciudad, sede){
  //Seleccionando el contenedor
  const tabla = document.querySelector(`.${orden_tabla}-city-table`);
  //Eliminando todos los hijos, si es que tiene
  while (tabla.firstChild){
    tabla.removeChild(tabla.firstChild)
  }
  const datos = obtenerDatosFormulario();
  fetch(`http://localhost:8080/c/rango_fechas?inicio=${datos[0]}&fin=${datos[1]}&sede=${sede}`)
    .then(res => res.json())
    .then(data => {
      let sumaTotal = 0;
      data.forEach(linea => {
        //Creando los textos
        const nombreCiudadTexto = document.createTextNode(nombre_ciudad);
        const nombreLineaTexto = document.createTextNode(linea.NOMBRE)
        const totalLineaTexto = document.createTextNode(linea.TOTAL)
        //Creando los contenedores de los textos
        const tr = document.createElement('tr')
        const nombreCiudadContenedor = document.createElement('td');
        const nombreLineaContenedor = document.createElement('td');
        const totalLineaContenedor = document.createElement('td');
        //Agregando el texto
        nombreCiudadContenedor.appendChild(nombreCiudadTexto);
        nombreLineaContenedor.appendChild(nombreLineaTexto);
        totalLineaContenedor.appendChild(totalLineaTexto);
        //Agregando contenedores a la tabla
        tr.appendChild(nombreCiudadContenedor);
        tr.appendChild(nombreLineaContenedor);
        tr.appendChild(totalLineaContenedor);
        tabla.appendChild(tr)
        //Sumando la proudcción de cada linea
        sumaTotal += linea.TOTAL
      });
      //Creando texto para el total
      const totalTexto = document.createTextNode("Total");
      const sumaTotalTexto = document.createTextNode(sumaTotal);
      //Creando contenedores para agregar las celdas y agregar los textos
      const tr = document.createElement("tr");
      const totalContenedor = document.createElement("td");
      const sumaTotalContenedor = document.createElement("td")
      sumaTotalContenedor.classList.add("texto_suma_total")
      totalContenedor.colSpan = 2;
      totalContenedor.classList.add("texto_total")
      //Agregando los textos 
      totalContenedor.appendChild(totalTexto);
      sumaTotalContenedor.appendChild(sumaTotalTexto);
      //Agregando celdas
      tr.appendChild(totalContenedor);
      tr.appendChild(sumaTotalContenedor)
      tabla.appendChild(tr)
    })
  
}

function obtenerDatosFormulario(){
  const datosFormulario = new FormData(formulario);
  const datosFormularioArray = [...datosFormulario];
  return filtrarArray(datosFormularioArray);
}

function filtrarArray(array){
  return array.map(elemento => {
    return elemento[1];
  })
}