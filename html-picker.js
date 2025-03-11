let forumComunidade = document.getElementById("forum-comunidade");

const createCopiarPostButton = (action) => {
  // Create a new <a> element (link/button)
  let newButton = document.createElement("a");
  newButton.href = "#bodyEditor"; // Set the href attribute
  newButton.className = "quote btn btn-success btn-xs";

  // Add style for background color and border color
  newButton.style.backgroundColor = "#A55BC1";
  newButton.style.borderColor = "#933DB4"; // Set border color

  // Create an <i> element for the Font Awesome icon
  let iconElement = document.createElement("i");
  iconElement.className = "fa fa-copy"; // Set Font Awesome class for copy icon

  // Append the icon element to the newButton
  newButton.appendChild(iconElement);

  // Append text node for button text
  let buttonText = document.createTextNode(" Copiar post");
  newButton.appendChild(buttonText);

  // Add click event listener to the button
  newButton.addEventListener("click", function (event) {
    event.preventDefault();

    let postContent = action.parentNode
      .querySelector(".comment-text > div")
      .innerHTML.trim(); // Example selector for post content

    navigator.clipboard
      .writeText(postContent)
      .then(() => {
        newButton.textContent = "Post copiado!";
        setTimeout(function () {
          newButton.textContent = "Copiar post"; // Reset button text after a delay
        }, 2000);
      })
      .catch((error) => console.warn("erro:", error));
  });

  // Append the button to the current 'action' element
  action.appendChild(newButton);
};

function addDeleteButton(actionElement) {
  let replyId = actionElement
    .querySelector("[data-reply]")
    ?.getAttribute("data-reply");

  if (!replyId) {
    console.error("Could not find comment ID for delete button.");
    return;
  }

  let newButton = document.createElement("a");
  newButton.href = `https://yoble.us/Main/communities/thread/delete/reply/${replyId}`;
  newButton.setAttribute("data-comment", `#comment_${replyId}`);
  newButton.setAttribute("data-msg", "Confirma a exclusão da resposta?");
  newButton.title = "Excluir resposta";
  newButton.innerHTML = '<i class="fa fa-trash"></i>';
  newButton.classList.add("btn", "btn-danger", "btn-xs", "trash");

  actionElement.prepend(newButton); // 🔹 Add at the beginning
}

if (forumComunidade) {
  // Find all elements with class 'action' inside the forumComunidade element
  let actions = forumComunidade.querySelectorAll(
    ".list-group-item > .row > .col-xs-10 > .action"
  );

  actions.forEach((action) => createCopiarPostButton(action));

  // MutationObserver to watch for new posts being added
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches(".list-group-item")) {
          let action = node.querySelector(".row > .col-xs-10 > .action");
          if (action) {
            createCopiarPostButton(action);
            addDeleteButton(action);
          }
        }
      });
    });
  });

  observer.observe(forumComunidade, { childList: true, subtree: true });
} else {
  console.error("Could not find the 'forum-comunidade' element on the page.");
}
