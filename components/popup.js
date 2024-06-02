import { classof } from "core-js/features/object";
import { resetInputValues } from "../utils/utils";

export default class Popup {
  constructor(popupSelector) {
    this.popup = popupSelector;
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
    const overlay = document.querySelectorAll(".popup__overlay");
    overlay.forEach((itemOver) => {
      itemOver.addEventListener("click", () => this.close());
    });

    // Agregar detector de la tecla Esc para cerrar el popup
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector); // Llama al constructor de la clase padre

    this.imageSelector = document.querySelector(imageSelector);
    this.captionSelector = document.querySelector(captionSelector);
  }

  open(imageUrl, imageCaption) {
    document.addEventListener("keydown", this._handleEscClose);
    this.imageSelector.src = imageUrl;
    this.captionSelector.textContent = imageCaption;
    super.open(); // Llama al método `open()` de la clase padre
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector); // Llama al constructor de la clase padre

    this.submitCallback = submitCallback;

    //this._setInputEventListeners(); // Agregar detectores de eventos a los campos de entrada
  }

  open() {
    super.open();
  }

  reset() {
    // Restablecer el formulario
    const form = this.popup.querySelector(".form");
    resetInputValues(form);
  }

  _getInputValues() {
    const fields = this.popup.querySelectorAll(".form__input");
    const values = {};

    for (const field of fields) {
      values[field.name] = field.value;
    }

    return values;
  }
  submitForm() {
    const formData = this._getInputValues();
    this.reset();
    return formData;
  }

  setEventListeners() {
    super.setEventListeners(); // Llamar al método del padre

    // Agregar controlador de eventos 'submit' al formulario
    const form = this.popup.querySelector(".form");
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita el envío del formulario por defecto
      this._handleEscClose(event);
      const formData = this._getInputValues(); // Obtener valores de entrada

      this.submitCallback(formData); // Llamar la función de devolución de llamada de envío
      this.close(); // Cerrar el popup
    });
  }

  close() {
    super.close(); // Llamar al método del padre
    //this.reset();
  }
}

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  close() {
    super.close();
  }

  _handleEscClose(event) {
    super._handleEscClose(event);
  }

  setEventListeners() {
    super.setEventListeners();
    // Agregar detector de la tecla Esc para cerrar el popup
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    const popupConfirmation = this.popup.querySelector(".form__submit");
    popupConfirmation.addEventListener("click", () => {
      this._handleConfirm();
      this.close();
    });
  }
}
