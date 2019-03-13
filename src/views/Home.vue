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
		<div class="max-w-xl mx-auto flex flex-wrap font-sans">
<!-- 			<div class="bg-grey p-4 w-full mb-4 rounded-lg" v-for="(sale,index) in sales" :key="index">
				<router-link tag="a" :to="{'name':'sale',params:{id:sale.id}}" class="cursor-pointer no-underline text-black">
					<div>
						<span class="text-3xl">{{sale.address}}</span>
					</div>
					<div>
						{{sale.description}}
					</div>
				</router-link>
			</div> -->
		  <div class="bg-white shadow hover:shadow-md p-4 w-full mb-4 rounded-lg flex items-center justify-between cursor-pointer sale">
		    <div class="w-1/2 sm:w-1/2 md:w-2/3 no-underline text-black">
		      <div class="flex items-center text-grey-darker">
		      		<div>
		      			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 icon-calendar mr-1"><path class="calendar-primary" d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z"></path><path class="calendar-secondary" d="M7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z"></path></svg>
		      		</div>
		          <div class="text-sm mr-4">
		          	Aug 5, 2019
		          </div> 
		          <div>
		          	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 icon-time mr-1"><circle cx="12" cy="12" r="10" class="clock-primary"></circle><path class="clock-secondary" d="M13 11.59l3.2 3.2a1 1 0 0 1-1.4 1.42l-3.5-3.5A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.59z"></path></svg>
		          </div>
		          <div class="text-sm">
		          	2:00PM - 8:00PM
		          </div>
		      </div>
		      <div class="text-2xl sm:text-2xl md:text-3xl font-bold">
		        2211 Marjorie Drive
		      </div>
		      <div class="flex items-center mt-2">
			    <div class="bg-green text-green-darkest px-2 py-1 rounded-full text-xs mr-1">
		 	     Clothing
		 	    </div>
		  	   	<div class="bg-green text-green-darkest px-2 py-1 rounded-full text-xs mr-1">
		   	     Elelectronics
		 	    </div>
		  	   	<div class="bg-green text-green-darkest px-2 py-1 rounded-full text-xs">
		   	     Furniture
		 	    </div>
			  </div>
		    </div>
		    <div class="w-1/2 sm:w-1/2 md:1/3 flex justify-end">
		      <div class="z-40 test -mr-12">
		        <img src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" class="rounded-full w-24 h-24 p-1 bg-white previewimage" />
		      </div>
		      <div class="z-30 test -mr-12">
		        <img src="https://images.unsplash.com/photo-1494281258937-45f28753affd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" class="rounded-full w-24 h-24 p-1 bg-white previewimage" />
		      </div>
		      <div class="z-20">
		        <img src="https://images.unsplash.com/photo-1519431940854-444d1f06fc16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" class="rounded-full w-24 h-24 p-1 bg-white" />
		      </div>
		    </div>
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