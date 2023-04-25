function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
};

function displayBooks() {
  const tbody = document.querySelector("tbody");
  while (tbody.childNodes.length) {
    tbody.removeChild(tbody.childNodes[0]);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let row = tbody.insertRow();

    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    c1.textContent = myLibrary[i].title;
    c2.textContent = myLibrary[i].author;
    c3.textContent = myLibrary[i].pages;

    let readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.setAttribute("row", i);
    myLibrary[i].read
      ? readBtn.classList.add("read")
      : readBtn.classList.remove("read");
    c4.appendChild(readBtn);

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.setAttribute("row", i);
    removeBtn.innerHTML = "&times;";
    c5.appendChild(removeBtn);
  }
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((button) => {
    button.addEventListener("click", removeBook);
  });

  const readBtns = document.querySelectorAll(".read-btn");
  readBtns.forEach((button) => {
    button.addEventListener("click", toggleRead);
  });
}

let myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 304, false),
  new Book("Normal People", "Sally Rooney", 266, false),
  new Book("Flow", "Mihaly Csikszentmihalyi", 336, true),
  new Book("Killers of the Flower Moon", "David Grann", 352, false),
];
displayBooks();

const newBookBtn = document.querySelector(".add-book");
const popup = document.querySelector(".popup");
const overlay = document.querySelector("#overlay");
const form = document.querySelector(".form-container");

newBookBtn.addEventListener("click", openPopup);
overlay.addEventListener("click", closePopup);
form.addEventListener("submit", handleUserInput);

function openPopup() {
  popup.classList.add("active");
  overlay.classList.add("active");
}
function closePopup() {
  popup.classList.remove("active");
  overlay.classList.remove("active");
  clearInput();
}

function handleUserInput(e) {
  e.preventDefault(); //submit input sends data to a server by default
  let title = form.elements["title"];
  let author = form.elements["author"];
  let pages = form.elements["pages"];
  let read = form.elements["read"];
  addToLibrary(title.value, author.value, pages.value, read.checked);
  closePopup();
  displayBooks();
}

function addToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  // store the new book objects into an array
  myLibrary.push(newBook);
}

function removeBook(e) {
  let row = e.target.getAttribute("row");
  myLibrary.splice(row, 1);
  displayBooks();
}

function toggleRead(e) {
  let row = e.target.getAttribute("row");
  myLibrary[row].toggleReadStatus();
  displayBooks();
}

function clearInput() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}
