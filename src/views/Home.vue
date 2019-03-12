<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Sell Hays"
			description="Post and Find Garage Sales in Hays, Kansas"
		/>

		<!--action bar-->
		<Actionbar />

		<!--sales-->
		<div class="max-w-xl mx-auto flex flex-wrap">
			<div class="bg-grey p-4 w-full mb-4 rounded-lg" v-for="(sale,index) in sales" :key="index">
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
	name:'Home',
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
		async getSales(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Call firebase function to retreive sales object from firestore 'sales' collection
			const response = await this.$firebase.sales.onSnapshot(querySnapshot => {

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
	},
}
</script>