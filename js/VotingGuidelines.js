// constants
const liAllItems = document.querySelectorAll(".filterSelectItemBlock li");
const dropdownListAllButtons = document.querySelectorAll(".filterTitle .arrowDropdownButton");

const searchInput = document.querySelector(".searchSection input");

// functions
function onClickLiItem(e) {
  const currentItem = e.target;

  // on click set new active item
  liAllItems.forEach((item) => item.classList.remove("liActiveItem"));
  currentItem.classList.add("liActiveItem");
}

function onClickDropdownButton(e) {
  const currentItem = e.target;
  const filterSubBlock = currentItem.closest(".filterSubBlock");
  const isDropdownClose = filterSubBlock.querySelector(".itemsDropdownBlock").classList.contains("displayNone");
  const filterTitle = currentItem.closest(".filterTitle");
  const button = filterTitle.querySelector("button img");

  if (!isDropdownClose) {
    filterTitle.classList.add("filterTitleActive");
    button.classList.add("arrowButtonActive");
  } else {
    filterTitle.classList.remove("filterTitleActive");
    button.classList.remove("arrowButtonActive");
  }
}

function openedDropdownList() {
  dropdownListAllButtons.forEach((item) => {
    const filterSubBlock = item.closest(".filterSubBlock");
    const isDropdownClose = filterSubBlock.querySelector(".itemsDropdownBlock").classList.contains("displayNone");
    const filterTitle = item.closest(".filterTitle");
    const button = filterTitle.querySelector("button img");

    if (!isDropdownClose) {
      filterTitle.classList.add("filterTitleActive");
      button.classList.add("arrowButtonActive");
    } else {
      filterTitle.classList.remove("filterTitleActive");
      button.classList.remove("arrowButtonActive");
    }
  });
}

function setAnotherPlaceholder() {
  const currentWidth = document.body.clientWidth;

  if (currentWidth < 576) {
    searchInput.placeholder = "Search";
  }
}

function onDocumentLoad() {
  setAnotherPlaceholder();
  openedDropdownList();
}

// event listeners
liAllItems.forEach((item) => {
  item.addEventListener("click", onClickLiItem);
});
dropdownListAllButtons.forEach((item) => {
  item.addEventListener("click", onClickDropdownButton);
});
document.addEventListener("DOMContentLoaded", onDocumentLoad);
