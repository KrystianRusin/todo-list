import { todoFactory } from "./todo";

const todo = todoFactory();
console.log(todo.createTodo("test", "test", "test", "low", false));