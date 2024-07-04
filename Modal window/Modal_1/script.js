const btnModal = document.getElementById("btn-modal");
const modal = document.getElementById("modal");
const modalClosse = document.getElementById("modal-close");

// открытие модалки
btnModal.addEventListener("click", openModal);

// закрытие по кнопке "close"
modalClosse.addEventListener("click", closeModal);

// закрытие через клик по серой области
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// закрытие по ESC
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Escape") {
    closeModal();
  }
});

function openModal() {
  modal.classList.add("modal--active");
}

function closeModal() {
  modal.classList.remove("modal--active");
}
