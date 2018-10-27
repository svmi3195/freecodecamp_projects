import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [
      {
        name: "project 1"
      },
      {
        name: "project 2"
      },
      {
        name: "project 3"
      }
    ]
  },
  getters: {
    list: state => state.projects.map(project => project.name)
  }
})