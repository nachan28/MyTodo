const todoList = document.querySelector(".todo-list");
const doneList = document.querySelector(".done-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");
const getTodos = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};
let todos = getTodos() || [];

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  const buttonContainer = document.createElement("div");
  todoElement.textContent = todo.content;
  todoElement.appendChild(buttonContainer);

  if (todo.isDone) {
    doneList.appendChild(todoElement);
  } else {
    const doneButton = document.createElement("img");
    doneButton.setAttribute("src", "../images/done.png");
    doneButton.classList.add("done-button");
    const editButton = document.createElement("img");
    editButton.setAttribute("src", "../images/edit.png");
    editButton.classList.add("edit-button");
    buttonContainer.appendChild(doneButton);
    buttonContainer.appendChild(editButton);
    todoList.appendChild(todoElement);
  }

  todoElement.addEventListener("click", (e) => {
    if(e.target.classList.contains("done-button")){
        todos.forEach(todo => {
            if(todo.content === todoElement.textContent){
                todo.isDone = true;
            }
        })
    }else if(e.target.classList.contains("edit-button")){
        todoInput.value = todoElement.textContent;
        todos = todos.filter(todo => todo.content !== todoElement.textContent)
        console.log(todos);
    }
    saveTodos(todos);
    updateTodoList();        
})};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoList = () => {
  const todos = getTodos();
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInput.value) {
    todos.push({ content: todoInput.value, isDone: false });
  }
  saveTodos(todos);
  updateTodoList();
  todoInput.value = "";
});

updateTodoList();
