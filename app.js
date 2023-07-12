const toDoItems = document.getElementsByClassName("to-do-items")[0];
const input = document.getElementById("input");
const trashIcon = document.getElementById("trash");

input.addEventListener("keydown", function(event){
    if(event.key === "Enter")
    addItem();
})

window.onload = () => {
    showItems();
};

function createBox(taskValue, uniqueId) {

    let divParent = document.createElement("div")
    let divChild = document.createElement("div")
    let checkIcon = document.createElement("i")
    let trashIcon = document.createElement("i")
    let editIcon = document.createElement("i")

    divParent.className = "item";
    divParent.id = uniqueId;
    divParent.innerHTML = "<div>"+taskValue+"</div>";

    checkIcon.className = "fas fa-check-square";
    checkIcon.style.color = "lightgray";
    checkIcon.addEventListener("click", function() {
        checkIcon.style.color = "limegreen";
        divParent.style = "text-decoration: line-through";
    })

    
    editIcon.className = "fa-regular fa-pen-to-square"
    editIcon.style.color = "darkgray";
    divChild.appendChild(editIcon);
    editIcon.addEventListener("click", function() {
        input.value = divParent.innerText;
        const taskId = divParent.id;
        let tasksInStore = JSON.parse(localStorage.getItem("tasks"));
        tasksInStore = tasksInStore.filter(element => element.id != taskId);
        localStorage.setItem("tasks", JSON.stringify(tasksInStore));
        divParent.remove();
    })

    divChild.appendChild(checkIcon);

    trashIcon.className = "fas fa-trash";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", function() {
        const taskId = divParent.id;
        let tasksInStore = JSON.parse(localStorage.getItem("tasks"));
        tasksInStore = tasksInStore.filter(element => element.id != taskId);
        localStorage.setItem("tasks", JSON.stringify(tasksInStore));
        divParent.remove();
    })

    divChild.appendChild(trashIcon);
    
    divParent.appendChild(divChild);

    toDoItems.appendChild(divParent);
}

function showItems() {
    const itemList = JSON.parse(localStorage.getItem("tasks"));

    for (let index = 0; index < itemList.length; index++) {
        createBox(itemList[index].content, itemList[index].id, itemList[index].status)
    }
}

function addItem() {
    let uniqueId = "todo_"+new Date().valueOf()

    createBox(input.value, uniqueId);

    let store = JSON.parse(localStorage.getItem("tasks"));
    console.log(store);
    if(store == null){
        store = []
    }
    store = [
        ...store,
        {
            id: uniqueId,
            content: input.value, 
            status: true
        }
    ]
    localStorage.setItem("tasks", JSON.stringify(store));

    input.value = ''
}

