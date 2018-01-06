import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		selectedTags: []
	},
	mutations: {
		updateTags (state, tags) {
			state.selectedTags = tags
		},
		removeTag (state, tag) {
			state.selectedTags.splice(state.selectedTags.indexOf(tag), 1)
			// state.selectedTags = [...state.selectedTags]
		}
	}
})
