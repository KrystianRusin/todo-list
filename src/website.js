import { renderTodoList, renderTodo, renderProject } from "./render"
import { todoFactory } from "./todo";
import { projectFactory } from "./projects";

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")
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
        let test1 = todo.createTodo("test", "test", "test", "test", false, Math.floor(Math.random()*10000))
        let test2Id = Math.floor(Math.random()*10000)
        let test2 = todo.createTodo("test2", "test2", "test2", "test2", false, test2Id)
        let newProj = project.createProject(projectName, Math.floor(Math.random()*10000), [test1, test2])
        localStorage.setItem(projectName, JSON.stringify(newProj))
        renderProject(newProj)
        console.log(localStorage.getItem(projectName))
        //Render project on project list
        //implement editing list of todos
        
    })



}

export { initWebsite }