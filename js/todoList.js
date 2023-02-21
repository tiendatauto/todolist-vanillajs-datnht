export class ToDoList {
  constructor() {
    this.tdList = [];
  }
  addToDo(todo) {
    this.tdList.push(todo);
  }
  removeToDo(index) {
    this.tdList.splice(index, 1);
  }
  renderTodo() {
    let content = '';
    // Dùng reduceRight để duyệt mảng từ phải qua trái (bắt đầu từ phần tử cuối mảng) lý do để hiển thị thằng todo mới ở vị trí cuối cùng
    content = this.tdList.reduceRight((tdContent, item, index) => {
      //tdContetn = tdContent(nội dung cũ) + nội dung mới
      tdContent += `
                <li>
                    <span>${item.textTodo}</span>
                    <div class = "buttons">
                    <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(event)">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" data-index="${index}"  data-status="${item.status}" onclick="completeToDo(event)" >
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
                    </div>
                </li>
            `;
      return tdContent;
    }, '');
    return content;
  }

  sortToDoList(isDES) {
    this.tdList.sort((todo, nextToDo) => {
      const textA = todo.textTodo.toLowerCase();
      const textB = nextToDo.textTodo.toLowerCase();
      //ASC
      return textB.localeCompare(textA);
    });
    if (isDES) {
      this.tdList.reverse();
    }
  }
}
