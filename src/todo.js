const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  const todoList = document.querySelector(".todo-list");
  todoElement.textContent = todo;
  todoList.appendChild(todoElement);
};

localStorage.setItem(
  "todos",
  JSON.stringify(["Buy milk", "Feed the dog", "Water the plant"])
);

const todos = getTodos();

todos.forEach((todo) => {
  createTodoElement(todo);
});

