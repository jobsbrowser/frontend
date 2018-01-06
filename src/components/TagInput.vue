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
		data () {
			return {
				chips: []
			}
		},

		methods: {
			remove (item) {
				this.chips.splice(this.chips.indexOf(item), 1)
				this.chips = [...this.chips]
			}
		}
	}
</script>
