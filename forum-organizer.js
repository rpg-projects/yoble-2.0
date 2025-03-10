// content.js

// Select the container element with id 'forum-comunidade'
const forumContainer = document.getElementById("forum-comunidade");
console.log("forumContainer :>> ", forumContainer);

if (forumContainer) {
  // Select all elements with class 'post-forum' inside 'forum-comunidade'
  const postForumElements = Array.from(
    forumContainer.querySelectorAll(".post-forum")
  );

  // Sort elements based on presence of 'uk-icon-lock' class
  postForumElements.sort((a, b) => {
    // Check if 'a' has 'uk-icon-lock' class
    const hasLockA = a.querySelector("i.uk-icon-lock") !== null;
    // Check if 'b' has 'uk-icon-lock' class
    const hasLockB = b.querySelector("i.uk-icon-lock") !== null;

    // Sort logic - elements with 'uk-icon-lock' class go to bottom
    if (hasLockA && !hasLockB) {
      return 1; // 'a' comes after 'b'
    } else if (!hasLockA && hasLockB) {
      return -1; // 'a' comes before 'b'
    } else {
      return 0; // Maintain current order
    }
  });

  // Remove existing elements from DOM
  postForumElements.forEach((element) => {
    element.remove();
  });

  // Append sorted elements back to the container
  postForumElements.forEach((element) => {
    forumContainer.appendChild(element);
  });
} else {
  console.log('Element with id "forum-comunidade" not found.');
}
