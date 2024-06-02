import { handleOriginalResponse } from "../utils/constants";
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  getInformationUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  editprofile(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(handleOriginalResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardData.title,
        link: cardData.link,
      }),
    }).then(handleOriginalResponse);
  }

  async deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  // Añadir "Me gusta"
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  // Eliminar "Me gusta"
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  updateAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: userData }),
    }).then(handleOriginalResponse);
  }
}
