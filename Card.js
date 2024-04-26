import { popupImage } from "./index.js";

export class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
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
    this._element = this._getTemplate();

    this._element.querySelector(".card__content-title").textContent =
      this._title;
    this._element.querySelector(".card__image-photo").alt =
      "Imagen de : " + this._title;
    this._element.querySelector(".card__image-photo").src = this._link;

    return this._element;
  }

  _handleOpenPopup() {
    popupImage.classList.add("popup_open");
    popupImage.querySelector(".popup__image").src = this._link;
    popupImage.querySelector(".popup__image").alt =
      "Imagen de : " + this._title;
    popupImage.querySelector(".popup__image-title").textContent = this._title;
  }

  _handleClosePopup() {
    popupImage.querySelector(".popup__image").src = "";
    popupImage.classList.remove("popup_open");
  }

  _addListeners() {
    const cardElement = this._createCard();
    const likeButton = cardElement.querySelector(".card__content-like");

    //eliminar Card
    cardElement
      .querySelector(".card__image-delete")
      ?.addEventListener("click", () => {
        cardElement.remove();
      });

    //Boton de Like
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__content-like_Active");
    });

    //Click sobre la imagen
    cardElement
      .querySelector(".card__image-photo")
      ?.addEventListener("click", () => {
        this._handleOpenPopup();
      });
    return cardElement;
  }
}
