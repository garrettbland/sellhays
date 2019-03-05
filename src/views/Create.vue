<template>
	<div>
		<h1>Create Garage Sale</h1>
		<div>
			<div v-if="loading">Loading...</div>
			<div v-if="!loading">Not loading...</div>
		</div>
		<div>
			<input v-model="sale.date" placeholder="date">
			<input v-model="sale.address" placeholder="address">
			<textarea v-model="sale.description" placeholder="description"></textarea>
		</div>
		<div>
			<button @click="createSale()">
				Create
			</button>
		</div>
	</div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
	name:'Home',
	data(){
		return {
			loading:false,
			sale:{
				date:null,
				address:null,
				description:null,
				images:[],
				tags:[]
			}
		}
	},
	methods:{
		createSale(){

			// Start loading indicator
			// TO DO: Put this into vuex so we can add loading stuff to navigation bar
			this.loading = true

			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase function to create sale and pass in sale object
			fb.sales.add(
				state.sale
			).then(() => {

				// End loading indicator
				// TO DO: Put this into vuex so we can add loading stuff to navigation bar
				state.loading = false

			}).catch(err => {

				// Log the error to console if something went wrong
				console.log(err)

			})
		}
	},
	
}
</script>