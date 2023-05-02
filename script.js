const Book = class {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleReadStatus() {
    if (this.read) {
      this.read = false;
    } else {
      this.read = true;
    }
  }
};

let myLibrary = class {
  constructor() {
    this.books = [];
  }
  getNumBooks() {
    return this.books.length;
  }
  getBook(row) {
    return this.books[row];
  }
  addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    this.books.push(book);
  }
  removeBook(row) {
    this.books.splice(row, 1);
  }
};
const library = new myLibrary();

library.addBook("The Hobbit", "J.R.R. Tolkien", 304, false);
library.addBook("Normal People", "Sally Rooney", 266, false);
library.addBook("Flow", "Mihaly Csikszentmihalyi", 336, true);
library.addBook("Killers of the Flower Moon", "David Grann", 352, false);

const displayBooks = () => {
  const tbody = document.querySelector("tbody");
  while (tbody.childNodes.length) {
    tbody.removeChild(tbody.childNodes[0]);
  }

  for (let i = 0; i < library.getNumBooks(); i++) {
    let row = tbody.insertRow();

    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    c1.textContent = library.getBook(i).title;
    c2.textContent = library.getBook(i).author;
    c3.textContent = library.getBook(i).pages;

    let readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.setAttribute("row", i);
    library.getBook(i).read
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
};
displayBooks();

function removeBook(e) {
  const row = e.target.getAttribute("row");
  library.removeBook(row);
  displayBooks();
}

function toggleRead(e) {
  const row = e.target.getAttribute("row");
  library.getBook(row).toggleReadStatus();
  displayBooks();
}

const openPopup = () => {
  popup.classList.add("active");
  overlay.classList.add("active");
};
const closePopup = () => {
  popup.classList.remove("active");
  overlay.classList.remove("active");
};

const clearFormInput = () => {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
};

const handleUserInput = (e) => {
  e.preventDefault(); //submit input sends data to a server by default
  const title = form.elements["title"].value;
  const author = form.elements["author"].value;
  const pages = form.elements["pages"].value;
  const read = form.elements["read"].checked;

  closePopup();
  clearFormInput();

  library.addBook(title, author, pages, read);
  displayBooks();
};

const form = document.querySelector(".form-container");
form.addEventListener("submit", handleUserInput);

const newBookBtn = document.querySelector(".add-book");
newBookBtn.addEventListener("click", openPopup);

const popup = document.querySelector(".popup");
const overlay = document.querySelector("#overlay");
overlay.addEventListener("click", closePopup);
