<template>
	<div>
		<h3 class="display-1 grey--text text--darken-1 text-xs-center ma-5">
			Wyszukuj oferty
		</h3>
		<tag-input class="mb-5"></tag-input>
		<v-divider class="mb-5"></v-divider>

		<offer v-for="offer in offersList" :key="offer.offer_id" :offer="offer"></offer>

		<ring-loader :loading="loading" :size="'120px'" :color="'#F1646A'"></ring-loader>
	</div>
</template>

<script>
	import axios from 'axios'
	import { mapGetters } from 'vuex'
	import Offer from '../components/Offer.vue'
	import RingLoader from 'vue-spinner/src/RingLoader.vue'
	import TagInput from '../components/TagInput.vue'
	import VDivider from 'vuetify/src/components/VDivider/VDivider'

	export default {
		data () {
			return {
				loading: false,
				offersList: [],
				pageNumber: 1,
				hasMore: undefined
			}
		},
		components: {
			VDivider,
			'Offer': Offer,
			'TagInput': TagInput,
			'RingLoader': RingLoader
		},
		computed: {
			...mapGetters({selectedTags: 'getSelectedTags'})
		},
		methods: {
			loadOffers (append) {
				this.loading = true
				axios.get('/offers', {
					params: {
						'from': '2017-12-01',
						'tags': this.selectedTags.join(),
						'page_number': this.pageNumber
					}
				}).then(res => {
					if (append) {
						this.offersList.push(...res.data.offers)
					} else {
						this.offersList = res.data.offers
					}
					this.loading = false
					this.hasMore = res.data.has_more
					this.pageNumber += 1
				})
			},
			checkScroll () {
				const scrollOffset = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
				const triggerPercentage = 0.15
				if (this.hasMore && (scrollOffset / window.innerHeight) < triggerPercentage && !this.loading) {
					this.loadOffers(true)
				}
			}
		},
		watch: {
			'selectedTags': function (tags) {
				if (tags.length) {
					this.loadOffers()
				} else {
					this.offersList = []
					this.pageNumber = 1
				}
			}
		},
		created () {
			window.addEventListener('scroll', this.checkScroll)
		},
		destroyed () {
			window.removeEventListener('scroll', this.checkScroll)
		}
	}
</script>

<style lang="scss">
	@media only screen and (min-width: 1264px) {
		.v-spinner {
			margin-top: 150px;
		}
	}

	.v-ring {
		margin: 0 auto;
	}

	.chip {
		background: rgba(241, 100, 106, 0.15) !important;

		&__close {
			color: rgb(241, 100, 106) !important;
		}

		&--selected:after {
			background-color: inherit;
		}
	}
</style>
