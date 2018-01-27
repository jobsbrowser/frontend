<template>
	<v-select
		label="Klucze"
		chips
		solo
        autocomplete
        hide-selected
		clearable
        dense
        multiple
        deleteable-chips
        no-data-text="Brak takiego klucza"
		prepend-icon="search"
		append-icon=""
		v-model="chips"
        v-bind:items="tags"
        v-bind:filter="filterItem"
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
    import {mapGetters} from 'vuex'

	export default {
		computed: {
            ...mapGetters({
                tags: 'getAllTags'
            }),
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
            filterItem(item, queryText, itemText) {
                const hasValue = val => val != null ? val : ''

                const query = hasValue(queryText)
                if(!query) return false;
                const text = hasValue(itemText)

                return text.toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
            },
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
