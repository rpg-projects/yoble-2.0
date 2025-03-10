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

if (forumComunidade) {
  // Find all elements with class 'action' inside the forumComunidade element
  let actions = forumComunidade.querySelectorAll(
    ".list-group-item > .row > .col-xs-10 > .action"
  );

  actions.forEach((action) => createCopiarPostButton(action));
} else {
  console.error("Could not find the 'forum-comunidade' element on the page.");
}
