console.log("hola a todos");
var i = 0;
function calcularPlazoFijo() {
  //obtener valores de formularios
  console.log("funcion");

  var capital = parseFloat(document.getElementById("capital").value);
  console.log("capital :" + capital);
  const tna = parseFloat(document.getElementById("tna").value);
  console.log("tasa de interes: " + tna);
  const dias = parseFloat(document.getElementById("dias").value);
  console.log("tiempo: " + dias);

  //calculo
  //var tasa = parseFloat((1 + tna / 100) ** (1 / 365)) - 1; calculo segun contador
  var tasa = parseFloat((tna / 365 / 100) * dias); //calculo del banco brubank

  retorno = parseFloat(capital + capital * tasa);

  //mostrar resultado
  document.getElementById("result").innerText =
    "Dinero obtenido: $" + retorno.toFixed(2);
  document.getElementById("interes").innerText =
    "interes ganado: " + tasa.toFixed(2) * 100 + " %";

  console.log(i);
  console.log(tasa);
  i++;
}

//listeners
var boton = document.getElementById("boton");

boton.addEventListener("click", calcularPlazoFijo);
