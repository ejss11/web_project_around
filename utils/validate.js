import { ClosePopup } from "./index.js";
//Formularios reset
const fromConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_has_error",
  errorClass: ".form__input-error_type_",
  inputErrorSpamClass: ".form__input-error",
};

export function resetInputValues(form) {
  const inputs = form.querySelectorAll(fromConfig.inputSelector);

  inputs.forEach((input) => {
    const errorNode = form.querySelector(
      `${fromConfig.errorClass + input.name}`
    );
    input.value = "";
    input.classList.remove(fromConfig.inputErrorClass);
    errorNode.textContent = "";
  });
}

export function closePopupOverlay(event) {
  const popup = event.target.closest(".popup");
  if (popup) {
    resetInputValues(popup);
    popup.classList.remove("popup_open");
  }
}

export function closePopupOnEscape(event) {
  const popup = Array.from(document.querySelectorAll(".popup"));

  if (event.key === "Escape") {
    popup.forEach((pop) => {
      resetInputValues(pop);
      ClosePopup(pop);
    });
  }
}

//Validacion del Formularios (Editar Perfil)
export function setEventListeners(form, fromConfig) {
  const formInputs = Array.from(
    form.querySelectorAll(fromConfig.inputSelector)
  );
  const submitButton = form.querySelector(fromConfig.submitButtonSelector);

  formInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      const errorNode = form.querySelector(
        `${fromConfig.errorClass + inputElement.name}`
      );
      if (!inputElement.validity.valid) {
        inputElement.classList.add(fromConfig.inputErrorClass);
        errorNode.textContent = inputElement.validationMessage;
      } else {
        inputElement.classList.remove(fromConfig.inputErrorClass);
        errorNode.textContent = "";
      }
      submitButton.disabled = !isValidInputs(formInputs);
    });
  });
}

export function enableValidation() {
  const forms = document.querySelectorAll(fromConfig.formSelector);
  forms.forEach((formElement) => {
    setEventListeners(formElement, fromConfig);
  });
}

export function isValidInputs(formInputs) {
  return formInputs.every((item) => {
    return item.validity.valid;
  });
}
