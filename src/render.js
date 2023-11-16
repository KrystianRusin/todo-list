import { todoFactory } from "./todo"
import { projectFactory } from "./projects"


const renderProject = (proj) => {
    const projectF = projectFactory()
    const projectList = document.getElementById("project-list")
    const pLi = document.createElement("li")
    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-btn")
    removeBtn.innerHTML = "X"
    removeBtn.dataset.projectId = proj.id
    pLi.innerHTML = projectF.getName(proj)
    pLi.dataset.projectId = proj.id
    pLi.appendChild(removeBtn)
    projectList.append(pLi)
    renderTodoList(proj.todoList)
}

const renderProjectList = () => {
    const projectList = document.getElementById("project-list")
    projectList.innerHTML = ""
    for (let i = 0; i< localStorage.length; i++){
        let key = localStorage.key(i)
        renderProject(JSON.parse(localStorage.getItem(key)))
    }
}


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

    const removeBtn = document.createElement("button")
    removeBtn.dataset.id = todoF.getId(todo)
    removeBtn.innerHTML = "X"
    todoContainer.appendChild(removeBtn)

    container.appendChild(todoContainer)
}



export { renderTodoList, renderTodo, renderProject, renderProjectList }