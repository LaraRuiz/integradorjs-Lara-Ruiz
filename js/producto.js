
let menosBtn = document.querySelector('.input__menos');
let masBtn = document.querySelector('.input__mas');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

masBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;

});

menosBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    
}); 

const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.numerito');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click',()=>{
   
    lastValue = lastValue + userInputNumber;
    cartNotification.innerText = lastValue;
});

addToCartBtn.addEventListener('click', agregarAlCarrito);


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    let userInput = document.querySelector('.input__number');

    let lastValue = lastValue + userInputNumber;
    let userInputNumber = userInput.value;


    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad = userInputNumber;
    } else {
        productoAgregado.cantidad = userInputNumber;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

