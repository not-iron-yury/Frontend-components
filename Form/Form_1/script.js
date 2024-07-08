//================= Маска нормера телефона =================//
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll("#tel"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

//======================== Валидация ========================//
const labelName = document.querySelector(".form__label--name");
const inputName = document.getElementById("name");
const labelTel = document.querySelector(".form__label--tel");
const inputTel = document.getElementById("tel");
let telValidate = false;

// let nameValidate = false;
// inputName.addEventListener("change", (e) => {
//   if (/\d+/.test(e.target.value)) {
//     labelName.textContent = "Введите корректное имя";
//     labelName.style.color = "red";
//   } else if (e.target.value.length < 2) {
//     labelName.textContent = "Слишком короткое имя";
//     labelName.style.color = "red";
//   } else if (e.target.value.length > 1) {
//     nameValidate = true;
//     labelName.textContent = "Ваше имя";
//     labelName.style.color = "#000000b3";
//   }
// });

inputTel.addEventListener("change", (e) => {
  if (e.target.value.length !== 17) {
    labelTel.textContent = "Номер введен не корректно";
    labelTel.style.color = "red";
  } else {
    telValidate = true;
    labelTel.innerHTML = "Номер телефона<span>*</span>";
    labelTel.style.color = "#000000b3";
  }
});

//===================== Отправка данных =====================//
const form = document.querySelector(".form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (telValidate) {
    const data = {
      name: inputName.value,
      tel: inputTel.value,
    };

    const response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      alert("Заебца");
      //window.location.href = 'https://новый url'
    }
  }
});
