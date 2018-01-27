<template>
	<div>
		<h3 class="display-1 grey--text text--darken-1 text-xs-center ma-5">
			Przeglądaj statystyki
		</h3>
		<tag-input class="mb-5" theme="green"></tag-input>

		<v-divider></v-divider>

		<clip-loader :loading="loading" :size="'120px'" color="#00BA52"></clip-loader>

		<div v-if="statsData && !loading">
			<h5 class="headline grey--text text--darken-1 text-xs-center mt-5 mb-3">
				Ilość aktywnych ofert w czasie
			</h5>
			<line-chart :chart-data="statsData.absoluteCount" :options="{legend: {display: false}}" :height="100">
			</line-chart>

			<h5 class="headline grey--text text--darken-1 text-xs-center mt-5 mb-3">
				Procentowy udział we wszystkich ofertach
			</h5>
			<line-chart :chart-data="statsData.percentageCount" :options="{legend: {display: false}}" :height="100">
			</line-chart>

			<v-divider class="mt-5 mb-5"></v-divider>

			<h5 class="headline grey--text text--darken-1 text-xs-center mt-5 mb-3">
				Najczęściej zamieszczający ogłoszenia pracodawcy
			</h5>
			<doughnut-chart :chart-data="statsData.employers" :height="100">
			</doughnut-chart>

			<h5 class="headline grey--text text--darken-1 text-xs-center mt-5 mb-3">
				Zbliżone (w modelu Word2Vec) technologie
			</h5>
			<v-layout row>
				<v-flex xs4 offset-xs4 class="text-xs-center">
					<v-chip v-for="tag in statsData.w2vTags" :key="tag" outline color="primary">{{ tag }}</v-chip>
				</v-flex>
			</v-layout>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import debounce from 'debounce'
	import { mapGetters } from 'vuex'
	import LineChart from '../components/LineChart.js'
	import DoughnutChart from '../components/DoughnutChart.js'
	import TagInput from '../components/TagInput.vue'
	import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
	import VDivider from 'vuetify/src/components/VDivider/VDivider'

	export default {
		data () {
			return {
				loading: false,
				statsData: null
			}
		},
		components: {
			VDivider,
			'TagInput': TagInput,
			'ClipLoader': ClipLoader,
			'LineChart': LineChart,
			'DoughnutChart': DoughnutChart
		},
		computed: {
			...mapGetters({selectedTags: 'getSelectedTags'})
		},
		methods: {
			showStats () {
				this.loading = true
				axios.get('/offers/stats/', {
					params: {
						'from': '2017-12-01',
						'tags': this.selectedTags
					},
				}).then(res => {
					this.statsData = {
						absoluteCount: {
							labels: res.data.dates,
							datasets: [
								{
									label: 'Aktywne oferty',
									data: res.data.offer_count,
									backgroundColor: 'rgba(0, 186, 82, 0.15)'
								}
							]
						},
						percentageCount: {
							labels: res.data.dates,
							datasets: [
								{
									label: 'Procentowy udział',
									data: res.data.offer_percentage,
									backgroundColor: 'rgba(0, 186, 82, 0.15)'
								}
							]
						},
						employers: {
							labels: res.data.employers.map(obj => obj.name),
							datasets: [
								{
									label: 'Pracodawcy',
									data: res.data.employers.map(obj => obj.count),
									backgroundColor: [
										'#FF4081', '#2196F3', '#FFC107', '#9C27B0', '#FF5722',
										'#616161', '#009688', '#4CAF50', '#3F51B5', '#795548'
									]
								}
							]
						},
						w2vTags: res.data.most_similar_tags
					}
					this.loading = false
				})
			}
		},
		watch: {
			'selectedTags': debounce(function (tags) {
				if (tags.length) {
					this.showStats()
				} else {
					this.statsData = null
				}
			}, 500)
		},
		mounted () {
			if (this.selectedTags.length) {
				this.showStats()
			}
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
