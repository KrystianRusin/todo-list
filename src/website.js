import { renderTodoList, renderTodo, renderProject, renderProjectList } from "./render"
import { todoFactory } from "./todo";
import { projectFactory } from "./projects";

let currProjectId = 0

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")

    const defaultProjectKey = 0;
    let defaultProject = JSON.parse(localStorage.getItem(defaultProjectKey))

    if(!defaultProject) {
        defaultProject = projectFactory().createProject("All", [], 0)
        localStorage.setItem(defaultProjectKey, JSON.stringify(defaultProject));
    }
    
    renderProjectList()

    addTask.addEventListener("click", function () {
        addDialog.showModal()
    })
    let defaultProj = JSON.parse(localStorage.getItem(0))
    renderTodoList(projectFactory().getTodoList(defaultProject))

    const todoContainer = document.querySelector(".main-content")
    todoContainer.addEventListener("click", function(event) {
        const todoId = event.target.getAttribute('data-id');
        if (event.target.tagName === "BUTTON" && event.target.parentElement.tagName === "DIV"){
            removeTodoHandler(todoId)
        }
        if (event.target.tagName === "INPUT" && event.target.parentElement.tagName === "DIV"){
            setDoneHandler(todoId)
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


    const showFormBtn = document.querySelector(".show-form-btn")
    const addProjectForm = document.getElementById("add-project-form")

    addProject.addEventListener("click", function (event) {
        event.preventDefault()
        let projectName = document.getElementById("project-name").value
        let newProj = project.createProject(projectName, [])
        localStorage.setItem(newProj.id, JSON.stringify(newProj))
        renderProjectList()
        showFormBtn.style.display = 'block'
        addProjectForm.style.display = 'none'
    })

    const projectListContainer = document.getElementById("project-list")
    projectListContainer.addEventListener("click", function(event) {
        if(event.target.tagName === 'BUTTON' && event.target.parentElement.tagName === "LI"){
            removeProjectHandler(event.target.getAttribute('data-project-id'))
        }

        if(event.target.tagName === 'LI' && event.target.parentElement.tagName === "UL"){
            setCurrProject(event.target.getAttribute('data-project-id'))
            let currProject = JSON.parse(localStorage.getItem(currProjectId))
            renderTodoList(projectFactory().getTodoList(currProject))
        }
    })

    
    showFormBtn.addEventListener("click", function (){
        showFormBtn.style.display = (showFormBtn.style.display === 'none') ? 'block' : 'none'
        if (addProjectForm.style.display === '' || addProjectForm.style.display === 'none'){
            addProjectForm.style.display = 'block';
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

const setDoneHandler = (todoId) => {

    let key = currProjectId;
    let project = JSON.parse(localStorage.getItem(key));
    let currTodoList = project.todoList
    let todoIndex = findTodoById(todoId, currTodoList);
    todoFactory().setIsDone(currTodoList[todoIndex]);
    projectFactory().setTodoList(project, currTodoList);
    localStorage.setItem(key, JSON.stringify(project));
    renderTodoList(currTodoList);
    console.log(currTodoList)
}   

const findTodoById = (todoId, currTodoList) => {
    console.log(todoId)
    for(let i =0; i<currTodoList.length; i++){
        if (currTodoList[i].id == todoId){
            return i
        }
    }
}

const setCurrProject = (projectId) =>{
    currProjectId = projectId
}

const removeProjectHandler = (projectId) => {
    localStorage.removeItem(projectId)
    renderProjectList()
}

export { initWebsite }