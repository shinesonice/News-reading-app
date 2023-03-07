"use strict";

let todoArr = JSON.parse(localStorage.getItem(keyTodo));
if (!todoArr) todoArr = [];

const userName = JSON.parse(getFromStorage(currentUser)).userName;
const todoListUl = document.getElementById("todo-list");
const addBtn = document.getElementById("btn-add");
const taskInput = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");

// render ra màn hình list công việc
function renderTasks(arr) {
  let tasks = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].owner === userName)
      tasks += `<li class='li${
        arr[i].isDone ? " checked" : ""
      }' data-index="${i}">${arr[i].task}<span class="close">×</span></li>`;
  }
  todoListUl.innerHTML = tasks;
}
renderTasks(todoArr);

addBtn.addEventListener("click", function () {
  const todo = new Task(taskInput.value, userName, false);
  todoArr.push(todo);
  saveToStorage(keyTodo, JSON.stringify(todoArr));
  console.log(todoArr);

  renderTasks(todoArr);
});

//xử lý các event click như xóa, chuyển đổi trạng thái đã làm...
todoList.addEventListener("click", function (e) {
  // nếu nhấn vào li để chuyển đổi trạng thái
  if (e.target.classList.contains("li")) {
    // add class checked cho nó
    e.target.classList.toggle("checked");

    // lưu lại trạng thái đã làm
    todoArr[Number(e.target.dataset.index)].isDone =
      e.target.classList.contains("checked");

    saveToStorage(keyTodo, JSON.stringify(todoArr));
  } else {
    // trường hợp click vào span x => xóa
    todoArr.splice(Number(e.target.dataset.index), 1);
    saveToStorage(keyTodo, JSON.stringify(todoArr));

    renderTasks(todoArr);
  }
});
