const parentDiv = document.querySelector(".note-insert.btn-group");
const oldButton = document.querySelector('button[data-name="link"]');

if (oldButton) {
  oldButton.remove(); // Remove the broken button

  // Create new button
  const newButton = document.createElement("button");
  newButton.innerHTML = '<i class="fa fa-link"></i>';
  newButton.className = "btn btn-default btn-sm";
  newButton.title = "Inserir Link (CTRL+K)";

  // Append the new button to the parent
  parentDiv.insertBefore(newButton, parentDiv.firstChild);

  newButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevents any default button behavior

    let selectedText = "";
    let range;

    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      selectedText = range.toString().trim();
    }

    // Open modal with selected text
    showCustomModal(selectedText, range);
  });
}

// Function to inject CSS dynamically
function injectCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
      #customLinkModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .modal-dialog {
        width: 600px;
        background: white;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        padding: 20px;
        animation: fadeIn 0.3s ease-in-out;
      }

      .modal-body {
        padding: 10px 30px;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
  document.head.appendChild(style);
}

// Call function to inject styles
injectCSS();

function showCustomModal(selectedText, range) {
  // Get the editable div
  const editableDiv = document.querySelector(".note-editable.panel-body");

  // Check if modal already exists, and remove if so
  const existingModal = document.getElementById("customLinkModal");
  if (existingModal) {
    // If modal already exists, remove it
    existingModal.remove();
  }

  // Create the modal
  const modal = document.createElement("div");
  modal.id = "customLinkModal";
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close">&times;</button>
          <h4 class="modal-title">Inserir link</h4>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label>Texto para exibir</label>
            <input id="linkText" class="form-control" type="text" value="${selectedText}">
          </div>
          <div class="form-group row">
            <label>Para qual URL esse link leva?</label>
            <input id="linkURL" class="form-control" type="text" value="">
          </div>
          <div class="checkbox">
            <label><input id="openNewTab" type="checkbox" checked> Abrir em uma nova janela</label>
          </div>
        </div>
        <div class="modal-footer">
          <button id="insertLinkBtn" class="btn btn-primary" disabled>Inserir link</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal event
  modal.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Enable/disable the insert button
  const textInput = document.getElementById("linkText");
  const urlInput = document.getElementById("linkURL");
  const insertBtn = document.getElementById("insertLinkBtn");

  function checkInputs() {
    if (textInput.value.trim() !== "" && urlInput.value.trim() !== "") {
      insertBtn.classList.remove("disabled");
      insertBtn.removeAttribute("disabled");
    } else {
      insertBtn.classList.add("disabled");
      insertBtn.setAttribute("disabled", "true");
    }
  }

  textInput.addEventListener("input", checkInputs);
  urlInput.addEventListener("input", checkInputs);

  // Enable button if there's selected text
  if (selectedText) checkInputs();

  // Insert link logic
  insertBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const linkText = textInput.value.trim();
    const linkURL = urlInput.value.trim();
    const openInNewTab = document.getElementById("openNewTab").checked;

    if (linkText && linkURL) {
      const linkHTML = `<a href="${linkURL}" ${
        openInNewTab ? 'target="_blank"' : ""
      }>${linkText}</a>`;

      if (range) {
        range.deleteContents(); // Remove selected text
        const linkElement = document.createElement("span");
        linkElement.innerHTML = linkHTML;
        range.insertNode(linkElement); // Insert the new linked text
      } else {
        editableDiv.innerHTML += linkHTML; // Append if no selection
      }
    }

    // Close modal
    modal.style.display = "none";
  });
}
