import { fromConfig } from "../utils/constants.js";
import { api } from "../src/index.js";
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

export function renderLoading(isLoading, selector) {
  if (isLoading) {
    selector.textContent = "Guardando...";
  } else {
    selector.textContent = "Guardar";
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

//Funcion Contar Me Gusta
export function contarMeGusta(card) {
  //verificar que la propiedad likes exista y sea un array
  if (Array.isArray(card.likes)) {
    return card.likes.length;
  } else {
    return 0;
  }
}

/* export function removeCardFormServer(card, popupDeleteCardConfirm) {
  return () => {
    api
      .deleteCard(card.getCardId())
      .then(card.handleDeleteCard(), popupDeleteCardConfirm.close())
      .catch((err) => {
        console.error(`Error: ${err.status}`);
      });
  };
} */
