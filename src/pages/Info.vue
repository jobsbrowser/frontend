<template>
	<div>
		<h3 class="display-1 grey--text text--darken-1 text-xs-center ma-5">
			Informacje o serwisie
		</h3>

		<v-divider class="mb-5"></v-divider>

		<clip-loader :loading="!dataLoaded" :size="'120px'" color="#7300B6"></clip-loader>

		<div v-if="dataLoaded">
			<v-layout row wrap class="ma-5">
				<v-flex sm5 class="mb-5 mt-5">
					<h5 class="headline grey--text text--darken-1 text-xs-center mb-4">
						Czym jest JobsBrowser?
					</h5>
					<p class="body-1">
						JobsBrowser jest nadzędziem do automatycznej analizy rynku pracy IT.
						Pozwala na wyszukiwanie ofert po oczekiwanych od kandydata umiejętnościach, oraz przeglądanie
						statystyk dla każdej z występujących w bazie umiejętności.
					</p>
				</v-flex>
				<v-flex sm5 offset-sm2 class="mb-5 mt-5">
					<h5 class="headline grey--text text--darken-1 text-xs-center mb-4">
						Skąd czerpiemy dane?
					</h5>
					<p class="body-1">
						Oferty są pobierane cyklicznie z serwisu <a href="http://pracuj.pl"
																	target="_blank">pracuj.pl</a>.<br>
						Do tej pory przetworzyliśmy <strong>{{ totalOffersCount }}</strong> ogłoszeń,
						a ostatnio pobrane są z dnia <strong>{{ lastCrawlDate }}</strong>.
					</p>
				</v-flex>
			</v-layout>
			<h5 class="headline grey--text text--darken-1 text-xs-center mt-5 mb-4" v-if="totalOffersCount">
				Ilość przetworzonych ofert w czasie
			</h5>

			<line-chart :chart-data="offersCountData" :options="{legend: {display: false}}" :height="100"
						v-if="offersCountData">
			</line-chart>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import LineChart from '../components/LineChart.js'
	import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

	export default {
		data () {
			return {
				dataLoaded: false,
				offersCountData: null,
				totalOffersCount: 0,
				lastCrawlDate: null
			}
		},
		mounted () {
			axios.get('/info/').then((res) => {
				this.offersCountData = {
					labels: res.data.days,
					datasets: [
						{
							label: 'Ilość przetworzonych ofert',
							data: res.data.offers_count,
							backgroundColor: 'rgba(115, 0, 182, 0.15)'
						}
					]
				}
				this.totalOffersCount = res.data.offers_number
				this.lastCrawlDate = res.data.last_crawl_date
				this.dataLoaded = true
			})
		},
		components: {
			'LineChart': LineChart,
			'ClipLoader': ClipLoader
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
