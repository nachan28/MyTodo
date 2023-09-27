const todoList = document.querySelector(".todo-list");
const doneList = document.querySelector(".done-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  todoElement.textContent = todo.content;
  if (todo.isDone) {
    doneList.appendChild(todoElement);
  } else {
    todoList.appendChild(todoElement);
  }
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoList = () => {
  const todos = getTodos();
  todoList.innerHTML = "";
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
