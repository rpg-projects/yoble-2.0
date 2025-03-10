let lastPage = localStorage.getItem("yoble_last_page");
let troucou_char = localStorage.getItem("trocou_char");

if (troucou_char && lastPage) {
  let loginBtn = document.querySelector("input[value='Entrar']");

  loginBtn.addEventListener("click", function () {
    setTimeout(function () {
      window.location.href = lastPage;
    }, 500); // 500ms delay
  });
}
