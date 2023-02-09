//retrieving elements and assigning to variaables
const savedDisplay = document.querySelector("#savedDisplay");
const gamesContainer = document.querySelector(".games-container");

const sessionComments = "myComments";
const sessionSaveforLater = "mySavedItems";

//functions for setting and getting items from session storage
const saveForLater = (itemToSave) => {
  sessionStorage.setItem(sessionSaveforLater, JSON.stringify(itemToSave));
};
const loadSaveForLater = () => {
  return JSON.parse(sessionStorage.getItem(sessionSaveforLater));
};

//checking if there's anything in session storage
if (loadSaveForLater() === null) {
  saveForLater([]);
}

//function to display items saved for later on the page
const showSavedForLater = () => {
  const allSaveForLater = loadSaveForLater();

  allSaveForLater.forEach((value) => {
    const container = document.createElement("div");
    const itemToDisplay = value;

    console.log(value);
    container.classList.add("saved");
    container.classList.add("grow");
    container.innerHTML = itemToDisplay;
    savedDisplay.append(container);
    gamesContainer.append(savedDisplay);
  });
};

showSavedForLater();

//functions to hide the save and like buttons
const hideSaveBtn = () => {
  const saveBtn = document.querySelectorAll(".saveButton");
  saveBtn.forEach((button) => {
    button.classList.add("hidden");
  });
};

hideSaveBtn();

const hideLikeBtn = () => {
  const saveBtn = document.querySelectorAll(".like");
  saveBtn.forEach((button) => {
    button.classList.add("hidden");
  });
};

hideSaveBtn();
hideLikeBtn();
