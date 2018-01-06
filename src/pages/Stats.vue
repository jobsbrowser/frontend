<template>
	<div>
		<h3 class="display-1 grey--text text--darken-1 text-xs-center ma-5">
			Przeglądaj statystyki
		</h3>
		<tag-input class="mb-5"></tag-input>
		<v-divider></v-divider>
	</div>
</template>

<script>
	import TagInput from '../components/TagInput.vue'

	export default {
		components: {
			'TagInput': TagInput
		}
	}
</script>
