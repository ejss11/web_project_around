export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._rendererdItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  render() {
    this.clear();
    this._rendererdItems.forEach((item) => {
      const rendererdItem = this._renderer(item);
      this.addItem(rendererdItem);
    });
  }
}
