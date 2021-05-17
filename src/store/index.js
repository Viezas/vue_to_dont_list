import { createStore } from 'vuex'
import state from './state.js'
import * as getters from './getters.js'
import * as actions from './actions.js'
import * as mutations from './mutations.js'

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
