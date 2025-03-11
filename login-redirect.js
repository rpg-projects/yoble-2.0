// let lastPage = localStorage.getItem("yoble_last_page");
// let troucou_char = localStorage.getItem("trocou_char");

// let loginBtn = document.querySelector("input[value='Entrar']");
// if (!loginBtn) {
//   console.warn("🚨 loginBtn not found!");
// }

// let domain = lastPage.split("//yoble.")[1].split("/")[0];

// if (troucou_char && lastPage) {
//   loginBtn.addEventListener("click", function () {
//     setTimeout(function () {
//       localStorage.setItem("trocou_char", false);

//       window.location.href = lastPage;

//       let textBoxContent = localStorage.getItem("textBoxContentTrocaDeChar");
//       document.querySelector(".note-editable.panel-body").innerHTML =
//         textBoxContent;
//     }, 500); // 500ms delay

//     lastPage = localStorage.getItem("yoble_last_page");
//     troucou_char = localStorage.getItem("trocou_char");
//   });
// } else if (lastPage && !troucou_char) {
//   loginBtn.addEventListener("click", function () {
//     setTimeout(function () {
//       let textBoxContent = localStorage.getItem("textBoxContent");
//       document.querySelector(".note-editable.panel-body").innerHTML =
//         textBoxContent;

//       console.log("domain :>> ", domain);

//       window.location.href = `https://yoble${domain}/home`;
//     }, 500); // 500ms delay

//     lastPage = localStorage.getItem("yoble_last_page");
//     troucou_char = localStorage.getItem("trocou_char");
//   });
// }

let lastPage = localStorage.getItem("yoble_last_page");
let troucou_char = localStorage.getItem("trocou_char") === "true";

let loginBtn = document.querySelector("input[value='Entrar']");
if (!loginBtn) {
  console.warn("🚨 loginBtn not found!");
}

let domain = lastPage.split("//yoble.")[1].split("/")[0];

loginBtn.addEventListener("click", () => {
  setTimeout(() => {
    if (troucou_char && lastPage) {
      window.location.href = lastPage;

      localStorage.setItem("trocou_char", false);
      troucou_char = localStorage.getItem("trocou_char") === "true";

      let textBoxContent = localStorage.getItem("textBoxContentTrocaDeChar");
      console.log("textBoxContent :>> ", textBoxContent);
      document.querySelector(".note-editable.panel-body").innerHTML =
        textBoxContent;
    } else if (lastPage && !troucou_char) {
      console.log("não troucou char");
      let textBoxContent = localStorage.getItem("textBoxContent");
      console.log("textBoxContent :>> ", textBoxContent);
      document.querySelector(".note-editable.panel-body").innerHTML =
        textBoxContent;

      troucou_char = localStorage.getItem("trocou_char") === "true";
      window.location.href = `https://yoble${domain}/home`;
    }
  }, 500);
});
