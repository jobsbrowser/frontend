<template>
	<v-select
		label="Klucze"
		chips
		tags
		solo
		prepend-icon="search"
		append-icon=""
		clearable
		v-model="chips"
	>
		<template slot="selection" slot-scope="data">
			<v-chip
				close
				@input="remove(data.item)"
				:selected="data.selected"
			>
				<strong>{{ data.item }}</strong>&nbsp;
			</v-chip>
		</template>
	</v-select>
</template>

<script>
	export default {
		computed: {
			chips: {
				get: function () {
					return this.$store.state.selectedTags
				},
				set: function (tags) {
					this.$store.commit('updateTags', tags)
				}
			}
		},

		methods: {
			remove (item) {
				this.$store.commit('removeTag', item)
			}
		}
	}
</script>

<style lang="scss">
	.chip {
		background: rgba(74, 50, 182, 0.2) !important;

		&__close {
			color: rgb(74, 50, 182) !important;
		}

		&--selected:after {
			background-color: inherit;
		}
	}
</style>
