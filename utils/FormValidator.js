import { enableValidation, isValidInputs, resetInputValues } from "./utils.js";

export class FormValidator {
  constructor(Config, formElement) {
    this._Config = Config;
    this._formElement = formElement;
  }

  _addInputListeners() {
    const inputFields = this._formElement.querySelectorAll(
      this._Config.inputSelector
    );

    inputFields.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        isValidInputs(inputField);
      });
    });
    return inputFields;
  }

  _addSubmitButtonListener() {
    const submitButton = this._formElement.querySelector(
      this._Config.submitButtonSelector
    );
    submitButton.addEventListener("submit", (event) => {
      event.preventDefault();
      submitButton.disabled = true;
    });
  }

  _resetInput(formElement) {
    this._resetInput = resetInputValues(formElement);

    return this._resetInput;
  }

  enableValidation() {
    // Activar la validación del formulario
    this._enableValidation = enableValidation();
    return this._enableValidation;
  }
}
