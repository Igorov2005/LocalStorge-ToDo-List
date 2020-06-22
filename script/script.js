'use strict'

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoRemove = document.querySelector('.todo-remove'),
  todoCompleted = document.querySelector('.todo-completed');


const todoData = [];

if (localStorage.todo !== undefined) {
  for (let item of JSON.parse(localStorage.todo)) {
    todoData.push(item);
  }
};
const updateLocalStorage = () => {
  localStorage.todo = JSON.stringify(todoData);
};

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class = "todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    };
    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      updateLocalStorage();
      render();
    });
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function () {
      todoData.splice(todoData.indexOf(li), 1);
      updateLocalStorage();
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value === '') {
    return;
  };
  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  updateLocalStorage();

  // let inputs = document.querySelectorAll('input[type=text]');
  // for (let i = 0; i < inputs.length; i++) {
  //   inputs[i].value = '';
  // };
  render();
  headerInput.value = '';
});

render();