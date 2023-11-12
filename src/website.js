import { renderTodo } from "./render"
import { todoFactory } from "./todo";

const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")
    const todo = todoFactory();
    const todo1 = todo.createTodo("test", "test", "test", "low", false);
    const todoList = [todo1]

    addTask.addEventListener("click", function () {
        addDialog.showModal()
    })
    renderTodo(todoList)



}

export { initWebsite }