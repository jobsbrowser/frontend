<template>
	<div>
		<h3 class="display-1 grey--text text--darken-1 text-xs-center ma-5">
			Wyszukuj oferty
		</h3>
		<tag-input class="mb-5"></tag-input>
		<v-divider></v-divider>
	</div>
</template>

<script>
	import TagInput from '../components/TagInput.vue'
	import VDivider from 'vuetify/src/components/VDivider/VDivider'

	export default {
		components: {
			VDivider,
			'TagInput': TagInput
		}
	}
</script>
