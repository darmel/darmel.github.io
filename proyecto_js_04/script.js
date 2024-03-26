console.log("hola a todos");

function calcular() {
    //valores de entrada
    const product1 = document.getElementById("product1").value;
    console.log(product1);
    const precio1 = parseFloat(document.getElementById("precio1").value);
    const cantidad1 = parseFloat(document.getElementById("cantidad1").value);

    //unidades
    var unidad1 = "";

    //funcion poara obtener el radio seleccionado
    if (document.getElementById("kg1").checked == true) {
        console.log("Kg");
        unidad1 = "kg";
    } else if (document.getElementById("g1").checked == true) {
        console.log("g");
        unidad1 = "g";
    } else if (document.getElementById("l1").checked == true) {
        console.log("l");
        unidad1 = "l";
    }

    //calculo
    precioPorunidad1 = parseFloat(precio1 / cantidad1);
    switch (unidad1) {
        case "g":
            var i = precioPorunidad1 * 1000;
            document.getElementById("precioPorKg1").textContent = "el precio es $" + i + " por kg";
            document.getElementById("precioPorg1").textContent = "el precio es $" + i / 1000 + " por g";
            break;
        case "kg":
            var i = precioPorunidad1 * 1;
            document.getElementById("precioPorKg1").textContent = "el precio es $" + i + " por kg";
            document.getElementById("precioPorg1").textContent = "el precio es $" + i / 1000 + " por g";
            break;
    }
}
