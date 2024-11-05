class myTabs {
  constructor(id, activeTab, options) {
    this.activeTab = activeTab - 1 || 0;
    let defaultOptions = {
      isChanged: () => {},
    };

    this.options = Object.assign(defaultOptions, options);
    this.id = id;
    this.tabs = document.getElementById(id);

    if (this.tabs) {
      this.tabList = this.tabs.querySelector('.tabs__nav');
      this.tabsButtons = this.tabs.querySelectorAll('.tabs__nav-button');
      this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
    } else {
      throw new Error('Передан неправильный id или элемент tabs отсутствует на странице');
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if (document.querySelectorAll(`#${this.id}`).length > 1) {
      throw Error('В html обнаружен повторяющийся id табов.');
    }

    if (this.tabsButtons.length !== this.tabsPanels.length) {
      throw Error('В html неодинаковое количество кнопок и полей табов.');
    }
  }

  init() {
    this.tabsButtons[this.activeTab].classList.add('tabs__nav-button_active');
    this.tabsButtons[this.activeTab].removeAttribute('tabindex');
    this.tabsButtons[this.activeTab].setAttribute('aria-selected', 'true');

    this.tabsPanels[this.activeTab].classList.add('tabs__panel_active');
  }
  events() {
    this.tabsButtons.forEach((elem, i) => {
      elem.addEventListener('click', e => this.handlerTabsClick(e));

      elem.addEventListener('keydown', e => this.handlerTabsKeydown(e, i));
    });

    this.tabsPanels.forEach((elem, i) => {
      elem.addEventListener('keydown', e => this.handlerPanelsKeydown(e, i));
    });
  }

  handlerTabsClick(e) {
    let currentTab = this.tabList.querySelector('.tabs__nav-button_active');
    if (currentTab !== e.currentTarget) {
      this.switchTabs(e.currentTarget, currentTab);
    }
  }

  handlerTabsKeydown(e, i) {
    let index = Array.prototype.indexOf.call(this.tabsButtons, e.currentTarget);
    let direction = null;

    if (e.code === 'ArrowLeft') {
      direction = index - 1;
    } else if (e.code === 'ArrowRight') {
      direction = index + 1;
    } else if (e.code === 'ArrowDown') {
      this.tabsPanels[i].focus();
    }

    if (direction !== null && this.tabsButtons[direction]) {
      this.switchTabs(this.tabsButtons[direction], e.currentTarget);
    }
  }
  handlerPanelsKeydown(e, i) {
    if (e.code === 'ArrowUp') {
      this.tabsButtons[i].focus();
    }
  }

  switchTabs(newTab, currentTab) {
    newTab.focus();

    currentTab.setAttribute('tabindex', '-1');
    newTab.removeAttribute('tabindex');

    currentTab.removeAttribute('aria-selected');
    newTab.setAttribute('aria-selected', 'true');

    currentTab.classList.remove('tabs__nav-button_active');
    newTab.classList.add('tabs__nav-button_active');

    // определяем индексы кнопок в коллекции
    let currentIndex = Array.prototype.indexOf.call(this.tabsButtons, currentTab);
    let newIndex = Array.prototype.indexOf.call(this.tabsButtons, newTab);
    // индекс кнопки === индексу его панели
    this.tabsPanels[currentIndex].classList.remove('tabs__panel_active');
    this.tabsPanels[newIndex].classList.add('tabs__panel_active');

    this.options.isChanged(this);
  }
}
