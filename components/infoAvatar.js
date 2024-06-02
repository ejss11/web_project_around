export class infoAvatar {
  constructor(urlNameSelector) {
    this._urlNameSelector = urlNameSelector;
  }

  getInfoAvatar() {
    return {
      avatar: this._urlNameSelector.textContent,
    };
  }
}
