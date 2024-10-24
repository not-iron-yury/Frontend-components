const input = document.querySelector('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

const updateThrottleText = throttle(text => {
  throttleText.textContent = text;
}, 500);

const updateDebounceText = debounce(text => {
  debounceText.textContent = text;
});

input.addEventListener('input', e => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});

/* debounce - функция, которая «откладывает» вызов другой функции */
function debounce(callBack, delayMs = 1000) {
  let timeout;

  return arg => {
    clearInterval(timeout);

    timeout = setTimeout(() => {
      callBack(arg);
    }, delayMs);
  };
}

/* throttle — это функция, которая вызывает другую функцию,
«пропуская» некоторые вызовы с определённой периодичностью */
function throttle(callBack, delayMs = 1000) {
  let isPaused = false;

  return (...arg) => {
    if (isPaused) return;

    callBack(...arg);
    isPaused = true;

    setTimeout(() => {
      isPaused = false;
    }, delayMs);
  };
}
