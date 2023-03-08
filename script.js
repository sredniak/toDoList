let todoInput //miejsce gdzie uzytkownik wpisuje tresc zadania
let errorInfo //info o braku zadan / koniecznosc wpisania tekstu
let addBtn //przycisk add - dodaje nowy element do listy
let ulList // lista zadań, tagi UL
let newTodo //nowo dodane LI , nowe zdanie 

let popup //popup
let popupInfo //tekst w popupie, jak sie doda pusty tekst
let todoToEdit //edytowany todo
let popupInput //input w popupie
let popupAddBtn //przycisk zatwierdz w popupie
let popupCloseBtn //przycisk 'anuluj' w popupie


const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    //pobieramy wszystkie elementy
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    //nadajemy nasłuchiwanie
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)

}

const addNewTodo = () => {
    if (todoInput.value !== ''){
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea(newTodo)

        ulList.append(newTodo)

        //czyscimy inputa po dodoaniu
        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania'
    }
}


const createToolsArea = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'


    toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
    if(e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    }else if (e.target.matches('.edit')) {
        editTodo(e)
    }else if (e.target.matches('.delete')){
        deleteTodo(e)
    }
}


const editTodo = e => {
    todoToEdit = e.target.closest('li')

    popupInput.value = todoToEdit.firstChild.textContent
    console.log(todoToEdit.firstChild);
    popup.style.display ='flex'
}

const closePopup = () => {
    popup.style.display ='none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if(popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś rzecz'
    }
}

const deleteTodo = e => {
    //element, w ktory sobie klikamy
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if(allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście'
    }
}

const enterKeyCheck = e => {

    if(e.key === 'Enter'){
        addNewTodo()
    }
    
}

//jezeli caly nasz dokument zostanie zaladownay, odpal funkcje main
document.addEventListener('DOMContentLoaded', main)