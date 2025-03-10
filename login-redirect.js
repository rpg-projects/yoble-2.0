// let lastPage = localStorage.getItem("yoble_last_page");
// let troucou_char = localStorage.getItem("trocou_char");

// let domain = lastPage.split("//yoble.")[1].split("/")[0];

// if (troucou_char && lastPage) {
//   let loginBtn = document.querySelector("input[value='Entrar']");

//   loginBtn.addEventListener("click", function () {
//     setTimeout(function () {
//       window.location.href = lastPage;

//       let textBoxContent = localStorage.getItem("textBoxContent");

//       document.querySelector(".note-editable.panel-body").innerHTML =
//         textBoxContent;
//     }, 500); // 500ms delay
//   });

//   localStorage.setItem("trocou_char", false);
// } else if (lastPage) {
//   loginBtn.addEventListener("click", function () {
//     setTimeout(function () {
//       window.location.href = `https://yoble${domain}/home`;
//     }, 500); // 500ms delay
//   });
// }
