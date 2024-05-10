import { popupImage } from "../utils/constants";
import { PopupWithImage } from "../components/popup";

export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._data = data;
    this.handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    // Llama a la función handleCardClick cuando se hace clic en la tarjeta
    this._handleOpenPopup = this._handleOpenPopup.bind(this);
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    const cardCloneNode = templateElement.content
      .querySelector(".card")
      .cloneNode(true);
    return cardCloneNode;
  }

  _createCard() {
    const cardElement = this._getTemplate();

    cardElement.querySelector(".card__content-title").textContent =
      this._data.name;
    cardElement.querySelector(".card__image-photo").alt =
      "Imagen de : " + this._data.name;
    cardElement.querySelector(".card__image-photo").src = this._data.link;

    return cardElement;
  }

  _handleOpenPopup() {
    popupImage.classList.add("popup_open");
    popupImage.querySelector(".popup__image").src = this._data.link;
    popupImage.querySelector(".popup__image").alt =
      "Imagen de : " + this._data.name;
    popupImage.querySelector(".popup__image-title").textContent =
      this._data.name;
    popupImage.addEventListener("click", this.clickHandler.bind(this));
  }

  _handleClosePopup() {
    popupImage.querySelector(".popup__image").src = "";
    popupImage.classList.remove("popup_open");
  }

  _addListeners() {
    const cardElement = this._createCard();
    const likeButton = cardElement.querySelector(".card__content-like");

    // Eliminar Card
    cardElement
      .querySelector(".card__image-delete")
      ?.addEventListener("click", () => {
        cardElement.remove();
      });

    // Boton de Like
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__content-like_Active");
    });

    // Click sobre la imagen
    cardElement
      .querySelector(".card__image-photo")
      ?.addEventListener("click", this._handleOpenPopup);

    return cardElement;
  }

  clickHandler() {
    this.handleCardClick(this._data);
  }
}
