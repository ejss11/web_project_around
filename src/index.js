import "./styles/index.css";
import { Card } from "../components/Card.js";
import { renderLoading } from "../utils/utils.js";

import { FormValidator } from "../utils/FormValidator.js";

import {
  buttonAdd,
  buttonEdit,
  cardArea,
  formAddCard,
  formProfile,
  fromConfig,
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
  groupId,
  token,
  profileNameNode,
  profileAboutNode,
  profileAvatarNode,
  botonEditAvatar,
  popupEditAvatar,
  formAvatar,
  inputUrlAvatar,
  buttonFormAvatar,
  popupDeleteConfirmation,
  buttonConfirmationDeleteId,
} from "../utils/constants.js";
import Section from "../components/section.js";
import {
  PopupWithForm,
  PopupWithImage,
  PopupWithConfirmation,
} from "../components/popup.js";
import { UserInfo } from "../components/userinfo.js";
import { infoCard } from "../components/infoCard.js";
import { infoAvatar } from "../components/infoAvatar.js";
import { Api } from "../components/Api.js";
import { data } from "autoprefixer";
import { Promise } from "core-js";

export const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
  headers: {
    Authorization: `${token}`,
  },
});
//Cargar Informacion del usuario del servidor

api
  .getInformationUser()
  .then((user) => {
    //Remplazamos los datos aqui
    console.log(user);
    profileNameNode.textContent = user.name;
    profileAboutNode.textContent = user.about;
    profileAvatarNode.src = user.avatar;
    profileAvatarNode.alt = "Imagen de Avatar " + user.name;
    profileNameNode.id = user._id;
    console.log(profileNameNode.id);
  })
  .catch((err) => {
    console.error(`Error de obtener información de usuario:`, err);
  });
//Abrir Popup Profile
//abrir popup de editar datos de perfil....
buttonEdit.addEventListener("click", function () {
  //Arbir el Popup Profile
  popupWithForm.open();
  // Obtener la información actual del usuario
  const currentInfo = userInfo.getUserInfo();
  inputProfileName.value = currentInfo.name;
  inputProfileAbout.value = currentInfo.job;
  const resetForm = new FormValidator(fromConfig, popupProfile);
  //resetForm.enableValidation();
});

const userInfo = new UserInfo({
  userNameSelector: profileTitle,
  userJobSelector: profileSubTitle,
});
//Editar el perfil
const popupWithForm = new PopupWithForm(popupProfile, (formData) => {
  console.log("Formulario data: ", formData);
  renderLoading(true, formProfile.querySelector(".form__submit"));
  userInfo.setUserInfo({ name: formData.name, job: formData.about });
  api
    .editprofile(formData)
    .then((data) => {
      if (data.name && data.about) {
        renderLoading(false, formProfile.querySelector(".form__submit"));
        alert("Perfil Actualizado existosamente!");
        console.log("Datos del perfil modificados:", data);
      } else {
        throw new Error("Error al actualizar el perfil");
      }
    })
    .catch((error) => {
      alert("Hubo un problema al actualizar el perfil: " + error.message);
      console.error("Error:", error);
    });
});

//Abrir Popup AddCard

const CardInfoadd = new infoCard({
  nameTitleSelector: newPlaceNameInput,
  linkImageSelector: newPlaceLinkInput,
});
//Agregar Tarjetas
buttonAdd.addEventListener("click", function () {
  popupWithFormadd.open();
  const resetForm = new FormValidator(fromConfig, popupAddCard);
  resetForm.enableValidation();
});

const popupWithFormadd = new PopupWithForm(popupAddCard, (formData) => {
  console.log("Formulario data: ", formData);
  CardInfoadd.setCardInfo({ name: formData.title, link: formData.link });
  renderLoading(true, formAddCard.querySelector(".form__submit"));
  api.addNewCard(formData).then((data) => {
    // Create a new card using user-added information
    console.log(data);
    if (data.name === formData.title && data.link === formData.link) {
      renderLoading(false, formAddCard.querySelector(".form__submit"));
      alert("Se a Agregado existosamente Nueva Tarjeta!");
      const newCard = new Card(
        {
          data: data,
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
              popupimagen.open(data.link, data.title);
            }
          },
        },
        ".template"
      ); // Use the template selector
      cardArea.prepend(newCard._createCard(profileNameNode.id, data));
      //const cardEvents = cardNode._addListeners();
    }

    const resetForm = new FormValidator(fromConfig, formAddCard);
    resetForm._resetInput(formAddCard);
  });
});

//inicializar las tarjetas aqui...

api
  .getInitialCards()
  .then((initialCards) => {
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

                if (isDeleteButton) {
                  //console.log(userInfo.getUserId());
                  console.log(popupDeleteConfirmation);
                  console.log(buttonConfirmationDeleteId);

                  popupDeleteCardConfirm.open(() => removeCardFormServer(card));
                  popupDeleteCardConfirm.setEventListeners();
                } else if (isLikeButton) {
                  card._addListeners(document.querySelector(".card"));
                }
              },
            },
            ".template"
          );

          const cardElement = card._createCard(profileNameNode.id, item);
          CardList.addItem(cardElement);
        },
      },
      cardArea
    );

    CardList.render();
  })
  .catch((err) => {
    console.error("Error al obtener las tarjetas:", err);
  });

const popupDeleteCardConfirm = new PopupWithConfirmation(
  popupDeleteConfirmation
);

//Popup de Editar Imagen de Aavatar
botonEditAvatar.addEventListener("click", function () {
  //Abrimos el popup cambiar imagen
  popupWithFormAvatar.open();
  const resetForm = new FormValidator(fromConfig, popupEditAvatar);
  resetForm.enableValidation();
});
const urlAvatar = new infoAvatar(inputUrlAvatar);
const popupWithFormAvatar = new PopupWithForm(popupEditAvatar, (data) => {
  renderLoading(true, buttonFormAvatar);
  console.log("Datos del Fromulario: ", data);
  api
    .updateAvatar(data.url)
    .then((res) => {
      console.log(res);
      if (res.avatar === data.url) {
        renderLoading(false, buttonFormAvatar);
        alert("Perfil Actualizado existosamente Avatar!");
      }
    })
    .catch((error) => {
      alert("Hubo un problema al actualizar el avatar: " + error.message);
      console.error("Error:", error);
    });
});

forms.forEach((form) => {
  const formNode = new FormValidator(fromConfig, form);
  const formValid = formNode.enableValidation();
});

function removeCardFormServer(card) {
  popupDeleteCardConfirm.open(() => {
    return api.deleteCard(card.getCardId()).then(() => {
      api.getInitialCards().then((cards) => {
        const CardList = new Section(
          {
            data: cards,
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

                    if (isDeleteButton) {
                      //console.log(userInfo.getUserId());
                      console.log(popupDeleteConfirmation);
                      console.log(buttonConfirmationDeleteId);

                      popupDeleteCardConfirm.open(() =>
                        removeCardFormServer(card)
                      );
                      popupDeleteCardConfirm.setEventListeners();
                    } else if (isLikeButton) {
                      card._addListeners(document.querySelector(".card"));
                    }
                  },
                },
                ".template"
              );

              const cardElement = card._createCard(profileNameNode.id, item);
              CardList.addItem(cardElement);
            },
          },
          cardArea
        );

        CardList.render();
      });
    });
  });
}
