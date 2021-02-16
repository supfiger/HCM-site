// constants
const headerNav = document.querySelector(".headerNav");
const navDropdownButton = document.querySelector(".headerNavDropdownButton");
const filterDropdownButton = document.querySelector(".filterDropdownButton");
const filtersAside = document.querySelector(".filtersAside");

const navListAllItems = document.querySelectorAll(".headerNav li");
const filterCheckboxInputs = document.querySelectorAll(".checkboxInput");
const checkboxAllCards = document.querySelectorAll(".checkboxCard");
const arrowDropdownAllButtons = document.querySelectorAll(".arrowDropdownButton");
const dropdownListAllInputs = document.querySelectorAll(".itemsDropdownList .checkboxInput");

// functions
function onClickNavItem(e) {
  const currentItem = e.target;

  // on click set new active item
  navListAllItems.forEach((item) => item.classList.remove("headerNavActiveItem"));
  currentItem.classList.add("headerNavActiveItem");
}

function onClickFilterCheckboxInput(e) {
  const currentItem = e.target;
  const filterCheckboxItem = currentItem.closest("li");
  const checkboxText = filterCheckboxItem.querySelector(".checkboxText");

  checkboxText.classList.toggle("checkboxTextActive");
}

function onClickCheckboxCard(e) {
  e.stopPropagation();
  const currentItem = e.target;
  const card = currentItem.closest(".checkboxCard");
  const checkmark = card.querySelector(".checkboxCardCheckmark");

  card.classList.toggle("checkboxCardSelected");
  checkmark.classList.toggle("displayFlex");
}

function onClickArrowDropdownButton(e) {
  const currentItem = e.target;
  const filterSubBlock = currentItem.closest(".filterSubBlock");
  const filterSelectItemBlock = currentItem.closest(".filterSelectItemBlock");
  const itemsDropdownBlock = (filterSelectItemBlock || filterSubBlock).querySelector(".itemsDropdownBlock");

  currentItem.classList.toggle("rotate180Deg");
  itemsDropdownBlock.classList.toggle("displayNone");
}

function onClickNavDropdownButton() {
  const isOpenDropdown = headerNav.classList.contains("headerNavDropdown");

  if (isOpenDropdown) {
    navDropdownButton.style.fontSize = "14px";
    navDropdownButton.innerText = "Menu";
  } else {
    navDropdownButton.style.fontSize = "20px";
    navDropdownButton.innerText = "×";
  }

  headerNav.classList.toggle("headerNavDropdown");
}

function onClickFilterDropdownButton() {
  const cross = filterDropdownButton.querySelector(".cross");

  cross.classList.toggle("displayNone");
  filtersAside.classList.toggle("displayNone");
}

function onDOMContentLoaded() {
  const pageName = document.querySelector("title").innerText;
  const headerItemsArray = Object.values(navListAllItems);
  const activeItemIndex = headerItemsArray.findIndex((item) => item.innerText === pageName);
  const activeItem = headerItemsArray[activeItemIndex];

  // set default active item
  activeItem.classList.add("headerNavActiveItem");
}

// event listeners
navListAllItems.forEach((item) => {
  item.addEventListener("click", onClickNavItem);
});
filterCheckboxInputs.forEach((item) => {
  item.addEventListener("click", onClickFilterCheckboxInput);
});
checkboxAllCards.forEach((item) => {
  item.addEventListener("click", onClickCheckboxCard);
});
arrowDropdownAllButtons.forEach((item) => {
  item.addEventListener("click", onClickArrowDropdownButton);
});
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
navDropdownButton.addEventListener("click", onClickNavDropdownButton);
filterDropdownButton?.addEventListener("click", onClickFilterDropdownButton);
