const todoFactory = () => {
    const createTodo = (title, desc, due, prio, isDone, id) => {
        id = Math.floor(Math.random()*10000)
        return { title, desc, due, prio, isDone, id};
    };

    const getTitle = (t) => {
        return t.title
    }


    const getDesc = (t) => {
        return t.desc
    }

    const getDue = (t) => {
        return t.due
    }

    const getPrio = (t) => {
        return t.prio
    }

    const setPrio = (t, priority) => {
        t.prio = priority
    }

    const getIsDone = (t) =>{
        return t.isDone
    }

    const setIsDone = (t) => {
        if(t.isDone){
            t.isDone = false
        } else {
            t.isDone = true
        }

    }

    const getId = (t) => {
        return t.id
    }

    return {
        createTodo,
        getTitle,
        getDesc,
        getDue,
        getPrio,
        setPrio,
        getIsDone,
        setIsDone,
        getId
    };
};

export { todoFactory };
