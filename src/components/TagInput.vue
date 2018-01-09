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
				:color="themes[theme].color"
				:text-color="themes[theme].textColor"
				dark
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
		},
		props: ['theme'],
		data () {
			return {
				themes: {
					pink: {
						color: 'pink',
						textColor: 'white'
					},
					green: {
						color: 'green',
						textColor: 'white'
					}
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
