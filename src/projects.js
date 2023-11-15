import { todoFactory } from "./todo"

const projectFactory = () => {

    const todoF = todoFactory

    const createProject = (name, todoList, id) => {
        id = Math.floor(Math.random()*10000)
        return {name, id, todoList}
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

    const addTodo = (proj, todo) => {
        proj.todoList.push(todo)
    }

    const removeTodo = (proj, todoId) => {
        let temp = proj.todoList.filter(todo => todo.id !== todoId)
        proj.todoList = temp
        console.log(proj.todoList)
    }

    return {
        createProject,
        getName,
        getId,
        getTodoList,
        addTodo,
        removeTodo
    }

}

export { projectFactory }