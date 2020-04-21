const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const input = document.getElementById('item')
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []


function toDo(e) {
    e.preventDefault()
    itemsArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    liMaker(input.value)
    input.value = ''
};

function liMaker(text) {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
}

function toDoInit() {
    itemsArray.forEach(item => {
        liMaker(item)
    })
}

function clearToDoList() {
    itemsArray = [];
    localStorage.clear()
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
}

export { toDo, clearToDoList, toDoInit, liMaker }