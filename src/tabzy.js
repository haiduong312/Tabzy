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

  this._originalHTMl = this.container.innerHTML;

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
  this._activeTab(this.tabs[0]);

  this.tabs.forEach((tab) => {
    tab.onclick = (event) => {
      this._handleTabClick(event, tab);
    };
  });
};

Tabzy.prototype._handleTabClick = function (event, tab) {
  event.preventDefault();
  this._activeTab(tab);
};

Tabzy.prototype._activeTab = function (tab) {
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

Tabzy.prototype.switch = function (input) {
  let tabToActive = null;

  if (typeof input === "string") {
    tabToActive = this.tabs.find((tab) => tab.getAttribute("href") === input);
    if (!tabToActive) {
      console.error("no tabToActive");
      return;
    }
  } else if (this.tabs.includes(input)) {
    tabToActive = input;
  }
  if (!tabToActive) {
    console.error("no tabToActive");
    return;
  }
  this._activeTab(tabToActive);
};

Tabzy.prototype.destroy = function () {
  this.container.innerHTML = this._originalHTMl;
  this.panels.forEach((panel) => {
    panel.hidden = false;
  });
  this.container = null;
  this.tabs = null;
  this.panels = null;
};
