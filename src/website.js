import { renderTodoList, renderTodo, renderProject, renderProjectList } from "./render"
import { todoFactory } from "./todo";
import { projectFactory } from "./projects";

let currProjectId = 0

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")

    //TODO: adding todo to selected project and default project functionality
    //TODO: add remove todo and checkbox todo for is Done

    const defaultProjectKey = 0;
    let defaulProject = JSON.parse(localStorage.getItem(defaultProjectKey))

    if(!defaulProject) {
        defaulProject = projectFactory().createProject("All", [], 0)
        localStorage.setItem(defaultProjectKey, JSON.stringify(defaulProject));
    }
    
    renderProjectList()

    addTask.addEventListener("click", function () {
        addDialog.showModal()
    })
    console.log(JSON.parse(localStorage.getItem(0)))
    let defaultProj = JSON.parse(localStorage.getItem(0))
    renderTodoList(projectFactory().getTodoList(defaulProject))

    const todoContainer = document.querySelector(".main-content")
    todoContainer.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON" && event.target.parentElement.tagName === "DIV"){
            const todoId = event.target.getAttribute('data-id');
            removeTodoHandler(todoId)
        }
    })

    

    const taskSubmit = document.getElementById("add-task-submit")
    taskSubmit.addEventListener("click", function (event) {
        event.preventDefault()
        let title = document.getElementById("title").value
        let desc = document.getElementById("desc").value
        let date = document.getElementById("date").value
        let prio = document.getElementById("priority").value
        let newTodo = todoFactory().createTodo(title, desc, date, prio, false, Math.floor(Math.random()*10000))
        addTodoHandler(newTodo)
    })

    const addProject = document.getElementById("add-project-btn")
    const project = projectFactory();



    addProject.addEventListener("click", function (event) {
        event.preventDefault()
        let projectName = document.getElementById("project-name").value
        let newProj = project.createProject(projectName, [])
        localStorage.setItem(newProj.id, JSON.stringify(newProj))
        renderProjectList()
    })

    const projectListContainer = document.getElementById("project-list")
    projectListContainer.addEventListener("click", function(event) {
        if(event.target.tagName === 'BUTTON' && event.target.parentElement.tagName === "LI"){
            removeProjectHandler(event.target.getAttribute('data-project-id'))
        }

        if(event.target.tagName === 'LI' && event.target.parentElement.tagName === "UL"){
            setCurrProject(event.target.getAttribute('data-project-id'))
            let currProject = JSON.parse(localStorage.getItem(currProjectId))
            console.log(currProject)
            renderTodoList(projectFactory().getTodoList(currProject))
        }
    })
}

const addTodoHandler = (todo) => {
    let key = currProjectId
    let project = JSON.parse(localStorage.getItem(key))
    projectFactory().addTodo(project, todo)
    localStorage.setItem(key, JSON.stringify(project))
    if (key != 0){
        let defaultProject =JSON.parse(localStorage.getItem("0"))
        projectFactory().addTodo(defaultProject, todo)
        localStorage.setItem("0", JSON.stringify(defaultProject))
    }   
    renderTodoList(project.todoList)
}

const removeTodoHandler = (todoId) => {
    let key = currProjectId
    let project = JSON.parse(localStorage.getItem(key))
    projectFactory().setTodoList(project, projectFactory().removeTodo(project, todoId))
    localStorage.setItem(key, JSON.stringify(project))
    if (key != 0){
        let defaultProject = JSON.parse(localStorage.getItem("0"))
        projectFactory().setTodoList(defaultProject, projectFactory().removeTodo(defaultProject, todoId))
        localStorage.setItem("0", JSON.stringify(defaultProject))
    }   
    renderTodoList(project.todoList)
}

const setCurrProject = (projectId) =>{
    currProjectId = projectId
}

const removeProjectHandler = (projectId) => {
    localStorage.removeItem(projectId)
    renderProjectList()
}

export { initWebsite }