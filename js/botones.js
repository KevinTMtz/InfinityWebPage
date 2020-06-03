let arregloContenidos = document.getElementsByClassName('content');
let arregloBotones = document.getElementsByClassName('button');
let contenedoresBotones = document.getElementsByClassName("div-btn");

for(let i = 0; i < contenedoresBotones.length; i++){
  contenedoresBotones[i].onmouseover = function(){
    arregloBotones[i].classList.remove("dark-button");
    arregloBotones[i].classList.add("light-button");
  };
  contenedoresBotones[i].onmouseout = function(){
    arregloBotones[i].classList.remove("light-button");
    arregloBotones[i].classList.add("dark-button");
  };
}

mostrarContenido(0);

function mostrarContenido(numBoton){
  for (var i = 0; i < arregloContenidos.length; i++) {
    arregloContenidos[i].style.display = "none";
  }
  arregloContenidos[numBoton].style.display = "block";
  for (var i = 0; i < arregloBotones.length; i++) {
    arregloBotones[i].classList.add("dark-button");
    arregloBotones[i].classList.remove("button-selected");
  }
  arregloBotones[numBoton].classList.add("button-selected");
}
