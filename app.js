// Selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event){
    // Prevent site from refreshing
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // Create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to local storage
      saveLocalTodos(todoInput.value);

    // Check button
    const compeletedButton = document.createElement('button');
    compeletedButton.innerHTML = "<i class='fas fa-check'></i>";
    compeletedButton.classList.add("complete-btn");
    todoDiv.appendChild(compeletedButton);

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append Todo list 
    todoList.appendChild(todoDiv);

    // Clear Todo Input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // Delete Todo
    if(item.classList[0]==='trash-btn'){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check Mark 
    if(item.classList[0]=== 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";    
                } else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // check if its already there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [ ];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    // check if its already there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [ ];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // Create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check button
    const compeletedButton = document.createElement('button');
    compeletedButton.innerHTML = "<i class='fas fa-check'></i>";
    compeletedButton.classList.add("complete-btn");
    todoDiv.appendChild(compeletedButton);

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append Todo list 
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    // check if its already there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [ ];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}