import { fromConfig } from "./index.js";
//Formularios reset
export function resetInputValues(form) {
  const inputs = form.querySelectorAll(fromConfig.inputSelector);

  inputs.forEach((input) => {
    const errorNode = form.querySelector(
      `${fromConfig.errorClass + input.name}`
    );
    input.value = "";
    input.classList.remove(fromConfig.inputErrorClass);
    errorNode.textContent = "";
  });
}
