let savedRange = null;

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
    const colorType = index === 0 ? "backgroundColor" : "color"; // fundo ou texto

    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = "Escolher outra cor:";
    label.style =
      "margin-right: 4px; font-size: 10px; font-weight: 100; font-family: 'tahoma'; letter-spacing: 1px;";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.title = "Escolher cor";

    // Salva a seleção antes de abrir o seletor de cor
    colorInput.addEventListener("mousedown", () => {
      saveSelection();
    });

    colorInput.addEventListener("input", function () {
      const color = this.value;
      const range = restoreSelection();
      if (!range || range.collapsed) return;

      // Cria um novo span com a cor aplicada
      const span = document.createElement("span");

      // Copia estilos já existentes da seleção (se houver)
      span.style.cssText =
        range.startContainer.parentNode?.style?.cssText || "";

      // Aplica o novo estilo de cor
      span.style[colorType] = color;

      // Insere o conteúdo da seleção dentro do novo span
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);

      // Remove visualmente a seleção
      const sel = window.getSelection();
      sel.removeAllRanges();

      // Salva novamente o range com o novo span
      savedRange = document.createRange();
      savedRange.selectNodeContents(span);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(colorInput);
    item.appendChild(wrapper);
  });
