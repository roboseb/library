let myLibrary = [];
const coverArt = ['images/face1.png', 'images/face2.png', 
                    'images/rose.png', 'images/hand.png'];

//Book constructor.
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
    this.info = function() {
        let readAlert;
        read ? readAlert = 'read' : readAlert = 'not read yet';
        return `${title} by ${author}, ${pages} pages, ${readAlert}`;
    }
    this.readAlert = function() {
        let readAlert;
        read ? readAlert = 'Read' : readAlert = 'Unread';
        return readAlert;

    }
}

function addBook(book) {
    myLibrary.push(book);
}

const hatchet = new Book('Hatchet', 'Gary Paulsen', 195, true);
const test = new Book('The Lord of the Rings', 'Test Testsson', 50, false);

addBook(hatchet);
addBook(test);


//Returns last descendant of an element.
function getLastDescendant(element) {
    let descendants = Array.from(element.querySelectorAll('*'));
    return descendants[descendants.length -1];
}

//Adds top page to the bottom of a book.
function addPage(firstPage) {

    let bottomPage = getLastDescendant(firstPage);

    const newPage = document.createElement('div');
    newPage.classList.add('page');
    bottomPage.appendChild(newPage);
}

//Adds the lower page to the bottom of a book.
function addPageBottom(firstPage) {

    let bottomPage = getLastDescendant(firstPage);

    const newPage = document.createElement('div');
    newPage.classList.add('page', 'pagebottom');
    bottomPage.appendChild(newPage);
}

//Add a new book to the book grid.
function displayBook(book) {

    const extraPages = Math.floor(book.pages/50);

    //Add a book container to the book grid.
    const bookGrid = document.getElementById('bookgrid');
    const bookBox = document.createElement('div');
    bookBox.classList.add('bookbox');
    bookGrid.appendChild(bookBox);

    //Generate base page and page bottom.
    const firstPage = document.createElement('div');
    firstPage.classList.add('page', 'firstpage');
    bookBox.appendChild(firstPage);
    const secondPage = document.createElement('div');
    secondPage.classList.add('page', 'pagebottom');
    firstPage.appendChild(secondPage);

    //Generate book binding based on book page count.
    const binding = document.createElement('div');
    binding.classList.add('binding');
    binding.style.bottom = `${-6 * (extraPages + 1)}px`;
    binding.style.borderLeft = `${6 * (extraPages + 1)}px solid transparent`;
    binding.style.borderTop = `${6 * (extraPages + 1)}px solid var(--accent)`;
    bookBox.appendChild(binding);


    //Generate book top.
    const bookTop = document.createElement('div');
    bookTop.classList.add('booktop');
    bookBox.appendChild(bookTop);

    //Add book cover.
    const bookCover = document.createElement('img');
    bookCover.src = coverArt[Math.floor(Math.random() * coverArt.length)];
    bookTop.appendChild(bookCover);


    //Display book info on cover, and generate relevant flexboxes.
    const mainBox = document.createElement('div');
    mainBox.classList.add('mainbox');
    bookTop.appendChild(mainBox);

    const bookTitle = document.createElement('div');
    bookTitle.classList.add('bookinfo', 'booktitle');
    bookTitle.innerText = book.title;
    mainBox.appendChild(bookTitle);

    const secondBox = document.createElement('div');
    secondBox.classList.add('secondbox');
    mainBox.appendChild(secondBox);

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('bookinfo', 'bookauthor');
    bookAuthor.innerText = book.author;
    secondBox.appendChild(bookAuthor);

    const thirdBox = document.createElement('div');
    thirdBox.classList.add('thirdbox');
    secondBox.appendChild(thirdBox);

    const bookPages = document.createElement('div');
    bookPages.classList.add('bookinfo', 'bookpages');
    bookPages.innerText = `${book.pages} pages`;
    thirdBox.appendChild(bookPages);

    const bookRead = document.createElement('div');
    bookRead.classList.add('bookinfo', 'bookread');
    bookRead.innerText = book.readAlert();
    thirdBox.appendChild(bookRead);
    

    //Display extra pages based on book page count.
    for (let i = 0; i < extraPages; i++) {
        addPage(firstPage);
        addPageBottom(firstPage);
    }
}

const addBookBtn = document.querySelector('#addbookbtn');
addBookBtn.addEventListener('click', () => {
    const title = prompt('What is the title?');
    const author = prompt('Who is the author?');
    const pages = prompt('How many pages are there?');
    const read = prompt('Have you read the book?');
    const fuck = new Book(title, author, pages, read); 
    addBook(fuck);
    displayBook(fuck);
});

myLibrary.forEach(book => {
    displayBook(book);
});

