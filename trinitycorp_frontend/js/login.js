//Obtener formulario
const formulario = document.querySelector(".login");

//Event listeners
window.addEventListener("load", ()=>{
  lougoutCualquierUsuario()
})

formulario.addEventListener("submit", (evento)=>{
  evento.preventDefault();
  validarDatos()
})


//Verifica con la api si el usuario existe o no
function validarDatos(){
  let usuario;
  let datos = obtenerDatosFormulario();
  let arrUsrPass = filtrarArray(datos)
  fetch(`http://localhost:8080/s/login?usr=${arrUsrPass[0]}&pass=${arrUsrPass[1]}`)
    .then(res => res.json())
    .then(datosUser => {
      if (datosUser.length == 0){
        alert("Los datos ingresados son incorrectos, intente de nuevo.")
      }
      else{
        alert("Datos ingresados Correctamente")
        console.log(datosUser[0].ID_USUARIO)
        usuario = datosUser[0]
      }
    })
    .catch(err => console.log(err))
    .finally(()=>{
      setUserLogin(usuario.ID_USUARIO); 
      window.location.assign('./index.html')
    })
}


function obtenerDatosFormulario(){
  const datosFormulario = new FormData(formulario);
  const datosFormularioArray = [...datosFormulario];
  return datosFormularioArray;
}

//Coloca si el usuario se encuentra activo o no
function setUserLogin(id_usuario){
  fetch(`http://localhost:8080/s/activo?id=${id_usuario}`)
    .catch(err => console.log(err))
}

function lougoutCualquierUsuario(){
  fetch('http://localhost:8080/s/logout')
    .catch(err => console.log(err))
}

function filtrarArray(array){
  return array.map(elemento =>{
    return elemento[1]
  })
}