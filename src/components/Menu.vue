<template>
	<v-toolbar fixed app>
		<v-toolbar-title v-text="title"></v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon :to="{path: '/search'}">
			<v-icon>search</v-icon>
		</v-btn>
		<v-btn icon :to="{path: '/stats'}">
			<v-icon>timeline</v-icon>
		</v-btn>
		<v-btn icon :to="{path: '/info'}">
			<v-icon>info_outline</v-icon>
		</v-btn>
	</v-toolbar>
</template>

<script>
	export default {
		data () {
			return {
				title: 'JobsBrowser'
			}
		}
	}
</script>

<style lang="scss">
	.toolbar {
		&__title {
			font-family: 'Lobster', cursive;
			color: #3f51b5;
			letter-spacing: 1px;
			font-size: 2em;
		}
	}
</style>
