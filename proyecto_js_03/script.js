console.log("hola a todos");

function calculateTip() {
  //valores de entrada
  const billAmount = parseFloat(document.getElementById("bill").value);
  const tipPercentage = parseFloat(
    document.getElementById("tip-percentage").value
  );

  //calculos
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = tipAmount + billAmount;

  //mostrar resultados
  document.getElementById("tip-amount").textContent = "$ " + tipAmount;
  document.getElementById("total-amount").textContent =
    "$ " + (billAmount + tipAmount);
}
