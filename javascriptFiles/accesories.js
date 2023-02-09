//retrieving elements and assigning to variables
const saveBtn = document.querySelectorAll(".saveButton");
const likeBtn = document.querySelectorAll(".like");

const sessionSaveforLater = "mySavedItems";
const sessionLiked = "myLikedItems";

//functions for setting and getting items from session storage
const saveForLater = (itemToSave) => {
  sessionStorage.setItem(sessionSaveforLater, JSON.stringify(itemToSave));
};
const loadSaveForLater = () => {
  return JSON.parse(sessionStorage.getItem(sessionSaveforLater));
};

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

//function to add items to the saved for later session storage
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

//adding an event listener to each save button
saveBtn.forEach((button) => {
  button.addEventListener("click", addToSaveforLater);
});

//function to like an item on the page

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
