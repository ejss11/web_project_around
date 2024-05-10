export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); // Vincula la función al contexto de la clase

    this.setEventListeners();
  }

  open() {
    this.popup.classList.add("popup_open");
  }

  close() {
    this.popup.classList.remove("popup_open");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Agregar detector de click al icono de cerrar
    const closeButton = this.popup.querySelector(".popup__close-btn");
    closeButton.addEventListener("click", () => this.close());

    // Agregar detector de click al área sombreada del formulario (si es necesario)
    const overlay = document.querySelector(".popup__overlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.close());
    }

    // Agregar detector de la tecla Esc para cerrar el popup
    document.addEventListener("keydown", this._handleEscClose);
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector); // Llama al constructor de la clase padre

    this.image = document.querySelector(imageSelector);
    this.caption = document.querySelector(captionSelector);
  }

  open(imageUrl, imageCaption) {
    super.open(); // Llama al método `open()` de la clase padre

    this.image.src = imageUrl;
    this.caption.textContent = imageCaption;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector); // Llama al constructor de la clase padre

    this.submitCallback = submitCallback;

    this._setInputEventListeners(); // Agregar detectores de eventos a los campos de entrada
  }

  _getInputValues() {
    const fields = this.popup.querySelectorAll('input[type="text"], textarea');
    const values = {};

    for (const field of fields) {
      values[field.name] = field.value;
    }

    return values;
  }

  setEventListeners() {
    super.setEventListeners(); // Llamar al método del padre

    // Agregar controlador de eventos 'submit' al formulario
    const form = this.popup.querySelector(".form");
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita el envío del formulario por defecto

      const formData = this._getInputValues(); // Obtener valores de entrada

      this.submitCallback(formData); // Llamar la función de devolución de llamada de envío
      this.close(); // Cerrar el popup
    });
  }

  close() {
    super.close(); // Llamar al método del padre

    // Restablecer el formulario
    const form = this.popup.querySelector("form");
    form.reset();
  }
}
