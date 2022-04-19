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
    this.display = function() {
        displayBook(this);
    }

    this.delete = function() {
        deleteBook(this);
    }
}

function addBook(book) {
    myLibrary.push(book);
}

const hatchet = new Book('Hatchet', 'Gary Paulsen', 4000, true);
const testBook = new Book('Test Book', "Testson", 300, false)

addBook(hatchet);
addBook(testBook)

function deleteBook(book) {
    const targets = Array.from(document.querySelectorAll('.booktitle'));
    targets.forEach(target => {
    
        if (target.innerText.toLowerCase() === book.title.toLowerCase()) {
            target.parentElement.parentElement.parentElement.remove();
        }
    
    });
}

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

    //Add edit book button.
    const editBtn = document.createElement('button');
    editBtn.classList.add('editbtn');
    editBtn.innerText = 'Edit';
    bookTop.appendChild(editBtn);


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

    editBtn.addEventListener('click', () => {
        
        console.log(book.title)

        bookTop.style.backgroundColor = 'red';
        const addBookPanel = document.getElementById('addbookpanel');
        document.querySelector('legend').innerText = 'Edit Book';

        addBookPanel.classList.toggle('addbookdisplay');
        document.getElementById('titleinput').value = book.title;
        document.getElementById('authorinput').value = book.author;
        document.getElementById('pageinput').value = book.pages;
        document.getElementById('readinput').value = book.read;
        
        submitBookBtn.addEventListener('click' , () => {
          
            if (validate()) {
                book.delete();
                console.log('book deleted')
                book.title = document.getElementById('titleinput').value;
                book.author = document.getElementById('authorinput').value;

                
                book.display();

            }
            

        });
        

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


    if (formValidity === 3) {
        return true;
    } else {
        return false;
    }
}

//Open or close the add book panel, and clear its inputs.
const addBookBtn = document.querySelector('#addbookbtn');
addBookBtn.addEventListener('click', () => {
    document.querySelector('legend').innerText = 'Add Book';
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


//Add new book after submitting input.
// function makeBookFromInput() {
    
//     let title = document.getElementById('titleinput').value;
//     let author = document.getElementById('authorinput').value;
//     let pages = document.getElementById('pageinput').value;
//     const read = document.getElementById('readinput').value;

//     if (validate()) { 
//         const fuck = new Book(title, author, pages, read);
//         addBook(fuck);
//         displayBook(fuck);
//         clearInputs();
//         document.getElementById('addbookpanel').classList.toggle('addbookdisplay');
//     }
    
// }



const submitBookBtn = document.getElementById('submitbookbtn');

// submitBookBtn.addEventListener('click' , () => {
//     if (document.querySelector('legend').innerText === 'Add Book'){
//         makeBookFromInput();
//     }
// });

//Display default books.
// myLibrary.forEach(book => {
//     displayBook(book);
// });

// window.addEventListener('keydown', (key) => {
//     if (key.code === 'Enter') {
//         makeBookFromInput();
//     }
// });


// window.addEventListener('click', () => {
//     console.log(myLibrary);
// });

hatchet.display();
testBook.display();