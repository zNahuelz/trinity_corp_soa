//Elementos html
const regresar = document.querySelector('.regresar');
const ingresar = document.querySelector('.ingresar');
const mostrar = document.querySelector('.mostrar');
const span_nombre = document.querySelector('.nombre_usuario')

//Event listeners
window.addEventListener("load", () =>{
  mostrarDatoUsuario()
})

regresar.addEventListener("click", (event) =>{
  event.preventDefault();
  lougoutUsuario()
})

ingresar.addEventListener("click", (event) =>{
  event.preventDefault();
  window.location.assign("./ingresarCantidades.html")
})

mostrar.addEventListener("click", (event) =>{
  event.preventDefault();
  window.location.assign("./mostrarCantidades.html")
})


//Funciones complementarias
function mostrarDatoUsuario(){
  fetch('http://localhost:8080/c/usuarios/activos')
  .then(res => res.json())
  .then(usuarioActivo => {
    let nombre = document.createTextNode(`${usuarioActivo[0].nombre}`)
    span_nombre.appendChild(nombre)
  })
  .catch(err => console.log(err))
}

function lougoutUsuario(){
  if (confirm("¿Desea Cerrar Sesión?")){
    fetch('http://localhost:8080/s/logout')
      .catch(err => console.log(err))
      .finally(()=> window.location.assign("./login.html"))
  }
}