const toDoItems = document.getElementsByClassName("to-do-items")[0];
const input = document.getElementById("input");
const trashIcon = document.getElementById("trash");

input.addEventListener("keydown", function(event){
    if(event.key === "Enter")
    addItem();
})


function addItem() {

    let divParent = document.createElement("div")
    let divChild = document.createElement("div")
    let checkIcon = document.createElement("i")
    let trashIcon = document.createElement("i")

    divParent.className = "item";
    divParent.innerHTML = "<div>"+input.value+"</div>";

    checkIcon.className = "fas fa-check-square";
    checkIcon.style.color = "lightgray";
    checkIcon.addEventListener("click", function() {
        checkIcon.style.color = "limegreen";
    })

    divChild.appendChild(checkIcon);

    trashIcon.className = "fas fa-trash";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", function() {
        //we get the name of the task that user wants to delete
        const taskName = divParent.innerText.toLowerCase();
        //we get all the tasks that are currently in the local storage and convert it to an object
        const tasksInStore = JSON.parse(localStorage.getItem("tasks"));
        //now deleting the property from the object
        delete tasksInStore[taskName]; 
        //deleting everything from local storage
        localStorage.clear();
        //now adding the modified list of tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasksInStore));
        divParent.remove();

    })

    divChild.appendChild(trashIcon);
    
    divParent.appendChild(divChild);

    toDoItems.appendChild(divParent);

    let store = JSON.parse(localStorage.getItem("tasks"));
    store = { ...store, [input.value]: input.value };
    localStorage.setItem("tasks", JSON.stringify(store));

    input.value = ''


}

