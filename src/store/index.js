import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		selectedTags: [],
    allTags: []
	},
	mutations: {
		updateTags (state, tags) {
			state.selectedTags = tags
		},
		removeTag (state, tag) {
			state.selectedTags.splice(state.selectedTags.indexOf(tag), 1)
			// state.selectedTags = [...state.selectedTags]
		}
	},
	getters: {
		getSelectedTags: state => state.selectedTags,
		getAllTags: function(state) {
      if(state.allTags.length > 0)
        return state.allTags
      axios.get('/tags/').then(res => {
        state.allTags = res.data
      })
      return state.allTags
    }
	}
})
