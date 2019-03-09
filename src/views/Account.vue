<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Account"
			description="Manage your listings"
		/>

		<!--action bar-->
		<Actionbar />

		<!--sales-->
		<div class="container mx-auto flex flex-wrap">
			<div class="bg-grey p-4 w-full mb-4 rounded-lg" v-for="sale in sales">
				<router-link tag="a" :to="{'name':'sale',params:{id:sale.id}}" class="cursor-pointer no-underline text-black">
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
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
export default {
	name:'Login',
	components:{
		Navbar,
		Header,
		Actionbar
	},
	data(){
		return {
			sales:null
		}
	},
	methods:{
		viewSale(saleId){

			// Send user to sale detail view with params
			this.$router.push({'name':'sale',params:{id:saleId}})

		},
		async getSales(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Grab currentUser uid
			const uid = state.$store.state.currentUser.uid

			// Call firebase function to retreive sales object from firestore 'sales' collection where uid is current user uid
			const response = await this.$firebase.sales.where('uid','==',uid).onSnapshot(querySnapshot => {

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
			state.$store.commit('setLoading', false)

		})
	}
}
</script>