import { popupImage } from "../utils/constants";
import { PopupWithImage } from "../components/popup";

export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._data = data;
    this.handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
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

    if (cardElement !== null) {
      cardElement.addEventListener("click", this.handleCardClick);
    }

    return this._addListeners(cardElement);
  }

  _handleClosePopup() {
    popupImage.querySelector(".popup__image").src = "";
    popupImage.classList.remove("popup_open");
  }

  _addListeners(cardElement) {
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

    return cardElement;
  }

  clickHandler() {
    this.handleCardClick(this._data);
  }
}
