import { todoFactory } from "./todo";
import { initWebsite } from "./website";

const todo = todoFactory();
console.log(todo.createTodo("test", "test", "test", "low", false));

document.addEventListener("DOMContentLoaded", function () {
    initWebsite()
})