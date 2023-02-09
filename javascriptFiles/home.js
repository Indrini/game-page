//retrieving elements and assigning to variables
const commentForm = document.querySelector("#commentForm");
const commentBtn = document.querySelector("#commentBtn");
const commentBox = document.querySelector("#commentBox");
const commentEmail = document.querySelector("#commentUseremail");
const commentName = document.querySelector("#commentName");
const commentDisplay = document.querySelector("#commentDisplay");
const saveBtn = document.querySelectorAll(".saveButton");
const likeBtn = document.querySelectorAll(".like");

const sessionComments = "myComments";
const sessionSaveforLater = "mySavedItems";
const sessionLiked = "myLikedItems";

//creating a class constructor for comments
class Comment {
  constructor(name, email, commentText) {
    this.name = name;
    this.email = email;
    this.commentText = commentText;
  }
}

//functions to set and get from session storage and check if anything is in the session storage
const saveComments = (commentToSave) => {
  sessionStorage.setItem(sessionComments, JSON.stringify(commentToSave));
};
const loadComments = () => {
  return JSON.parse(sessionStorage.getItem(sessionComments));
};

const saveForLater = (itemToSave) => {
  sessionStorage.setItem(sessionSaveforLater, JSON.stringify(itemToSave));
};
const loadSaveForLater = () => {
  return JSON.parse(sessionStorage.getItem(sessionSaveforLater));
};

if (loadComments() === null) {
  saveComments([]);
}

if (loadSaveForLater() === null) {
  saveForLater([]);
}

const saveLikedItems = (itemToSave) => {
  sessionStorage.setItem(sessionLiked, JSON.stringify(itemToSave));
};
const loadLikedItems = () => {
  return JSON.parse(sessionStorage.getItem(sessionLiked));
};

if (loadLikedItems() === null) {
  saveLikedItems([]);
}

//function to show comments on the page
const showComments = () => {
  const allComments = loadComments();
  commentDisplay.innerHTML = null;
  const list = document.createElement("ul");
  allComments.forEach((value, index) => {
    const listItem1 = document.createElement("li");
    const listItem2 = document.createElement("li");
    const contentNameEmail = document.createTextNode(
      `${value.name} - ${value.email} says: `
    );
    const contentComment = document.createTextNode(`${value.commentText}`);

    listItem1.append(contentNameEmail);
    listItem1.classList.add("commentNameEmail");
    listItem2.append(contentComment);
    list.append(listItem1, listItem2);
    commentDisplay.append(list);
  });
};

//function to add comments to session storage
const addComments = () => {
  const allComments = loadComments();

  if (
    commentBox.value.length > 0 ||
    commentEmail.value.length > 0 ||
    commentName.value.length > 0
  ) {
    const commentValue = commentBox.value;
    const commentEmailValue = commentEmail.value;
    const commentNameValue = commentName.value;
    console.log(commentValue);
    const commentInput = new Comment(
      commentNameValue,
      commentEmailValue,
      commentValue
    );
    allComments.push(commentInput);
    saveComments(allComments);
    console.log(allComments);
    commentBox.value = "";
    commentEmail.value = "";
    commentName.value = "";
    showComments();
  }
};

const print = () => {
  console.log(
    commentBox.value.length,
    commentEmail.value.length,
    commentName.value.length
  );
};

commentBtn.addEventListener("click", addComments);
showComments();

//disabling the submit button if any of the form fields are empty
const setFormEnabled = () => {
  commentBtn.disabled =
    commentBox.value.length < 1 ||
    commentEmail.value.length < 1 ||
    commentName.value.length < 1;
};

//function to add items to saved for later
const addToSaveforLater = (event) => {
  const allSaveForLater = loadSaveForLater();
  let item = event.target.parentElement.innerHTML;
  if (!allSaveForLater.includes(item)) {
    allSaveForLater.push(item);
    console.log(allSaveForLater);
    saveForLater(allSaveForLater);
    let itemCount = allSaveForLater.length;
    alert(`Item saved. You now have ${itemCount} in your saved items`);
  } else {
    alert(`Item already saved for later`);
  }
};
setFormEnabled();
commentForm.addEventListener("input", setFormEnabled);

saveBtn.forEach((button) => {
  button.addEventListener("click", addToSaveforLater);
});

//functions to like items on the page

likeBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    const allLikedItems = loadLikedItems();
    button.classList.toggle("liked");
    console.log(button.id);
    if (button.classList.contains("liked")) {
      button.textContent = "Liked \u2764";
      allLikedItems.push(button.id);
    } else {
      button.textContent = "Like \u2764";
      const indexRemove = allLikedItems.indexOf(button.id);
      allLikedItems.splice(indexRemove, 1);
    }
    saveLikedItems(allLikedItems);
  });
});

const allLikedItems = loadLikedItems();

allLikedItems.forEach((buttonId) => {
  if (document.getElementById(buttonId)) {
    document.getElementById(buttonId).classList.add("liked");
    document.getElementById(buttonId).textContent = "Liked \u2764";
  }
});
