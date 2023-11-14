import { renderTodoList, renderTodo, renderProject } from "./render"
import { todoFactory } from "./todo";
import { projectFactory } from "./projects";

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")
    for (let i = 0; i< localStorage.length; i++){
        let key = localStorage.key(i)
        renderProject(JSON.parse(localStorage.getItem(key)))
    }
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
        let newProj = project.createProject(projectName, Math.floor(Math.random()*10000), [])
        localStorage.setItem(projectName, JSON.stringify(newProj))
        renderProject(newProj)
    })
}

export { initWebsite }