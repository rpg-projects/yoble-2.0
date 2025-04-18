let lastPage = localStorage.getItem("yoble_last_page");
let troucou_char = localStorage.getItem("trocou_char");

let loginBtn = document.querySelector("input[value='Entrar']");
if (!loginBtn) {
  console.warn("🚨 loginBtn not found!");
}

let domain = lastPage.split("//yoble.")[1]?.split("/")[0] || "";

loginBtn.addEventListener("click", () => {
  setTimeout(() => {
    if (troucou_char === "trocou" && lastPage) {
      window.location.href = lastPage;

      localStorage.setItem("trocou_char", "naoTrocou");
    }
  }, 500);
});

const rememberMeCheckbox = document.querySelector("input[name='rememberme']");
if (rememberMeCheckbox) {
  rememberMeCheckbox.checked = true;
}
