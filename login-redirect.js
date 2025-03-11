let lastPage = localStorage.getItem("yoble_last_page");
let troucou_char = localStorage.getItem("trocou_char") === "true";

let loginBtn = document.querySelector("input[value='Entrar']");
if (!loginBtn) {
  console.warn("🚨 loginBtn not found!");
}

let domain = lastPage.split("//yoble.")[1]?.split("/")[0] || "";

console.log("oi");

loginBtn.addEventListener("click", () => {
  console.log("logged in");
  setTimeout(() => {
    if (troucou_char && lastPage) {
      window.location.href = lastPage;

      localStorage.setItem("trocou_char", false);
      troucou_char = localStorage.getItem("trocou_char") === "true";
    } else {
      window.location.href = `https://yoble.${domain}/Main`;

      troucou_char = localStorage.getItem("trocou_char") === "true";
    }
  }, 500);
});
