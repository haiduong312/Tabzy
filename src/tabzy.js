function Tabzy(selector) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error("error");
    return;
  }

  this.tabs = Array.from(this.container.querySelectorAll("li a"));
  if (!this.tabs.length) {
    console.error("no tabs inside");
    return;
  }

  this.panels = this.tabs
    .map((tab) => {
      const panel = document.querySelector(tab.getAttribute("href"));
      if (!panel) {
        console.error("error at panel");
      }
      return panel;
    })
    .filter(Boolean);

  if (this.tabs.length !== this.panels.length) {
    return;
  }
  console.log("aaaa");
  this._init();
}

Tabzy.prototype._init = function () {
  const tabActive = this.tabs[0];
  tabActive.closest("li").classList.add("tabzy--active");
  this.panels.forEach((panel) => {
    panel.hidden = true;
  });
  this.panels[0].hidden = false;

  this.tabs.forEach((tab) => {
    tab.onclick = (event) => {
      this._handleTabClick(event, tab);
    };
  });
};

Tabzy.prototype._handleTabClick = function (event, tab) {
  event.preventDefault();
  this.tabs.forEach((tab) => {
    tab.closest("li").classList.remove("tabzy--active");
  });
  tab.closest("li").classList.add("tabzy--active");

  this.panels.forEach((panel) => {
    panel.hidden = true;
  });
  const panelActive = document.querySelector(tab.getAttribute("href"));
  panelActive.hidden = false;
};
