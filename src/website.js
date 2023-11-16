import { renderTodoList, renderTodo, renderProject, renderProjectList } from "./render"
import { todoFactory } from "./todo";
import { projectFactory } from "./projects";

let currProjectId = 0

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")

    //TODO: Add project selection function
    //TODO: Add default project
    //TODO: adding todo to selected project and default project functionality
    
    renderProjectList()

    const todo = todoFactory();
    const todo1 = todo.createTodo("test", "test", "test", "low", false);
    const todoList = [todo1]

    addTask.addEventListener("click", function () {
        addDialog.showModal()
    })
    renderTodoList(todoList)

    const todoContainer = document.querySelector(".main-content")
    todoContainer.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON" && event.target.parentElement.tagName === "DIV"){
            const todoId = event.target.getAttribute('data-id');
            console.log("removed")
        }
    })

    const taskSubmit = document.getElementById("add-task-submit")
    taskSubmit.addEventListener("click", function (event) {
        event.preventDefault()
        let title = document.getElementById("title").value
        let desc = document.getElementById("desc").value
        let date = document.getElementById("date").value
        let prio = document.getElementById("priority").value
        let newTodo = todo.createTodo(title, desc, date, prio, false, Math.floor(Math.random()*10000))
        addTodo(newTodo)
    })

    const addProject = document.getElementById("add-project-btn")
    const project = projectFactory();
    addProject.addEventListener("click", function (event) {
        event.preventDefault()
        let projectName = document.getElementById("project-name").value
        let newProj = project.createProject(projectName, [])
        localStorage.setItem(projectName, JSON.stringify(newProj))
        renderProjectList()
    })

    const projectListContainer = document.getElementById("project-list")
    projectListContainer.addEventListener("click", function(event) {
        if(event.target.tagName === 'BUTTON' && event.target.parentElement.tagName === "LI"){
            removeProjectHandler(event.target.getAttribute('data-project-id'))
        }

        if(event.target.tagName === 'LI' && event.target.parentElement.tagName === "UL"){
            setCurrProject(event.target.getAttribute('data-project-id'))
            renderTodoList(JSON.parse(localStorage.getItem(localStorage.key(findIndexByProjectId(currProjectId)))).todoList)
        }
    })
}

const addTodo = (todo) => {
    let index = findIndexByProjectId(currProjectId)
    let key = localStorage.key(index)
    let project = JSON.parse(localStorage.getItem(key))
    projectFactory().addTodo(project, todo)
    localStorage.setItem(key, JSON.stringify(project))
    console.log(localStorage.getItem(key))
}

const setCurrProject = (projectId) =>{
    currProjectId = projectId
}

const removeProjectHandler = (projectId) => {
    let index = findIndexByProjectId(projectId)
    localStorage.removeItem(localStorage.key(index))
    renderProjectList()
}

const findIndexByProjectId = (projectId) => {
    const projectF = projectFactory()
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let storedProject = JSON.parse(localStorage.getItem(key));
        if (storedProject.id == projectId) {
            return i;
        }
    }
    return -1;
}

export { initWebsite }