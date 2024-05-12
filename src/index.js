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
  profileTitle,
  profileSubTitle,
} from "../utils/constants.js";
import Section from "../components/section.js";
import { PopupWithForm, PopupWithImage } from "../components/popup.js";
import { UserInfo } from "../components/userinfo.js";
import { infoCard } from "../components/infoCard.js";
// Popup Edit Perfile....

//Abrir Popup Profile
const userInfo = new UserInfo({
  userNameSelector: profileTitle,
  userJobSelector: profileSubTitle,
});

const popupWithForm = new PopupWithForm(popupProfile, (formData) => {
  console.log("Formulario data: ", formData);
  userInfo.setUserInfo({ name: formData.name, job: formData.about });
});

buttonEdit.addEventListener("click", function () {
  //Arbir el Popup Profile
  popupWithForm.open();
  // Obtener la información actual del usuario
  const currentInfo = userInfo.getUserInfo();
  inputProfileName.value = currentInfo.name;
  inputProfileAbout.value = currentInfo.job;
  const resetForm = new FormValidator(fromConfig, popupProfile);
  resetForm.enableValidation();
});

//Abrir Popup AddCard

const CardInfoadd = new infoCard({
  nameTitleSelector: newPlaceNameInput,
  linkImageSelector: newPlaceLinkInput,
});

const popupWithFormadd = new PopupWithForm(popupAddCard, (formData) => {
  console.log("Formulario data: ", formData);
  CardInfoadd.setCardInfo({ name: formData.title, link: formData.link });
});
buttonAdd.addEventListener("click", function () {
  popupWithFormadd.open();
  const resetForm = new FormValidator(fromConfig, popupAddCard);
  resetForm.enableValidation();
});

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const addInfoCard = CardInfoadd.getPopupAddCardInfo();
  // Create a new card using user-added information
  const newCard = new Card(
    {
      data: addInfoCard,
      handleCardClick: (event) => {
        const target = event.target;
        const isLikeButton = target.classList.contains("card__content-like");
        const isDeleteButton = target.classList.contains("card__image-delete");

        if (!isLikeButton && !isDeleteButton) {
          const popupimagen = new PopupWithImage(
            popupImage,
            ".popup__image",
            ".popup__image-title"
          );
          popupimagen.open(userAddedInfo.link, userAddedInfo.title);
        }
      },
    },
    ".template"
  ); // Use the template selector
  cardArea.prepend(newCard._createCard());
  //const cardEvents = cardNode._addListeners();

  const resetForm = new FormValidator(fromConfig, formAddCard);
  resetForm._resetInput(formAddCard);
});

const CardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (event) => {
            const target = event.target;
            const isLikeButton =
              target.classList.contains("card__content-like");
            const isDeleteButton =
              target.classList.contains("card__image-delete");
            if (!isLikeButton && !isDeleteButton) {
              const popupimagen = new PopupWithImage(
                popupImage,
                ".popup__image",
                ".popup__image-title"
              );
              popupimagen.open(item.link, item.name);
            }
          },
        },
        ".template"
      );

      return card._createCard();
    },
  },
  cardArea
);

CardList.render();

forms.forEach((form) => {
  const formNode = new FormValidator(fromConfig, form);
  const formValid = formNode.enableValidation();
});
