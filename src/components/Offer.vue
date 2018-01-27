<template>
	<v-card class="mb-3">
		<v-card-title primary-title>
			<v-flex xs10>
				<div class="headline" v-html="offer.job_title"></div>
				<span class="grey--text" v-html="offer.employer"></span>
			</v-flex>
            <v-flex xs2 text-md-right>
                <v-chip :key="offer.offer_id" disabled outline
                        :color="chipColor">{{chipText}}</v-chip>
            </v-flex>
		</v-card-title>
		<v-divider></v-divider>
		<v-card-actions>
			<v-btn icon @click.native="show = !show">
				<v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
			</v-btn>
		</v-card-actions>
		<v-slide-y-transition>
			<v-card-text v-show="show">
				<v-layout row wrap>
					<v-flex xs5>
						<div class="subheading text-xs-center mb-3">
							Wymagane umiejętności
						</div>
						<v-chip v-for="tag in offer.tags" :key="tag" outline color="primary">{{ tag }}</v-chip>
					</v-flex>
					<v-flex xs5 offset-xs2>
						<div class="subheading text-xs-center mb-3">
							Informacje
						</div>

						<div class="body-2">Data dodania</div>
						<div class="subheading grey--text">{{ offer.date_posted }}</div>
						<div class="body-2 mt-1">Data wygaśnięcia</div>
						<div class="subheading grey--text">{{ offer.valid_through }}</div>
						<div class="body-2 mt-1">Lokalizacja</div>
						<div class="subheading grey--text">{{ offer.job_location }}</div>
						<div class="body-2 mt-1">Oryginalne ogłoszenie</div>
						<a :href="offer.url" class="subheading grey--text">{{ offer.url }}</a>
					</v-flex>

				</v-layout>
			</v-card-text>
		</v-slide-y-transition>
	</v-card>
</template>

<script>
	export default {
		props: ['offer'],
		data () {
			return {
				show: false
			}
		},
        computed: {
            isValid () {
                const todayDate = new Date().toJSON().slice(0, 10)
                return this.offer.valid_through >= todayDate
            },
            chipColor() {
                return this.isValid ? 'green' : 'red'
            },
            chipText() {
                return this.isValid ? 'Aktywna' : 'Wygasła'
            }
        }
	}
</script>

<style lang="scss">
	.card {
		&__actions {
			justify-content: center;
		}
		&__text {
			padding-top: 0;
		}
	}
</style>
