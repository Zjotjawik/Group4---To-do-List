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
        const tasksInStore = JSON.parse(localStorage.getItem("tasks"));
        delete tasksInStore[taskId]; 
        localStorage.setItem("tasks", JSON.stringify(tasksInStore));
        divParent.remove();
    })

    divChild.appendChild(checkIcon);

    trashIcon.className = "fas fa-trash";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", function() {
        //we get the name of the task that user wants to delete
        const taskId = divParent.id;
        //we get all the tasks that are currently in the local storage and convert it to an object
        const tasksInStore = JSON.parse(localStorage.getItem("tasks"));
        //now deleting the property from the object
        delete tasksInStore[taskId]; 
        //now adding the modified list of tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasksInStore));
        divParent.remove();
    })

    divChild.appendChild(trashIcon);
    
    divParent.appendChild(divChild);

    toDoItems.appendChild(divParent);
}

function showItems() {
    const itemList = JSON.parse(localStorage.getItem("tasks"));
    const itemKeysList = Object.keys(itemList);
    
    for (let index = 0; index < itemKeysList.length; index++) {
        createBox(itemList[itemKeysList[index]], itemKeysList[index])
    }
}

function addItem() {
    let uniqueId = "todo_"+new Date().valueOf()

    createBox(input.value, uniqueId);

    let store = JSON.parse(localStorage.getItem("tasks"));
    store = { ...store, [uniqueId]: input.value };
    // TODO tasks would become an array and this array would colect objects
    // Each object would be as follows {
        // id: uniqueId
        // content: input.value 
        // status: true
    // }
    localStorage.setItem("tasks", JSON.stringify(store));

    input.value = ''
}

