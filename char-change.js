let responderBtn = document.querySelector("button.btn.btn-default.btn-success");

let address = window.location.href.split("//")[1].split("/")[0];

let textBox = document.querySelector(".note-editable.panel-body");

// Create the "Trocar de Char" button

let trocarBtnBottom = document.createElement("button");
trocarBtnBottom.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i> Char`;
trocarBtnBottom.className = "btn btn-warning";
trocarBtnBottom.style.backgroundColor = "#6d56e1";
trocarBtnBottom.style.borderColor = "#6e57de";

// Insert button after "Responder"
if (responderBtn)
  responderBtn.parentElement.insertBefore(
    trocarBtnBottom,
    responderBtn.nextSibling
  );

// Select the dropdown menu
const dropdownMenu = document.querySelector(".dropdown .dropdown-menu");

// Create the "Trocar de Char" button inside a <li> element
const trocarBtnLi = document.createElement("li");
const trocarBtnLink = document.createElement("a");
trocarBtnLink.href = "#";
trocarBtnLink.id = "trocarBtnTop";
trocarBtnLink.innerHTML = `Trocar de char`;
trocarBtnLi.appendChild(trocarBtnLink);

// Find the last item and insert the button before it
const lastItem = dropdownMenu.lastElementChild;
dropdownMenu.insertBefore(trocarBtnLi, lastItem);

function trocarDeCharLogic() {
  event.preventDefault();

  localStorage.setItem("yoble_last_page", window.location.href);
  localStorage.setItem("trocou_char", true);

  textBox = document.querySelector(".note-editable.panel-body").innerHTML;
  localStorage.setItem("textBoxContent", textBox);

  window.location.href = `https://${address}/logout`;

  return false; // Prevent default behavior and stop event propagation
}

// Save current page and logout
trocarBtnBottom.addEventListener("click", trocarDeCharLogic);
trocarBtnTop.addEventListener("click", trocarDeCharLogic);

// Fetch the homepage to get the avatar and name
fetch(`https://${address}/Main`)
  .then((response) => response.text())
  .then((data) => {
    // Create a temporary DOM element to parse the page content
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");

    // Extract the name from the h2 element inside the resume-user class
    let name = doc.querySelector(".resume-user h2").innerText.trim();
    responderBtn.setAttribute("data-tooltip", `Responder com ${name}`);

    // Inject CSS for the tooltip
    let style = document.createElement("style");
    style.innerHTML = `
      .tooltip-btn {
        position: relative;
      }
      .tooltip-btn::after {
        content: attr(data-tooltip);
        position: absolute;
        top: 120%;
        left: 50%;
        transform: translateX(-50%);
        background: #171818;
        color: white;
        padding: 6px 10px;
        font-size: 11px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s ease-in-out;
      }
      .tooltip-btn::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) scaleX(-1);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #171818; /* Arrow facing upwards */
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
      }
      .tooltip-btn:hover::after,
      .tooltip-btn:hover::before {
        opacity: .6;
      }
    `;
    document.head.appendChild(style);

    // Add tooltip class to the button
    responderBtn.classList.add("tooltip-btn");
  })
  .catch((err) => console.error("Error fetching the homepage:", err));

//salvando o texto do textBox independente da troca
textBox = document.querySelector(".note-editable.panel-body");

textBox.addEventListener("input", function () {
  textBox = document.querySelector(".note-editable.panel-body").innerHTML;
  localStorage.setItem("textBoxContent", textBox);
});

window.addEventListener("load", () => {
  let textBoxContent = localStorage.getItem("textBoxContent");

  textBox.innerHTML = textBoxContent;
});

responderBtn.addEventListener("click", function (event) {
  localStorage.setItem("textBoxContent", "");
});

// // Create the new container div
// let containerDiv = document.createElement("div");
// containerDiv.style.display = "flex"; // Apply flexbox to the container
// containerDiv.style.alignItems = "center"; // Vertically align items in the center
// containerDiv.style.gap = "10px"; // Adjust space between the image and the panel

// // Create the avatar image element
// let avatarImg = document.createElement("img");
// avatarImg.src = avatarUrl; // Replace with actual image URL
// avatarImg.alt = name;
// avatarImg.style.width = "58px"; // Set a specific width for the image
// avatarImg.style.height = "auto"; // Maintain aspect ratio
// avatarImg.style.borderRadius = "50%"; // Make it circular (optional)
// avatarImg.style.cursor = "pointer"; // Make it clickable or hoverable
// avatarImg.title = `Logado em ${name}`; // Show the name on hover

// // Create the note-editor panel
// let noteEditorPanel = document.querySelector(
//   ".note-editor.panel.panel-default"
// );

// if (noteEditorPanel) {
//   // Append the avatar image and note editor panel to the container div
//   containerDiv.appendChild(avatarImg);
//   containerDiv.appendChild(noteEditorPanel);

//   // Now insert the container div into the body (or where you want it in the page)
//   document.body.appendChild(containerDiv); // or insert at specific location in the DOM
// }
