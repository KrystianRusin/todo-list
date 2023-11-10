const initWebsite = () => {
    const addTask = document.querySelector(".add-task-btn")
    const addDialog = document.querySelector(".input-modal")
    addTask.addEventListener("click", function () {
        addDialog.showModal()
    })
}

export { initWebsite }