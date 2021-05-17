export const addUser = (state, user) => {
  state.user = (user)
}

export const fillTasks = (state, tasks) => {
  state.tasks = (tasks)
}

export const fillTask = (state, task) => {
  state.task = (task)
}

export const remove = (state, task) => {
  state.task = {}
  state.tasks = state.tasks.filter((taskToFilter) =>{
    return task != taskToFilter;
  });
}

export const clearTask = (state) => {
  state.task = {}
}

export const clearState = (state) => {
  state.user = {}
  state.tasks = {}
  state.task = {}
}