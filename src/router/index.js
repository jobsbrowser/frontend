import Vue from 'vue'
import Router from 'vue-router'

import Info from '../pages/Info.vue'
import Search from '../pages/Search.vue'
import Stats from '../pages/Stats.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/info',
			name: 'Info',
			component: Info
		},
		{
			path: '/stats',
			name: 'Stats',
			component: Stats
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		}
	]
})
router.replace('/stats')

export default router
