<template>
	<div>
		<h3 class="display-1 grey--text text--darken-1 text-xs-center ma-5">
			Wyszukuj oferty
		</h3>
		<tag-input class="mb-4" theme="pink"></tag-input>
		<v-divider class="mb-4"></v-divider>

        <div class="text-xs-right">
            <v-btn
                @click="downloadOffers()"
                color="purple"
                class="white--text mb-4"
            >
                Pobierz oferty
                <v-icon right dark>get_app</v-icon>
            </v-btn>
        </div>

		<offer v-for="offer in offersList" :key="offer.offer_id" :offer="offer"></offer>

		<clip-loader :loading="loading" :size="'120px'" color="#F80056"></clip-loader>
	</div>
</template>

<script>
	import axios from 'axios'
	import debounce from 'debounce'
	import { mapGetters } from 'vuex'
	import Offer from '../components/Offer.vue'
	import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
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
			'ClipLoader': ClipLoader
		},
		computed: {
			...mapGetters({selectedTags: 'getSelectedTags'})
		},
		methods: {
			loadOffers (append) {
				this.loading = true
				axios.get('/offers/', {
					params: {
						'from': '2017-12-01',
						'tags': this.selectedTags,
						'page': this.pageNumber
					}
				}).then(res => {
					if (append) {
						this.offersList.push(...res.data.results)
					} else {
						this.offersList = res.data.results
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
			},
            downloadOffers () {
                var searchParams = new URLSearchParams()
                searchParams.append('export', true)
                searchParams.append('from', '2017-12-01')
                this.selectedTags.forEach(tag => {
                    searchParams.append('tags', tag)
                })
                window.location.href = axios.defaults.baseURL + '/offers?' + searchParams.toString()
            }
		},
		watch: {
			'selectedTags': debounce(function (tags) {
				console.log(tags)
				this.pageNumber = 1
				if (tags.length) {
					this.loadOffers()
				} else {
					this.offersList = []
				}
			}, 500)
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
</style>
