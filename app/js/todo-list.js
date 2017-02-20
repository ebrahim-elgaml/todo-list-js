

(function (global) {
  let {Observer} = global;
  global.TodoList = {
        render(state) {
          list = state.todo_list_list[state.selected_list]
          return `
          <div class="row create-todo">
            <input type="text" class="create-todo__input" placeholder="Enter New To Do" id="item_name">
            <button type="button" class="create-todo__submit-btn secondary-bg-color" onclick="TodoList.addItem(${state.selected_list})">+</button>
          </div>
          <ul class="todo-list col">
            ${list.items.map((item, i)=>(
              `<li class="todo-list__item">
                <div class="todo-item">
                  <input class="todo-item__done" type="checkbox" ${item.done?'checked':''} onclick="TodoList.checkItem(${i}, ${state.selected_list})" >
                  <span class="todo-item__text">${item.text}</span>
                  <button class="todo-item__delete-btn" onclick="TodoList.deleteItem(${i}, ${state.selected_list})">x</button>
                </div>
              </li>`
              )).join("")}
          </ul>`
        },
        addItem(i) {
          if(document.querySelector('#item_name').value.trim() != ""){
            let action = {
              type: 'ADD_TODO_ITEM',
              item: {
                "text": document.querySelector('#item_name').value.trim(),
                "done": false
              },
              list_index: i
            }
            Observer.publish('action', action)
          }
        },
        checkItem(i, list_index) {
          let action = {
            type: 'CHECK_TODO_ITEM',
            item_index: i,
            list_index: list_index
          }
          Observer.publish('action', action)
        },
        deleteItem(i, list_index) {
          let action = {
            type: 'DELETE_TODO_ITEM',
            item_index: i,
            list_index: list_index
          }
          Observer.publish('action', action)
        }
    }
})(window)
