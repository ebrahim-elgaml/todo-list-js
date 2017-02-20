(function functionName(global) {
  let Observer = global.Observer;
  global.TodoListList = {
      // localState: {},
      render(state) {
        return `
        <button onclick="TodoListList.createList()" type="button" class="create-list secondary-bg-color ">Create New List</button>
        <ul class="todo-list-list">
            ${state.todo_list_list.map((list, i)=>{
              return `<li class="todo-list-list__item primary-bg-color ${state.selected_list == i ? "todo-list-list__selected": ""}">
                <div class="todo-list-list__todo-list row">
                  <span class="todo-list-list__title" onclick="TodoListList.selectList(${i})">${list.title}</span>
                  <button class="todo-list-list__delete-btn" onclick="TodoListList.removeList(${i})">x</button>
                </div>
              </li>`
            }).join("")}
        </ul>
        `
      },
      createList() {
        let title = prompt('New list title is?')
        let action = {
          type: 'ADD_TODO_LIST',
          list: {
            title,
            items: []
          }
        }
        Observer.publish('action', action)
      },
      selectList(index) {
        let action = {
          type: 'SELECT_TODO_LIST',
          index: index
        }
        Observer.publish('action', action)
        return false
      },
      removeList(index) {
        let action = {
          type: 'REMOVE_TODO_LIST',
          index: index
        }
        Observer.publish('action', action)
      }
    }
})(window)
