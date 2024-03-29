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
const popupImage = document.querySelector(".popup_image");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Popup Edit Perfile....

const popupCloseButtons = Array.from(
  document.querySelectorAll(".popup__close-btn")
);

function openPopup(popup) {
  popup.classList.add("popup_open");
}
function ClosePopup(popup) {
  popup.classList.remove("popup_open");
}
//Abrir Popup Profile
buttonEdit.addEventListener("click", function () {
  openPopup(popupProfile);
});
//Abrir Popup AddCard
buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard);
});
//Boton Cerrar Popups Abiertos
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    ClosePopup(popup);
  });
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  profileNodeTitle.textContent = inputProfileName.value;
  profileNodeSubtitle.textContent = inputProfileAbout.value;
  ClosePopup(popupProfile);
});

function addCard(event) {
  event.preventDefault();
  const cardNode = createCard(newPlaceNameInput.value, newPlaceLinkInput.value);

  cardArea.prepend(cardNode);
  popupAddCard.classList.remove("popup_open");
}

formAddCard.addEventListener("submit", addCard);

function createCard(name, link) {
  const template = document.querySelector(".template");
  const templateNode = template.content.querySelector(".card");
  const cardNode = templateNode.cloneNode(true);

  cardNode.querySelector(".card__image-photo").src = link; //item.link;
  cardNode.querySelector(".card__image-photo").alt = "Imagen de : " + name; //"Imagen de : " + item.name;
  cardNode.querySelector(".card__content-title").textContent = name; //item.name;

  //eliminar Card
  cardNode
    .querySelector(".card__image-delete")
    .addEventListener("click", () => {
      cardNode.remove();
    });

  const likeButton = cardNode.querySelector(".card__content-like");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__content-like_Active");
  });

  cardNode.querySelector(".card__image-photo").addEventListener("click", () => {
    popupImage.classList.add("popup_open");
    popupImage.querySelector(".popup__image").src = link;
    popupImage.querySelector(".popup__image").alt = "Imagen de : " + name;
    popupImage.querySelector(".popup__image-title").textContent = name;
  });
  return cardNode;
}
initialCards.forEach((item) => {
  const cardNode = createCard(item.name, item.link);

  cardArea.append(cardNode);
});
