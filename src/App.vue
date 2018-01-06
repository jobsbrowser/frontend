<template>
	<v-app>
		<v-toolbar fixed app :clipped-left="clipped">
			<v-toolbar-title v-text="title"></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click.stop="clipped = !clipped">
				<v-icon>search</v-icon>
			</v-btn>
			<v-btn icon @click.stop="fixed = !fixed">
				<v-icon>timeline</v-icon>
			</v-btn>
			<v-btn icon @click.stop="fixed = !fixed">
				<v-icon>info_outline</v-icon>
			</v-btn>
		</v-toolbar>
		<v-content>
			<v-container fluid>
				<v-slide-y-transition mode="out-in">
					<v-layout column align-center>
						<img src="/public/v.png" alt="Vuetify.js" class="mb-5"/>
						<blockquote>
							&#8220;First, solve the problem. Then, write the code.&#8221;
							<footer>
								<small>
									<em>&mdash;John Johnson</em>
								</small>
							</footer>
						</blockquote>
					</v-layout>
				</v-slide-y-transition>
			</v-container>
		</v-content>
		<v-footer :fixed="fixed" app>
			<span>&copy; 2017</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data () {
			return {
				clipped: false,
				fixed: false,
				items: [
					{icon: 'bubble_chart', title: 'Inspire'}
				],
				miniVariant: false,
				right: true,
				title: 'JobsBrowser'
			}
		}
	}
</script>
