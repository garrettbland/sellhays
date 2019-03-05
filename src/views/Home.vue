<template>
	<div>
		<h1>Sell Hays</h1>
		<div>
			<div v-if="loading">Loading...</div>
			<div v-if="!loading">Not loading...</div>
		</div>
		<p>
			<button @click="creatSale()">
				Create Garage Sale
			</button>
		</p>
		<p>
			<ul v-for="sale in sales">
				<li @click="viewSale(sale.id)">
					<div>
						{{sale.date}}
					</div>
					<div>
						{{sale.address}}
					</div>
					<div>
						{{sale.description}}
					</div>
				</li>
			</ul>
		</p>
	</div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
	name:'Home',
	data(){
		return {
			loading:false,
			sales:null
		}
	},
	methods:{
		creatSale(){

			// Programatically route user to create view
			this.$router.push({'name':'create'})

		},
		viewSale(saleId){
			this.$router.push({'name':'sale',params:{id:saleId}})
		},
		async getSales(){

			// Start loading indicator
			// TO DO: Put this into vuex so we can add loading stuff to navigation bar
			this.loading = true

			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase function to retreive sales object from firestore 'sales' collection
			const response = await fb.sales.onSnapshot(querySnapshot => {

				// Set 'this.sales' array to empty
				state.sales = []

				// Use querySnapshot callback from above to build array of objects for 'this.sales'
				querySnapshot.forEach(doc => {
					state.sales.push({
						id:doc.id,
						address:doc.data().address,
						description:doc.data().description
					})
				})

			})
		},
	},
	mounted(){

		// Set state so we can use variable within functions
		var state = this

		// Run 'getSales' method once the view is mounted
		this.getSales().then(function(){

			// End loading indicator
			// TO DO: Put this into vuex so we can add loading stuff to navigation bar
			state.loading = false

		})
	},
}
</script>