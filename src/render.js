import { todoFactory } from "./todo"
import { projectFactory } from "./projects"


const renderProject = (proj) => {
    const projectF = projectFactory()
    const projectList = document.getElementById("project-list")
    const pLi = document.createElement("li")
    pLi.classList.add("project-element")
    const projectName = document.createElement("h4")
    projectName.innerHTML = projectF.getName(proj)
    projectName.dataset.projectId = proj.id
    pLi.appendChild(projectName)
    pLi.dataset.projectId = proj.id
    if (proj.id != 0){
        const removeBtn = document.createElement("button")
        removeBtn.classList.add("project-remove-btn")
        removeBtn.innerHTML = "X"
        removeBtn.dataset.projectId = proj.id
        pLi.appendChild(removeBtn)
    }
    
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
    container.innerHTML = ""
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

    const todoDone = document.createElement("INPUT")
    todoDone.setAttribute("type", "checkbox")
    if(todoF.getIsDone(todo)){
        todoDone.checked = true
    }else {
        todoDone.checked = false
    }
    todoDone.classList.add("todo-done")
    todoDone.dataset.id = todoF.getId(todo)
    todoContainer.appendChild(todoDone)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-btn")
    removeBtn.dataset.id = todoF.getId(todo)
    removeBtn.innerHTML = "X"
    todoContainer.appendChild(removeBtn)

    container.appendChild(todoContainer)
}



export { renderTodoList, renderTodo, renderProject, renderProjectList }