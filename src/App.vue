<template>
	<v-app>
		<site-menu></site-menu>
		<v-content>
			<v-container>
				<v-slide-y-transition mode="out-in">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</v-slide-y-transition>
			</v-container>
		</v-content>
		<v-footer app>
			<span>&copy; 2018</span>
			<span>&nbsp;&nbsp;Bartłomiej Sielicki, Łukasz Skarżyński</span>
		</v-footer>
	</v-app>
</template>

<script>
	import Menu from './components/Menu.vue'
	import TagInput from './components/TagInput.vue'

	export default {
		components: {
			'SiteMenu': Menu,
			'TagInput': TagInput
		}
	}
</script>

<style lang="scss">
	@media only screen and (min-width: 1264px) {
		.container {
			max-width: 1250px;
		}
	}
</style>
