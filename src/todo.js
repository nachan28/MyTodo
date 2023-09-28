const todoList = document.querySelector(".todo-list");
const doneList = document.querySelector(".done-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search-input");
const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
let todos = getTodos() || [];

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  
  todoElement.textContent = todo.content;
  todoElement.classList.add("todo-element");
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
  const deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "../images/delete.png");
  deleteButton.classList.add("delete-button");
  buttonContainer.appendChild(deleteButton);

  todoElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("done-button")) {
      todos.forEach((todo) => {
        if (todo.content === todoElement.textContent) {
          todo.isDone = true;
        }
      });
    } else if (e.target.classList.contains("edit-button")) {
      todoInput.value = todoElement.textContent;
      todos = todos.filter((todo) => todo.content !== todoElement.textContent);
      console.log(todos);
    }else if(e.target.classList.contains("delete-button")){
      todos = todos.filter((todo) => todo.content !== todoElement.textContent);
    }
    saveTodos(todos);
    updateTodoList();
  });
};

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

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchInput.addEventListener("keyup", (e) => {
  const searchWord = e.target.value.toLowerCase().trim();
  const elements = document.querySelectorAll(".todo-element");
  elements.forEach((ele) => {
    if (ele.classList.contains("hide")) {
      ele.classList.remove("hide");
    }
  });
  elements.forEach((ele) => {
    if (!ele.textContent.toLowerCase().includes(searchWord)) {
      ele.classList.add("hide");
    }
  });
});

updateTodoList();
