const buttonDecrease = document.getElementById('button-decrease');
const buttonIncrease = document.getElementById('button-increase');
const input = document.getElementById('quantity-input');

buttonDecrease.onclick = decreaseQuantity;
buttonIncrease.onclick = increaseQuantity;

function decreaseQuantity() {
  if (input.value > 1) {
    input.value = parseInt(input.value) - 1;
  }
}
function increaseQuantity() {
  input.value = parseInt(input.value) + 1;
}
