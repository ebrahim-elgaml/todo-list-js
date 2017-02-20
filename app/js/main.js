(function main({App, document, Observer}, two, three) {
  let state = {
    "todo_list_list": [
      {
        "title": "First List",
        "items": [
          {
            "text": "Somthing Js",
            "done": false
          },{
            "text": "Something else",
            "done": true
          }
        ]
      },
      {
        "title": "Second List",
        "items": [
          {
            "text": "item 1",
            "done": false
          },{
            "text": "item 2",
            "done": false
          }
        ]
      }
    ],
    "selected_list": 0
  }
  function renderStateToHTML(state) {
    document.querySelector('#appContainer').innerHTML = App.render(state)
  }
  renderStateToHTML(state)

  Observer.subscribe('action', function HandleAction(action){
    switch(action.type) {
      case 'ADD_TODO_LIST':
        state.todo_list_list.push(action.list)
        if(state.todo_list_list.length == 0)
          state.selected_list = 0
        break;
      case 'SELECT_TODO_LIST':
        state.selected_list = parseInt(action.index)
        break;
      case 'REMOVE_TODO_LIST':
        state.selected_list = state.todo_list_list.length == 1 ? -1 : 0
        state.todo_list_list.splice(action.index, 1)
        break;
      case 'ADD_TODO_ITEM':
        state.todo_list_list[action.list_index].items.push(action.item)
        break;
      case 'CHECK_TODO_ITEM':
        let item = state.todo_list_list[action.list_index].items[action.item_index]
        if(item.done){
          item.done = false
        } else {
          item.done = true
        }
        break
      case 'DELETE_TODO_ITEM':
        state.todo_list_list[action.list_index].items.splice(action.item_index, 1)
        break
    }
    Observer.publish('state.update', state)
  })

  Observer.on('state.update', function(state){
    renderStateToHTML(state);
  })

})(window,2,3)
