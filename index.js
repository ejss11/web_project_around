import { Card } from "./Card.js";
import {
  openPopup,
  ClosePopup,
  enableValidation,
  resetInputValues,
  closePopupOverlay,
  closePopupOnEscape,
  initialCards,
  fromConfig,
} from "./utils.js";

import { FormValidator } from "./FormValidator.js";

//Botones de Editar y Agregar Cards
const buttonEdit = document.querySelector(".profile__heading-edit");
const buttonAdd = document.querySelector(".profile__heading-add");
//Popup, formulario, perfil
const popupProfile = document.querySelector(".popup_content_profile");
const popupAddCard = document.querySelector(".popup_content_add-card");
const formProfile = popupProfile.querySelector(".form");
const formAddCard = popupAddCard.querySelector(".form");
const inputProfileName = formProfile.querySelector(".form__input[name=name]");
const inputProfileAbout = formProfile.querySelector(".form__input[name=about]");
const profileNodeTitle = document.querySelector(".profile__heading-title");
const profileNodeSubtitle = document.querySelector(
  ".profile__heading-subtitle"
);
const newPlaceNameInput = formAddCard.querySelector(".form__input[name=title]");
const newPlaceLinkInput = formAddCard.querySelector(".form__input[name=link]");
const cardArea = document.querySelector(".cards__public");

export const popupImage = document.querySelector(".popup_image");

// Popup Edit Perfile....

document.querySelectorAll(".popup__overlay").forEach((overlay) => {
  overlay.addEventListener("click", closePopupOverlay);
});

document.addEventListener("keydown", closePopupOnEscape);
const forms = Array.from(document.querySelectorAll(".form"));
const popupCloseButtons = Array.from(
  document.querySelectorAll(".popup__close-btn")
);

//Abrir Popup Profile
buttonEdit.addEventListener("click", function () {
  openPopup(popupProfile);
  const resetForm = new FormValidator(fromConfig, popupProfile);
  resetForm.enableValidation();
});

//Abrir Popup AddCard
buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard);
  const resetForm = new FormValidator(fromConfig, popupProfile);
  resetForm.enableValidation();
});
//Boton Cerrar Popups Abiertos
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    resetInputValues(popup);
    ClosePopup(popup);
  });
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileNodeTitle.textContent = inputProfileName.value;
  profileNodeSubtitle.textContent = inputProfileAbout.value;
  ClosePopup(popupProfile);
  const validForm = new FormValidator(fromConfig, formProfile);
  validForm.enableValidation();
  validForm._resetInput(formProfile);
});

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const cardNode = new Card(
    newPlaceNameInput.value,
    newPlaceLinkInput.value,
    ".template"
  );
  const cardEvents = cardNode._addListeners();
  cardArea.prepend(cardEvents);
  popupAddCard.classList.remove("popup_open");
  const resetForm = new FormValidator(fromConfig, formAddCard);
  resetForm._resetInput(formAddCard);
});

initialCards.forEach((item) => {
  const cardNode = new Card(item.name, item.link, ".template");
  const cardEvents = cardNode._addListeners();

  cardArea.append(cardEvents);
});

forms.forEach((form) => {
  const formNode = new FormValidator(fromConfig, form);
  const formValid = formNode.enableValidation();
});
