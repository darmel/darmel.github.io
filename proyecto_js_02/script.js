console.log("hoala a todos");

const minusculas = "abcdefghijklmnopqrstuvwxyz";
const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeros = "0123456789";
const simbolos = "!@#$%&*()_+-[]{}\\|;':\",./<>?";

const lengthEl = document.getElementById("lenght");
const minusEl = document.getElementById("minus");
const mayusEl = document.getElementById("mayus");
const numEl = document.getElementById("num");
const symbolEl = document.getElementById("simb");

const passwordEl = document.getElementById("password");

const generarBtn = document.getElementById("generar");

//listener
generarBtn.addEventListener("click", crearContrasena);

function crearContrasena() {
  let lenght = 8;
  if (lengthEl.value <= 8) {
    lenght = 8;
    console.log("lenght: " + lenght);
  } else if (lengthEl.value >= 64) {
    lenght = 64;
  } else {
    lenght = lengthEl.value;
  }
  console.log("lenght: " + lenght);
  //const lenght = lengthEl.value;

  let caracteres = "";
  let password = "";

  if (minusEl.checked) {
    caracteres += minusculas;
  }

  if (mayusEl.checked) {
    caracteres += mayusculas;
  }

  if (numEl.checked) {
    caracteres += numeros;
  }

  if (symbolEl.checked) {
    caracteres += simbolos;
  }

  //crea la password acorde al largo
  //le va a gregando un caracter random de toda la lista que creamos
  for (let i = 0; i < lenght; i++) {
    password += caracteres.charAt(Math.random() * caracteres.length);
  }

  //console.log(caracteres);

  console.log(password);

  passwordEl.value = password;
}
