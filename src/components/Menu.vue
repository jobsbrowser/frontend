<template>
	<v-toolbar fixed app :clipped-left="clipped">
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
