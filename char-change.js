let responderBtn = document.querySelector("button.btn.btn-default.btn-success");
let address = window.location.href.split("//")[1].split("/")[0];

let textBox = document.querySelector(".note-editable.panel-body");

// Create the "Trocar de Char" button
let trocarBtn = document.createElement("button");
trocarBtn.textContent = "Trocar char";
trocarBtn.className = "btn btn-warning";
trocarBtn.style.backgroundColor = "#6d56e1";
trocarBtn.style.borderColor = "#6e57de";

// Insert button after "Responder"
if (responderBtn)
  responderBtn.parentElement.insertBefore(trocarBtn, responderBtn.nextSibling);

// Save current page and logout
trocarBtn.addEventListener("click", function (event) {
  console.log("viajou?");
  event.preventDefault();

  localStorage.setItem("yoble_last_page", window.location.href);
  localStorage.setItem("trocou_char", true);

  textBox = document.querySelector(".note-editable.panel-body").innerHTML;
  console.log("textBox caso trocou char :>> ", textBox);

  localStorage.setItem("textBoxContentTrocaDeChar", textBox);

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
    responderBtn.title = `Responder com ${name}`;

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

//salvando o texto do textBox
if (textBox) {
  textBox = document.querySelector(".note-editable.panel-body");
  console.log("textBox caso geral :>> ", textBox);

  textBox.addEventListener("input", function () {
    let textBoxContent = textBox.innerHTML;
    localStorage.setItem("textBoxContent", textBox);
  });
  // removeDivTags(htmlToString(content))

  window.addEventListener("load", () => {
    const savedContent = localStorage.getItem("userText");
    if (textBox && savedContent) {
      textBox.innerText = savedContent; // Ou innerHTML, se estiver usando HTML
    }
  });
}
