const todoList = document.querySelector(".todo-list");
const doneList = document.querySelector(".done-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

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
    buttonContainer.appendChild(doneButton);
    todoList.appendChild(todoElement);
  }

  todoElement.addEventListener("click", (e) => {
    if(e.target.classList.contains("done-button")){
        const todos = getTodos();
        todos.forEach(todo => {
            if(todo.content === todoElement.textContent){
                todo.isDone = true;
            }
        })
        saveTodos(todos);
        updateTodoList();        
    }
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
  const todos = getTodos();
  if (todoInput.value) {
    todos.push({ content: todoInput.value, isDone: false });
  }
  saveTodos(todos);
  updateTodoList();
  todoInput.value = "";
});

updateTodoList();
