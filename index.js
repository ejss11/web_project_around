const buttonEdit = document.querySelector(".profile__heading-edit");
const buttonAdd = document.querySelector(".profile__heading-add");
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

const popupCloseButtons = Array.from(
  document.querySelectorAll(".popup__close-btn")
);

function openPopup(popup) {
  popup.classList.add("popup_open");
}
function ClosePopup(popup) {
  popup.classList.remove("popup_open");
}

buttonEdit.addEventListener("click", function () {
  openPopup(popupProfile);
});

buttonAdd.addEventListener("click", function () {
  openPopup(popupAddCard);
});

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
