<template>
	<div>

		<!--navbar-->
		<div class="w-full bg-red px-3 py-2">
			<div class="container mx-auto flex items-center justify-between">
				<div class="w-1/3">
					<router-link tag="a" :to="{'name':'home'}">
						<img src="http://acmelogos.com/images/logo-5.svg" alt="logo placeholder"/>
					</router-link>
				</div>
				<div class="w-1/3 text-center">
					Loading Indicator
				</div>
				<div class="w-1/3 text-right">
					<router-link tag="a" :to="{'name':'login'}">
						Login
					</router-link>
				</div>
			</div>
		</div>

		<!--header-->
		<div class="w-full bg-purple">
			<div class="flex items-center justify-center py-24">
				<div class="text-center">
					<h1 class="text-4xl">Sell Hays</h1>
					<p>
						Post and Find Garage Sales in Hays, Kansas
					</p>
				</div>
			</div>
		</div>

		<!--action bar-->
		<div class="container mx-auto flex items-center justify-between bg-blue px-3 py-6 rounded-lg shadow-lg -mt-6 mb-6">
			<div>
				<router-link tag="a" :to="{'name':'create'}">
					Create Free Sale
				</router-link>
			</div>
			<div>
				<img src="https://image.flaticon.com/icons/png/512/17/17764.png" alt="" class="w-6"/>
			</div>
		</div>

		<!--sales-->
		<div class="container mx-auto flex flex-wrap">
			<div class="bg-grey p-4 w-full mb-4 rounded-lg" v-for="sale in sales">
				<router-link :tag="a" :to="{'name':'sale',params:{id:sale.id}}" class="cursor-pointer no-underline text-black">
					<div>
						<span class="text-3xl">{{sale.address}}</span>
					</div>
					<div>
						{{sale.description}}
					</div>
				</router-link>
			</div>
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
			sales:null
		}
	},
	methods:{
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