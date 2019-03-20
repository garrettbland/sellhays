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
		<div class="max-w-xl mx-auto flex flex-wrap font-sans mb-12">
		  <router-link tag="a" v-for="(sale,index) in sales" :key="index" :to="{'name':'sale',params:{id:sale.id}}" class="bg-white shadow hover:shadow-md p-4 w-full mb-4 rounded-lg flex items-center justify-between cursor-pointer sale no-underline">
		    <div class="w-2/3 no-underline text-black">
		      <div class="flex flex-col sm:flex-col md:flex-row text-grey-darker">
		      	<div class="flex items-center">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 icon-calendar mr-1"><path class="calendar-primary" d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z"></path><path class="calendar-secondary" d="M7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z"></path></svg>
					</div>
					<div class="text-sm mr-4">
						{{sale.date_start}}
					</div>
				</div>
				<div class="flex items-center"> 
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 icon-time mr-1"><circle cx="12" cy="12" r="10" class="clock-primary"></circle><path class="clock-secondary" d="M13 11.59l3.2 3.2a1 1 0 0 1-1.4 1.42l-3.5-3.5A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.59z"></path></svg>
					</div>
					<div class="text-sm">
						{{sale.time_start}} - {{sale.time_end}}
					</div>
				</div>
		      </div>
		      <div class="text-2xl sm:text-2xl md:text-3xl font-bold">
		        {{sale.address}}
		      </div>
		      <div class="flex items-center mt-2">
			    <div class="bg-green text-green-darkest px-2 py-1 rounded-full text-xs mr-1">
		 	     {{sale.category_1 | capitalize}}
		 	    </div>
		 	    <div class="bg-green text-green-darkest px-2 py-1 rounded-full text-xs mr-1" v-if="sale.category_2">
		 	     {{sale.category_2 | capitalize}}
		 	    </div>
		 	    <div class="bg-green text-green-darkest px-2 py-1 rounded-full text-xs mr-1" v-if="sale.category_3">
		 	     {{sale.category_3 | capitalize}}
		 	    </div>
			  </div>
		    </div>
		    <div class="w-1/2 sm:w-1/2 md:1/3 flex justify-end">
		      <div class="z-40 -mr-12 hidden sm:hidden md:block ">
		        <img :src="sale.images[2]" v-if="sale.images[2]" class="rounded-full w-24 h-24 p-1 bg-white previewimage shadow" />
		      </div>
		      <div class="z-30 -mr-12 hidden sm:hidden md:block">
		        <img :src="sale.images[1]" v-if="sale.images[1]" class="rounded-full w-24 h-24 p-1 bg-white previewimage shadow" />
		      </div>
		      <div class="z-20">
		        <img :src="sale.images[0]" v-if="sale.images[0]" class="rounded-full w-24 h-24 p-1 bg-white shadow" />
		      </div>
		    </div>
			</router-link>

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
						date_start:doc.data().date_start,
						time_start:doc.data().time_start,
						time_end:doc.data().time_end,
						address:doc.data().address,
						category_1:doc.data().category_1,
						category_2:doc.data().category_2,
						category_3:doc.data().category_3,
						images:doc.data().images
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
	filters: {
	  capitalize: function (value) {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  }
	}
}
</script>