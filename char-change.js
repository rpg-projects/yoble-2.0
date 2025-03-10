let responderBtn = document.querySelector("button.btn.btn-default.btn-success");
console.log("responderBtn :>> ", responderBtn);

if (!responderBtn) console.warn("button not found");

// Create the "Trocar de Char" button
let trocarBtn = document.createElement("button");
trocarBtn.textContent = "Trocar char";
trocarBtn.className = "btn btn-warning";
trocarBtn.style.backgroundColor = "#6d56e1";
trocarBtn.style.borderColor = "#6e57de";

// Save current page and logout
trocarBtn.addEventListener("click", function (event) {
  event.preventDefault();

  localStorage.setItem("yoble_last_page", window.location.href);
  localStorage.setItem("trocou_char", true);
  window.location.href = "https://yoble.us/logout";
});

// Insert button after "Responder"
responderBtn.parentElement.insertBefore(trocarBtn, responderBtn.nextSibling);
