let myLibrary = [];
const coverArt = ['images/face1.png', 'images/face2.png', 
                    'images/rose.png', 'images/hand.png'];

//Book constructor.
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
    this.art = coverArt[Math.floor(Math.random() * coverArt.length)];
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
    this.display = function() {
        displayBook(this);
        updateRows();
    }

    this.delete = function() {
        deleteBook(this);
        updateRows();
    }
}

function addBook(book) {
    myLibrary.push(book);
}

const hatchet = new Book('Hatchet', 'Gary Paulsen', 4000, true);
const testBook = new Book('Test Book', "Testson", 300, false)

addBook(hatchet);
addBook(testBook);

function deleteBook(book) {
    const targets = Array.from(document.querySelectorAll('.booktitle'));
    targets.forEach(target => {
    
        if (target.innerText.toLowerCase() === book.title.toLowerCase()) {
            target.parentElement.parentElement.parentElement.remove();
        }
    
    });
}

let recentBook;

//Add a new book to the book grid.
function displayBook(book) {

    let extraPages = Math.floor(book.pages/50);
    if (extraPages > 20) {extraPages = 20;}

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
    bookCover.src = book.art;
    bookTop.appendChild(bookCover);

    //Add edit book button.
    const editBtn = document.createElement('button');
    editBtn.classList.add('editbtn');
    editBtn.innerText = 'Edit';
    bookTop.appendChild(editBtn);

    //Add delete book button.
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deletebtn');
    deleteBtn.innerText = 'Remove';
    bookTop.appendChild(deleteBtn);

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

    //Add edit option to books.
    editBtn.addEventListener('click', () => {
        submitBookBtn.innerText = 'Update Book';

        const addBookPanel = document.getElementById('addbookpanel');
        document.querySelector('legend').innerText = 'Edit Book';
        mode = 'edit';
        addBookPanel.classList.toggle('addbookdisplay');

        //Set all options in book editing to their current values.
        document.getElementById('titleinput').value = book.title;
        document.getElementById('authorinput').value = book.author;
        document.getElementById('pageinput').value = book.pages;
        document.getElementById('readinput').value = book.read;
        
        //Set book being edited to clicked book.
        recentBook = book;
    });

    //Add delete option to books.
    deleteBtn.addEventListener('click', () => {
        console.log('wtf');
        book.delete();
    });

    
}




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

errorMessage = document.getElementById('errormessage');

errorMessage.textContent = '';


//Clear inputs in the add book panel.
function clearInputs() {
    document.getElementById('titleinput').value = "";
    document.getElementById('authorinput').value = "";
    document.getElementById('pageinput').value = "";
}

//Validate inputs on form.
function validate() {
    let formValidity = 0;

    let inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach(input => {
        if (input.validity.valid) {formValidity ++;}
    });

    //Either re
    if (formValidity === 3) {
        errorMessage.style.display = 'none';
        return true;
    } else {
        const inputs = Array.from(document.querySelectorAll('input'));

        errorMessage.textContent = 'Pages can be between 1 and 10,000';
        errorMessage.style.display = 'block';

        inputs.forEach(input => {
            if (input.value === '') {
                errorMessage.textContent = 'All info required';
            } 
        });
        return false;
    }
}

//Open or close the add book panel, and clear its inputs.
const addBookBtn = document.querySelector('#addbookbtn');
addBookBtn.addEventListener('click', () => {
    submitBookBtn.innerText = 'Add Book';
    document.querySelector('legend').innerText = 'Add Book';
    mode = 'add';
    const addBookPanel = document.getElementById('addbookpanel');
    addBookPanel.classList.toggle('addbookdisplay');
    clearInputs();
});

//Close book edt/add panel.
const closeBtn = document.getElementById('closebtn');
closeBtn.addEventListener('click', () => {
    const addBookPanel = document.getElementById('addbookpanel');
    addBookPanel.classList.toggle('addbookdisplay');
    clearInputs();
});

//Initialize mode for either adding or editing books, and the submit button.
let mode;
const submitBookBtn = document.getElementById('submitbookbtn');

//Add new book after submitting input.
function makeBookFromInput() {
    
    let title = document.getElementById('titleinput').value;
    let author = document.getElementById('authorinput').value;
    let pages = document.getElementById('pageinput').value;
    const read = document.getElementById('readinput').value;

    const newBook = new Book(title, author, pages, read);
    addBook(newBook);
    displayBook(newBook);
    clearInputs();
    document.getElementById('addbookpanel').classList.toggle('addbookdisplay');
    
}

function updateBook() {
    recentBook.delete();
        
    recentBook.title = document.getElementById('titleinput').value;
    recentBook.author = document.getElementById('authorinput').value;
    recentBook.pages = document.getElementById('pageinput').value;
    recentBook.read = document.getElementById('readinput').value;

    //Update book display.
    recentBook.display();
    document.getElementById('addbookpanel').classList.toggle('addbookdisplay');
}

//Add book or update book on submit option click.
submitBookBtn.addEventListener('click' , () => {   
    if (validate()) {
        if (mode === 'edit') {
            updateBook();
        } else {
            makeBookFromInput();
            updateRows();
        } 
    }
});

//Add book or update book on pressing enter.
window.addEventListener('keydown', (key) => {
    if (key.code === 'Enter') {
        if (validate()) {
            if (mode === 'edit') {
                updateBook();
            } else {
                makeBookFromInput();
                updateRows();
            } 
        }
    }
});

function updateLibraryDisplay(){
    const books = Array.from(myLibrary);
    books.forEach(book => {
        book.delete();
    });
    books.forEach(book => {
        book.display();
    });
}

hatchet.display();
testBook.display();
hatchet.display();
testBook.display();
hatchet.display();
testBook.display();
hatchet.display();
testBook.display();
hatchet.display();
testBook.display();





//Responsively create rows based on column count and feedpanel count.
function updateRows() {
    let totalCells = 0;
    const cells = document.getElementsByClassName('bookbox');
    const cellArray = Array.from(cells);
    cellArray.forEach( () => {
        totalCells++;
    });
    console.log(totalCells);
    const root = document.documentElement;
    
    const grid = document.getElementById('bookgrid');
    const gridComputedStyle = window.getComputedStyle(grid);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    root.style.setProperty('--rowcount', Math.ceil(totalCells/gridColumnCount));
}

window.addEventListener('resize', () => {
    updateRows();
});

updateRows();