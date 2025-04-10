document.addEventListener("DOMContentLoaded", () => {
  console.log("this is printed first"); // prints first

  const todoInput = document.getElementById("todoInput");
  const addTodoButton = document.getElementById("addTodo");
  const todoList = document.getElementById("taskList");
  let tasks = [];

  const handleAddTodo = (e) => {
    if (todoInput?.value) {
      const inputValue = todoInput.value.trim();
      const task = { id: Date.now(), taskName: inputValue, completed: false };
      tasks.push(task);
      renderTaskList();
      todoInput.value = ""; // Clear the input field
    } else {
      alert("Please enter a todo");
    }
  };

  const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTaskList();
  };

  const toggleTask = (id) => {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTaskList();
  };

  function renderTaskList() {
    todoList.innerHTML = ""; // Clear the list before rendering
    tasks.forEach((task) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = task.taskName;
      span.style.textDecoration = task.completed ? "line-through" : "none";
      span.style.color = task.completed ? "gray" : "black";
      // span.className = task.completed ? "completed" : "";
      span.style.cursor = "pointer";
      span.onclick = () => toggleTask(task.id);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete ❌";
      deleteButton.onclick = () => deleteTask(task.id);
      li.appendChild(span);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  }

  // Attach the event listener to the button
  addTodoButton.addEventListener("click", handleAddTodo);
});
