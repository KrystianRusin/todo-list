import { todoFactory } from "./todo"

const projectFactory = () => {

    const todoF = todoFactory

    const createProject = (name, todoList, id) => {
        if(id == null){
            id = Math.floor(Math.random()*10000)
        }
        return {name, todoList, id}
    }

    const getName = (proj) => {
        return proj.name
    }

    const getId = (proj) => {
        return proj.projectId
    }

    const getTodoList = (proj) => {
        return proj.todoList
    }

    const setTodoList = (proj, newTodoList) => {
        proj.todoList = newTodoList
    }

    const addTodo = (proj, todo) => {
        proj.todoList.push(todo)
    }

    const removeTodo = (proj, todoId) => {
        return proj.todoList.filter(todo => todo.id != todoId)
    }

    return {
        createProject,
        getName,
        getId,
        getTodoList,
        addTodo,
        removeTodo,
        setTodoList
    }

}

export { projectFactory }