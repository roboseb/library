let myLibrary = [];

//Book constructor.
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
    this.info = function() {
        let readAlert;
        read ? readAlert = 'read.' : readAlert = 'not read yet.';
        return `${title} by ${author}, ${pages}, ${readAlert}`;
    }
}

function addBook(book) {
    myLibrary.push(book);
}

const hatchet = new Book('Hatchet', 'Gary Paulsen', 195, true);

addBook(hatchet);
addBook(hatchet);
console.log(myLibrary);

const book = document.querySelector('.bookbox');
console.log(book);
console.log(book.firstElementChild.firstElementChild);
//book.firstElementChild

const pageBottom = book.firstElementChild.firstElementChild;

const newPage = document.createElement('div');
newPage.classList.add('page');
pageBottom.appendChild(newPage);

const newPageBottom = book.firstElementChild.firstElementChild.firstElementChild;

const newNewPage = document.createElement('div');
newNewPage.classList.add('page', 'pagebottom');
newPageBottom.appendChild(newNewPage);
