let myLibrary = [
    {
        title: "Hamlet",
        author: "William Shakespeare",
        pages: 350,
        read: true
    }
]



const form = document.querySelector('form')
const wrapper = document.querySelector('.wrapper')
const titleInp = form.querySelector('#title')
const authorInp = form.querySelector('#author')
const pagesInp = form.querySelector('#pages')
const submit = form.querySelector('#submit')
const library = document.querySelector('.content')
const add = document.querySelector('#add')
const cancel = document.querySelector('#cancel')

add.addEventListener('click',()=>{
    wrapper.classList.toggle('hide');
})

cancel.addEventListener('click', ()=>{
    wrapper.classList.toggle('hide')
    form.reset()
})
function getRead(){
    return form.querySelector('#yes').checked ? true : false;
}
function book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const setRemove = (index) => {
    myLibrary.splice(index,1);
    setCards();
}
const setRead = (e,book) =>{
    book.read = !book.read;
    e.target.textContent = e.target.textContent == 'read' ? 'not read' : 'read';
    e.target.parentNode.style.borderTopColor = e.target.textContent == "read" ? 'lime':'red';
}
function createCard(ind){
    let card = document.createElement('div')
    let title = document.createElement('p')
    let author = document.createElement('p')
    let pages = document.createElement('p')
    let remove = document.createElement('button')
    let edit = document.createElement('button')

    title.textContent = `${ind.title}`
    author.textContent = `Author : ${ind.author}.`
    pages.textContent = `${ind.pages} pages`;
    remove.textContent = 'delete';
    edit.textContent = ind.read ? 'read': 'not read';
    card.style.borderTopColor = ind.read ? 'lime' : 'red';

    remove.addEventListener('click', ()=>setRemove(myLibrary.indexOf(ind)));
    edit.addEventListener('click', (e)=>setRead(e, ind));
    
    card.append(title,author,pages , edit, remove)
    card.className = "card"
    return card;
}

function checkInputs(input){
    if(input.value.match(/^\s+$/gi) || input.value === ''){
        input.classList.add('red-light')
        input.previousSibling.classList.add('error')
        console.log(input.previousSibling);
        return false
    }
    input.previousSibling.classList.remove('error');
    input.classList.remove('red-light')
    return true
}

function addBookToLibrary(){
    //checks all inputs are valid to create a book card
    if(!(checkInputs(titleInp) && checkInputs(authorInp) && checkInputs(pagesInp))){
        return
    }

    let title = titleInp.value
    let author = authorInp.value
    let pages = pagesInp.value
    let read = getRead();
    form.reset();
    

    let newBook = new book(title,author, pages, read);
    myLibrary.push(newBook);
    setCards();
}

function setCards(){

    library.innerHTML= '';

    for(let i=0; i<myLibrary.length; i++)
    library.appendChild(createCard(myLibrary[i]))
    
    if(myLibrary.length == 0){
        library.textContent = 'No books here! please add you favourite books...'
    }
}

setCards();
submit.addEventListener('click', addBookToLibrary )