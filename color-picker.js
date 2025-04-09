let savedRange = null;
let appliedSpan = null;

const editableDiv = document.querySelector(".note-editable.panel-body");
if (editableDiv) {
  editableDiv.style.minHeight = "300px";
}

function saveSelection() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0) {
    savedRange = sel.getRangeAt(0).cloneRange();
  }
}

function restoreSelection() {
  if (!savedRange) return null;

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(savedRange.cloneRange());
  return sel.getRangeAt(0).cloneRange();
}

document
  .querySelectorAll(
    ".note-color.btn-group .btn-group .dropdown-menu li .btn-group"
  )
  .forEach((item, index) => {
    const colorType = index === 0 ? "backgroundColor" : "color";

    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = "Escolher outra cor:";
    label.style =
      "margin-right: 4px; font-size: 10px; font-weight: 100; font-family: 'tahoma'; letter-spacing: 1px;";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.title = "Escolher cor";

    // Save selection before input steals focus
    colorInput.addEventListener("mousedown", () => {
      saveSelection();
      appliedSpan = null;
    });

    colorInput.addEventListener("input", function () {
      const color = this.value;
      const range = restoreSelection();
      if (!range || range.collapsed) return;

      // Wrap selected content once
      if (!appliedSpan) {
        appliedSpan = document.createElement("span");
        appliedSpan.style[colorType] = color;

        const contents = range.extractContents();
        appliedSpan.appendChild(contents);
        range.insertNode(appliedSpan);
      } else {
        // Just update the existing span
        appliedSpan.style[colorType] = color;
      }

      // Optional: reselect the span if needed
      const sel = window.getSelection();
      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(appliedSpan);
      sel.addRange(newRange);

      // Save new range so it works again
      savedRange = newRange.cloneRange();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(colorInput);
    item.appendChild(wrapper);
  });
