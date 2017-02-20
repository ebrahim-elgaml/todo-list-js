

(function functionName(global) {
  let {TodoListList, TodoList, window} = global
  window.App = {
      render(state) {
        return `
        <header class="header row primary-bg-color">
          <h1 class="header__title">To Do App</h1>
        </header>
        <div class="row">
          <sidbar class="navigation col f-1">
            ${TodoListList.render(state)}
          </sidbar>
          <main class="col f-3">
            ${state.selected_list >= 0 ? TodoList.render(state) : ""}
          </main>
        </div>
        `
      }
    }
})(window)
