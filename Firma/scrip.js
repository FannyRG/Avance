const $canvas = document.querySelector("#canvas"),
$btnDescargar = document.querySelector("#btnDescargar"),
$btnLimpiar = document.querySelector("#btnLimpiar"),
$btnDescgarDocumento = document.querySelector("#btnGnererarDocumento");

const contexto = $canvas.getContext("2d");
const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 2 ;

let xAnterio = 0 , yAnterior= 0, xActual = 0 ,yActual = 0;
const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left;
const obtenerYReal = (clienteY) => clienteY - $canvas.getBoundingClientRect().top;
// inidca si el usuario  esta presionando el boton del mouse sin soltarlo 
let haComenzandoDibujo = false; 

//limpiar
 const limpiarcanvas = () => {
     //colocar el color balnco en fondo
     contexto.fillStyle = COLOR_FONDO;
    contexto.fillRect(0, 0, $canvas.width, $canvas.height);
 };
 limpiarcanvas(); 
 $btnLimpiar.onclick = limpiarcanvas;
  $btnDescargar.onclick = () =>{
      const enlace = document.createElement('a');

      //creamos el  nombre del archivo que se guardara
      enlace.download = "Tu firma.png";

      //convertimos la imagen a base64 y ponerlo en el enlace 
      enlace.href = $canvas.toDataURL();

      //hacemos el click  en el 
      enlace.click();
  };

  window.obtenerImagen = () => {
      return $canvas.toDataURL();
  };

  //habrimos el archivo de html para genera el documento cuanod damos click al boton de generar
  $btnDescgarDocumento.onclick = () =>{
       window.open("documento.html");
  };
  //mostrar a los demas qye tiene que ver con pintar sobre canvas en los eventos del mouse
$canvas.addEventListener("mousedown",evento =>{
    //iniciamos el click 
    xAnterio = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clienteY);
    contexto.beginPath(); //comezamos ruta 
    contexto.fillStyle = COLOR_PINCEL;
    contexto.fillRect(xActual, yActual, GROSOR ,GROSOR);
    contexto.closePath();
    // Y establecemos la bandera
    haComenzandoDibujo = true;
});

  $canvas.addEventListener("mousemove",(evento)=>{
      if(!haComenzandoDibujo){
          return;
      }
      
      //el mouse se esta moviendo esta presionando el boton asi que dibujamos
      xAnterio = xActual;
      yAnterior = yActual;
      xActual = obtenerXReal(evento.clientX);
      yActual = obtenerYReal(evento.clientY);
      contexto.beginPath();
      contexto.moveTo(xAnterio, yAnterior);
      contexto.lineTo(xActual, yActual);
      contexto.strokeStyle = COLOR_PINCEL;
      contexto.lineWidth = GROSOR;
      contexto.stroke();
      contexto.closePath();
  });
  ["mouseup", "mouseout"].forEach(nombreDeEvento => {
      $canvas.addEventListener(nombreDeEvento, () => {
        haComenzandoDibujo = false;
      });
  });
