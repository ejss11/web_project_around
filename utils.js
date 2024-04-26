export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//Configuracion de clases de Formularios
export const fromConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_has_error",
  errorClass: ".form__input-error_type_",
  inputErrorSpamClass: ".form__input-error",
};
//Funcion para resetear los  campos de los formularios
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
//Funcion para cerrar Formulario  y popup por el Overlay
export function closePopupOverlay(event) {
  const popup = event.target.closest(".popup");
  if (popup) {
    resetInputValues(popup);
    popup.classList.remove("popup_open");
  }
}
//Funcion para cerrar  popup por evento  ESC
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
    submitButton.disabled = !isValidInputs(formInputs);
  });
}
//Funcion para activar validacion por formulario
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
//Funcion Abrir Popup
export function openPopup(popup) {
  popup.classList.add("popup_open");
}
//Funcion Cerrar Popup
export function ClosePopup(popup) {
  popup.classList.remove("popup_open");
}
