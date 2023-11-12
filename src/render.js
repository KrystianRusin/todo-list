import { todoFactory } from "./todo"

const renderTodoList = (todoList) => {
    const todoF = todoFactory();
    const container = document.querySelector(".main-content")
    todoList.forEach(todo => {
       renderTodo(todo)
    });
}

const renderTodo = (todo) => {
    const todoF = todoFactory();
    const container = document.querySelector(".main-content")

    const todoContainer = document.createElement("div")
    todoContainer.classList.add("todo-container")

    const todoTitle = document.createElement("h3")
    todoTitle.innerHTML = todoF.getTitle(todo)
    todoTitle.classList.add("todo-title")
    todoContainer.appendChild(todoTitle)

    const todoDesc = document.createElement("p")
    todoDesc.innerHTML = todoF.getDesc(todo)
    todoDesc.classList.add("todo-desc")
    todoContainer.appendChild(todoDesc)

    const todoDue = document.createElement("p")
    todoDue.innerHTML = todoF.getDue(todo)
    todoDue.classList.add("todo-due")
    todoContainer.appendChild(todoDue)

    const todoPrio = document.createElement("p")
    todoPrio.innerHTML = todoF.getPrio(todo)
    todoPrio.classList.add("todo-prio")
    todoContainer.appendChild(todoPrio)

    const todoDone = document.createElement("p")
    todoDone.innerHTML = todoF.getIsDone(todo)
    todoDone.classList.add("todo-done")
    todoContainer.appendChild(todoDone)

    container.appendChild(todoContainer)
}



export { renderTodoList, renderTodo }