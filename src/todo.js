const todoFactory = () => {
    const createTodo = (title, desc, due, prio, isDone) => {
        return { title, desc, due, prio, isDone };
    };

    return {
        createTodo,
    };
};

export { todoFactory };
