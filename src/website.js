import { renderTodoList, renderTodo, renderProject, renderProjectList } from "./render"
import { todoFactory } from "./todo";
import { projectFactory } from "./projects";

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")
    
    renderProjectList()

    const todo = todoFactory();
    const todo1 = todo.createTodo("test", "test", "test", "low", false);
    const todoList = [todo1]

    addTask.addEventListener("click", function () {
        addDialog.showModal()
    })
    renderTodoList(todoList)

    const taskSubmit = document.getElementById("add-task-submit")
    taskSubmit.addEventListener("click", function (event) {
        event.preventDefault()
        let title = document.getElementById("title").value
        let desc = document.getElementById("desc").value
        let date = document.getElementById("date").value
        let prio = document.getElementById("priority").value
        renderTodo(todo.createTodo(title, desc, date, prio, false, Math.floor(Math.random()*10000)))
    })

    const addProject = document.getElementById("add-project-btn")
    const project = projectFactory();
    addProject.addEventListener("click", function (event) {
        event.preventDefault()
        let projectName = document.getElementById("project-name").value
        let newProj = project.createProject(projectName, [])
        localStorage.setItem(projectName, JSON.stringify(newProj))
        renderProject(newProj)
        console.log(newProj)
        setRemoveBtn(newProj.id)
    })

    const projectListContainer = document.getElementById("project-list")
    projectListContainer.addEventListener("click", function(event) {
        if(event.target.tagName === 'BUTTON' && event.target.parentElement.tagName === "LI"){
            removeProjectHandler(event.target.getAttribute('data-project-id'))
        }
    })
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