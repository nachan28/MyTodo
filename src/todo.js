const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  const todoList = document.querySelector(".todo-list");
  const doneList = document.querySelector(".done-list");
  todoElement.textContent = todo.content;
  if (todo.isDone) {
    doneList.appendChild(todoElement);
  } else {
    todoList.appendChild(todoElement);
  }
};

localStorage.setItem(
  "todos",
  JSON.stringify([
    { content: "Buy milk", isDone: false },
    { content: "Feed the dog", isDone: true },
    { content: "Water the plant", isDone: false },
  ])
);

const todos = getTodos();

todos.forEach((todo) => {
  createTodoElement(todo);
});
