import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import router from './router'
import store from './store'

import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://138.68.66.216:8000'
axios.defaults.paramsSerializer = function (params) {
	return qs.stringify(params, {indices: false})
}

Vue.use(Vuetify)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
