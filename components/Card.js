import { popupImage, groupId, token } from "../utils/constants";
import { PopupWithImage } from "../components/popup";
import { Api } from "../components/Api";

export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes || 0;
    this._cardId = data._id;
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

  _createCard(profileId, item) {
    console.log(item);
    console.log(profileId);
    this._element = this._getTemplate();
    const elementTitle = this._element.querySelector(".card__content-title");
    const elementImage = this._element.querySelector(".card__image-photo");
    const elementLikes = this._element.querySelector(".card__counter");
    this._addListeners(this._element);
    elementTitle.textContent = this._text;
    elementImage.alt = `Imagen de : ${this._text}`;
    elementImage.src = this._link;
    elementLikes.textContent = this._likes.length;
    if (this._element !== null) {
      this._element.addEventListener("click", this.handleCardClick);
    }
    if (this._likes) {
      this._element.querySelector(".card__counter").textContent =
        this._likes.length;
    }

    if (item.owner._id != profileId) {
      this._element.querySelector(".card__image-delete").style.display = "none";
    }

    return this._element;
  }

  _handleOpenPopup() {
    console.log(
      "este es mi link: " + this._link + " y este es mi texto: " + this._text
    );
    const popup = new PopupWithImage(
      popupImage,
      ".popup__image",
      ".popup__image-title"
    );

    popup.open(this._link, this._text);
  }
  _handleClosePopup() {
    popupImage.querySelector(".popup__image").src = "";
    popupImage.classList.remove("popup_open");
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _addListeners(cardElement) {
    //const cardElement = this._getTemplate();
    const likeButton = cardElement.querySelector(".card__content-like");
    cardElement
      .querySelector(".card__image-photo")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });

    // Boton de Like
    likeButton.addEventListener("click", (e) => {
      if (e.target.classList.contains("card__content-like_Active")) {
        e.target.classList.remove("card__content-like_Active");
        const deleteLikes = new Api({
          baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
          headers: {
            Authorization: `${token}`,
          },
        });

        deleteLikes.removeLike(this._cardId).then((data) => {
          cardElement.querySelector(".card__counter").textContent =
            data.likes.length;
        });
      } else {
        e.target.classList.add("card__content-like_Active");
        const updateLikes = new Api({
          baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
          headers: {
            Authorization: `${token}`,
          },
        });

        updateLikes.addLike(this._cardId).then((data) => {
          cardElement.querySelector(".card__counter").textContent =
            data.likes.length;
        });
      }
    });

    return cardElement;
  }

  clickHandler() {
    this.handleCardClick(this._data);
  }

  getCardId() {
    return this._cardId;
  }
}
