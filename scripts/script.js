const bookTable = document.getElementById('transaction-body');
const newBookBtn = document.getElementById('new-book');
const confirmBtn = document.getElementById('confirm');
const cancelBtn = document.getElementById('cancel');
const addBookMdl = document.getElementById('add-book-modal');


newBookBtn.addEventListener("click", function (){
    addBookMdl.showModal();
});

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookMdl.close();
});

addBookMdl.addEventListener("close", () => {
    resetDialogInput();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let isOk = addBook();
    if(isOk){
        addBookMdl.close();    
    }
});

document.getElementById('book-title').addEventListener("input", () =>
    updateValidationMessage(document.getElementById('book-title'), 
                            document.getElementById('book-title-msg')
    )
);

document.getElementById('book-title').addEventListener("blur", () =>
    updateValidationMessage(document.getElementById('book-title'), 
                            document.getElementById('book-title-msg')
    )
);

document.getElementById('author').addEventListener("input", () =>
    updateValidationMessage(document.getElementById('author'), 
                            document.getElementById('author-msg')
    )
);

document.getElementById('author').addEventListener("blur", () =>
    updateValidationMessage(document.getElementById('author'), 
                            document.getElementById('author-msg')
    )
);

document.getElementById('no-of-pages').addEventListener("input", () =>
    updateValidationMessage(document.getElementById('no-of-pages'), 
                            document.getElementById('no-of-pages-msg')
    )
);

document.getElementById('no-of-pages').addEventListener("blur", () =>
    updateValidationMessage(document.getElementById('no-of-pages'), 
                            document.getElementById('no-of-pages-msg')
    )
);

function Book(bookTitle, author, numOfPages, read){
    this.bookTitle = bookTitle;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read
}

const book1 = new Book("The Hobbit", "J.K.K. Rowling", 295, true);
const book2 = new Book("Letters to Young Poet", "Rainer Maria Rilke", 51, false);

let bookList = [
    book1,
    book2
];

function clearTable(){
    while(bookTable.rows.length >= 1) bookTable.deleteRow(-1);
}

function addBook(){
    const bookTitle = document.getElementById('book-title');
    const author = document.getElementById('author');
    const noOfPages = document.getElementById('no-of-pages');
    const isRead = document.querySelector('input[name="read-status"]:checked').value === "true";
  
    if(bookTitle.checkValidity() && author.checkValidity() 
        && noOfPages.checkValidity()){
            
        let book = new Book(
            bookTitle.value,
            author.value,
            noOfPages.value,
            isRead
        );
            
        bookList.push(book);
        updateTable();
        return true;
    }

    return false;
}

function updateValidationMessage(inpt, msg){
    if(!inpt.checkValidity()){
        msg.textContent = inpt.validationMessage;
    } else {
        msg.textContent = '';
    }
}

function resetDialogInput(){
    const bookTitle = document.getElementById('book-title');
    const author = document.getElementById('author');
    const noOfPages = document.getElementById('no-of-pages');
    const notYetRead = document.getElementById('not-yet-read');

    bookTitle.value = "";
    document.getElementById('book-title-msg').textContent = "";
    author.value = "";
    document.getElementById('author-msg').textContent = "";
    noOfPages.value = 1;
    document.getElementById('no-of-pages-msg').textContent = "";
    notYetRead.checked = true;
}

function insertRow(e, i){
    let row = bookTable.insertRow(i);
    let bookTitle = row.insertCell(0);
    let author = row.insertCell(1);
    let numOfPages = row.insertCell(2);
    let read = row.insertCell(3);
    let remove = row.insertCell(4);

    bookTitle.innerHTML = e.bookTitle;
    author.innerHTML = e.author;
    numOfPages.innerHTML = e.numOfPages;
    read.innerHTML= e.read ? "Already Read" : "Not Read Yet";
    read.addEventListener("click", () => onClickReadStatus(e));
    remove.innerHTML = "Delete";
    remove.addEventListener('click', () => deleteBook(e));
}

function deleteBook(book){
    bookList = bookList.filter((e) => 
        e !== book
    ); 
    updateTable();
}

function onClickReadStatus(book){
    bookList = bookList.map((item) => {
        if(item === book && book.read === false){
            return {...item, read: !book.read};
        }
        return item;
    });
    updateTable();
}

function updateTable(){
    clearTable();
    if (bookList.length > 0) {
        bookList.map((e, i) => {
            insertRow(e, i);
        });
    }   
}

updateTable();