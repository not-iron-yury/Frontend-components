/*
Параметры:
  id главног элемента таба, пример <article class="tabs" id="tabs1">
  номер активного таба от 1 (по умолчанию активный первый)
  дополнительные опции (позволяют получить доп доступ к элементам табов)
*/
const tabs1 = new myTabs('tabs1'); // инициализация с одним параметром
const tabs2 = new myTabs('tabs2', 2); // инициализация с двумя параметром

// const tabs1 = new myTabs('tabs1', {
//   isChanged: elem => {
//     console.log(elem); // элемент с id='tabs1' со всеми свойствами и элементами
//     console.log(elem.tabList); // <ul class="tabs__nav" role="tablist">...</ul>
//     console.log(elem.tabList.firstElementChild); // <li class="tabs__nav-item">...</li>
//   },
// });
