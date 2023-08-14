//Elementos html
const botonInsertar = document.querySelector(".insert-button")
const formulario = document.querySelector('.insert')
const nombreSede = document.querySelector('.line-name')

//Variables a utilizar
let idSede;

//Event listeners
window.addEventListener("load", () => {
  mostrarNombreCiudad();
})

formulario.addEventListener("submit", (evento)=>{
  evento.preventDefault();
  enviarDatosLinea()
  validarIngresado()
})

//Funciones 
function enviarDatosLinea(){
  const produccion = obtenerDatosFormulario();
  const payload = {
    "SEDE": idSede,
    "L1": 1,
    "L2": 2,
    "L3": 3,
    "CANT1": parseInt(produccion[0]),
    "CANT2": parseInt(produccion[1]),
    "CANT3": parseInt(produccion[2]),
    "FECHA": new Date().toJSON().slice(0,10)
  }
  fetch('http://localhost:8080/i/produccion', {
    method: "POST",
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

//Validamos si en el día de la fecha se han ingresado datos 
function validarIngresado(){
  //Creando el dia de hoy
  const fechaHoy = new Date();
  const diaHoy = fechaHoy.getDate();
  const mesHoy = fechaHoy.getMonth()+1;
  const anioHoy = fechaHoy.getFullYear();
  let diaCompletoHoy;
  //Validando si el mes es menor a 10, ya que el mes se muestra sin 0
  if (mesHoy < 10){
    diaCompletoHoy = `${anioHoy}-0${mesHoy}-${diaHoy}`
  }
  else{
    diaCompletoHoy = `${anioHoy}-${mesHoy}-${diaHoy}`
  }
  //Obteniendo los inputs para deshabilitarlos si ya se ingresó en la fecha de hoy
  const inputA = document.querySelector('.input-lineA')
  const inputB = document.querySelector('.input-lineB')
  const inputC = document.querySelector('.input-lineC')
  const boton = document.querySelector('.insert-button')
  const mensaje = document.querySelector('.alertMessage')
  fetch(`http://localhost:8080/c/produccion/fechas?fecha=${diaCompletoHoy}&sede=${idSede}`)
  .then(res => res.json())
  .then(info => {
    if (info.length != 0){
      inputA.disabled = true;
      inputB.disabled = true;
      inputC.disabled = true;
      boton.disabled = true;
      
      const mensajeTexto = document.createTextNode('Ya ingresó los datos por el día de hoy, vuelva mañana');
      mensaje.appendChild(mensajeTexto)
    }
  })
}


function obtenerDatosFormulario(){
  const datosFormulario = new FormData(formulario);
  const datosFormularioArray = [...datosFormulario];
  return filtrarArray(datosFormularioArray);
  // return datosFormularioArray;
}

//Muestra el nombre de la ciudad en la parte superior
function mostrarNombreCiudad(){
  fetch('http://localhost:8080/c/usuarios/activos')
  .then(res => res.json())
  .then(datos => {
    const nombreCiudad = document.createTextNode(`${datos[0].ciudad}`)
    nombreSede.appendChild(nombreCiudad)
    idSede = datos[0].id_sede
    
  })
  .finally(() =>
    validarIngresado()
  )
}

function filtrarArray(array){
  return array.map(elemento => {
    return elemento[1]
  })
}