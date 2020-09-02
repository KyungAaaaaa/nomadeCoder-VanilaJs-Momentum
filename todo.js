const toDoForm = document.querySelector(".jsTodos"),
    todoList = document.querySelector(".jsTodoList"),
    toDoInput = toDoForm.querySelector("input");

const TODOS_KEY = "todos"
let toDos = [];

function loadTodos() {
    const loadedToDos = localStorage.getItem(TODOS_KEY);
    if (loadedToDos !== null) {
        const loadTodoList = JSON.parse(loadedToDos);
        loadTodoList.forEach(function (todos) {
            printTodos(todos.todo, todos.className);
        })
    }
}

function init() {
    toDoForm.addEventListener("submit", handleTodoSubmit)
    loadTodos();

}

function saveToDoLocalStorage() {

    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handleTodoSubmit(e) {
    e.preventDefault();
    const todoText = toDoInput.value;
    printTodos(todoText, null);
    toDoInput.value = "";

}

function handleToDoDeleteClick(e) {
    const targetBtn = e.target;
    const targetLi = targetBtn.parentNode;
    const deleteTodos = toDos.filter(todo => {
        return todo.id !== parseInt(targetLi.id);
    })
    todoList.removeChild(targetLi);
    toDos = deleteTodos;
    saveToDoLocalStorage();
}

function handleToDoComplete(event) {
    const className = "complete";
    const targetLi = event.target;
    if (targetLi.classList.contains(className)) {
        targetLi.classList.add("null");
        targetLi.classList.remove(className);
    } else {
        targetLi.classList.remove("null");
        targetLi.classList.add(className);
    }
    const todoObj = {
        id       : parseInt(targetLi.parentElement.id),
        todo     : targetLi.innerText,
        className: targetLi.className
    }
    toDos.splice((parseInt(targetLi.parentElement.id) - 1), 1, todoObj)
    saveToDoLocalStorage();
}

function printTodos(text, className) {
    const newTodoLi = document.createElement("li");
    const newTodoBtn = document.createElement("div");
    const newTextSpan = document.createElement("span")
    const newID = toDos.length + 1;
    newTextSpan.innerText = text;
    newTextSpan.classList.add(className);
    newTodoBtn.innerText = "X";
    newTodoBtn.addEventListener("click", handleToDoDeleteClick)
    newTodoLi.appendChild(newTextSpan);
    newTodoLi.appendChild(newTodoBtn);
    newTodoLi.id = newID;
    newTextSpan.addEventListener("dblclick", handleToDoComplete)
    todoList.appendChild(newTodoLi);
    const todoObj = {
        id       : newID,
        todo     : text,
        className: className
    }
    toDos.push(todoObj);
    saveToDoLocalStorage(todoObj)
}

init();