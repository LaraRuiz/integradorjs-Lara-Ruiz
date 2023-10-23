let menosBtn = document.querySelector('.input__menos');
let masBtn = document.querySelector('.input__mas');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

masBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log('userInputNumber');
});

menosBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log('userInputNumber');
}); 

const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.numerito');

addToCartBtn.addEventListener('click',()=>{
    let lastValue = parseInt(cartNotification.innerText);
    lastValue = lastValue + userInputNumber;

    cartNotification.innerText = lastValue;
});

addToCartBtn.addEventListener('click', agregarAlCarrito);


