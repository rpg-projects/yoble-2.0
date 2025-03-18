let responderBtn = document.querySelector("button.btn.btn-default.btn-success");
// responderBtn.addEventListener("mouseenter", () => {
//   button.setAttribute("title", "Instant Tooltip");
// });

let address = window.location.href.split("//")[1].split("/")[0];

let textBox = document.querySelector(".note-editable.panel-body");

// Create the "Trocar de Char" button
let trocarBtn = document.createElement("button");
trocarBtn.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i> char`;
trocarBtn.className = "btn btn-warning";
trocarBtn.style.backgroundColor = "#6d56e1";
trocarBtn.style.borderColor = "#6e57de";

// Insert button after "Responder"
if (responderBtn)
  responderBtn.parentElement.insertBefore(trocarBtn, responderBtn.nextSibling);

// Save current page and logout
trocarBtn.addEventListener("click", function (event) {
  event.preventDefault();

  localStorage.setItem("yoble_last_page", window.location.href);
  localStorage.setItem("trocou_char", true);

  textBox = document.querySelector(".note-editable.panel-body").innerHTML;
  localStorage.setItem("textBoxContent", textBox);

  window.location.href = `https://${address}/logout`;

  return false; // Prevent default behavior and stop event propagation
});

// Fetch the homepage to get the avatar and name
fetch(`https://${address}/Main`)
  .then((response) => response.text())
  .then((data) => {
    // Create a temporary DOM element to parse the page content
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");

    // Extract the name from the h2 element inside the resume-user class
    let name = doc.querySelector(".resume-user h2").innerText.trim();
    console.log("responder com :>> ", name);
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
  })
  .catch((err) => console.error("Error fetching the homepage:", err));

//salvando o texto do textBox independente da troca
textBox = document.querySelector(".note-editable.panel-body");

textBox.addEventListener("input", function () {
  textBox = document.querySelector(".note-editable.panel-body").innerHTML;
  localStorage.setItem("textBoxContent", textBox);
});
// removeDivTags(htmlToString(content))

window.addEventListener("load", () => {
  let textBoxContent = localStorage.getItem("textBoxContent");

  textBox.innerHTML = textBoxContent;
});

// Save current page and logout
responderBtn.addEventListener("click", function (event) {
  localStorage.setItem("textBoxContent", "");
});
