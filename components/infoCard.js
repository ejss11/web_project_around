export class infoCard {
  constructor({ nameTitleSelector, linkImageSelector }) {
    this._nameTitleSelector = nameTitleSelector;
    this._linkImageSelector = linkImageSelector;
  }

  getPopupAddCardInfo() {
    return {
      name: this._nameTitleSelector.textContent,
      link: this._linkImageSelector.textContent,
    };
  }

  setCardInfo({ name, link }) {
    this._nameTitleSelector.textContent = name;
    this._linkImageSelector.textContent = link;
  }
}
