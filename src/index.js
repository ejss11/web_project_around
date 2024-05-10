import "./styles/index.css";
import { Card } from "../components/Card.js";
import {
  openPopup,
  ClosePopup,
  enableValidation,
  resetInputValues,
  closePopupOverlay,
  closePopupOnEscape,
} from "../utils/utils.js";

import { FormValidator } from "../utils/FormValidator.js";

import {
  buttonAdd,
  buttonEdit,
  cardArea,
  formAddCard,
  formProfile,
  fromConfig,
  initialCards,
  inputProfileAbout,
  inputProfileName,
  popupAddCard,
  popupImage,
  popupProfile,
  newPlaceLinkInput,
  newPlaceNameInput,
  profileNodeSubtitle,
  profileNodeTitle,
  forms,
  popupCloseButtons,
} from "../utils/constants.js";
import Section from "../components/section.js";

// Popup Edit Perfile....

document.querySelectorAll(".popup__overlay").forEach((overlay) => {
  overlay.addEventListener("click", closePopupOverlay);
});

document.addEventListener("keydown", closePopupOnEscape);

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

const CardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: () => popupImage.open(item.link, item.name),
        },
        ".template"
      );
      return card._createCard();
    },
  },
  cardArea
);

CardList.render();
