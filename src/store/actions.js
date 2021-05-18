import store from '@/store'

export const addUser = ( {commit}, user ) => {
  commit('addUser', user)
}

export const fillTasks = ({commit}) => {
  let init = {
    method : 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + store.getters.user.token,
      'Content-Type': 'application/json'
    },
  }
  fetch("https://to-dont-api.herokuapp.com/api/tasks", init)
  .then(response => response.json())
  .then(data => {
    commit('fillTasks', data)
  })
  .catch(error => {console.log('error : ', error)})
}

export const fillTask = ( {commit}, task ) => {
  commit('fillTask', task)
}

export const remove = ({commit}, task) => {
  commit('remove', task)
}

export const clearTask = ({commit}) => {
  commit('clearTask')
} 

export const clearState = ({commit}) => {
  commit('clearState')
}