// import lớp đối tượng
import { ToDo } from './todo.js';
import { ToDoList } from './todoList.js';

const getEle = (id) => {
  return document.getElementById(id);
};

let todoList = new ToDoList();
let completeList = new ToDoList();

//Hàm thêm todo
const addToDo = () => {
  let txtToDo = getEle('newTask').value;
  let ulToDo = getEle('todo');

  if (txtToDo != '') {
    let td = new ToDo(txtToDo, 'todo');
    todoList.addToDo(td);
    console.log(todoList.tdList);
  }
  // gọi hàm
  showToDoList(ulToDo);
  getEle('newTask').value = '';
};

getEle('addItem').addEventListener('click', () => {
  addToDo();
});

//Hàm hiển thị todo
// khai báo hàm
const showToDoList = (ulToDo) => {
  ulToDo.innerHTML = todoList.renderTodo();
};
const showCompleteList = (ulCompleted) => {
  ulCompleted.innerHTML = completeList.renderTodo();
};

// Hàm delete todo
const deleteToDo = (e) => {
  let tdIndex = e.currentTarget.getAttribute('data-index');
  let status = e.currentTarget.getAttribute('data-status');
  let ulToDo = getEle('todo');
  let ulCompleted = getEle('completed');
  if (status == 'todo') {
    todoList.removeToDo(tdIndex);
    showToDoList(ulToDo);
  } else if (status == 'completed') {
    completeList.removeToDo(tdIndex);
    showCompleteList(ulCompleted);
  } else {
    alert('Cannot delete todo!');
  }
};

window.deleteToDo = deleteToDo;

// Hàm comlete todo
const completeToDo = (e) => {
  let tdIndex = e.currentTarget.getAttribute('data-index');
  let status = e.currentTarget.getAttribute('data-status');
  let ulToDo = getEle('todo');
  let ulCompleted = getEle('completed');

  if (status == 'todo') {
    // slice là lấy phần từ từ : start <= index < end
    // ví dụ star = 0, end 2, thì lấy 0,1
    let completedItem = todoList.tdList.slice(tdIndex, tdIndex + 1); // chỉ lấy phần tử tại index là 1
    console.log(completedItem);
    // cập nhật lại todo và chuyển nó sang status mới nên tạo thể hiện mới ToDo

    let objToDo = new ToDo(completedItem[0].textTodo, 'completed');
    console.log(objToDo);
    moveToDo(todoList, completeList, objToDo, tdIndex);
    // console.log(todoList.tdList)
    // console.log(completeList.tdList)
    showToDoList(ulToDo);
    showCompleteList(ulCompleted);
  } else if (status == 'completed') {
    // slice là lấy phần từ từ : start <= index < end
    // ví dụ star = 0, end 2, thì lấy 0,1
    let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1); // chỉ lấy phần tử tại index là 1
    //console.log(completedItem)
    // cập nhật lại todo và chuyển nó sang status mới nên tạo thể hiện mới ToDo

    let objToDo = new ToDo(undoItem[0].textTodo, 'todo');
    // console.log(objToDo)
    moveToDo(completeList, todoList, objToDo, tdIndex);
    // console.log(todoList.tdList)
    // console.log(completeList.tdList)
    showToDoList(ulToDo);
    showCompleteList(ulCompleted);
  } else {
    alert('Cannot move todo !');
  }
};

window.completeToDo = completeToDo;

const moveToDo = (depart, arrival, obj, tdIndex) => {
  // Remove todo from depart
  depart.removeToDo(tdIndex);

  // Add todo to arrival
  arrival.addToDo(obj);
};
window.moveToDo = moveToDo;

// tính năng sắp xếp
const sortASC = () => {
  let ulToDo = getEle('todo');
  todoList.sortToDoList(false);
  showToDoList(ulToDo);
};
window.sortASC = sortASC;

const sortDES = () => {
  let ulToDo = getEle('todo');
  todoList.sortToDoList(true);
  showToDoList(ulToDo);
};
window.sortDES = sortDES;
