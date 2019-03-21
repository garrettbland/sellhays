<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			:title="sale.address"
			description="View details, images, and more"
		/>

		<div class="max-w-xl mx-auto -mt-6 bg-white rounded-lg shadow-md mb-12">
			
			<!--body-->
			<div class="p-4">

				<!--buttons-->
				<div class="flex">
					<button class="bg-grey-light border-2 border-transparent text-grey-darker px-6 py-2 rounded-lg 
					hover:border-grey mr-2">
						Facebook
					</button>
					<button class="bg-grey-light border-2 border-transparent text-grey-darker px-6 py-2 rounded-lg 
					hover:border-grey mr-2">
						Twitter
					</button>
					<button class="bg-grey-light border-2 border-transparent text-grey-darker px-6 py-2 rounded-lg 
					hover:border-grey mr-2">
						Print
					</button>
					<button class="bg-grey-light border-2 border-transparent text-grey-darker px-6 py-2 rounded-lg 
					hover:border-grey">
						Email
					</button>
				</div>

				<!--address-->
				<div class="text-2xl sm:text-2xl md:text-3xl font-bold">
					{{sale.address}}
				</div>

				<!--tags-->
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

				{{sale.date_start}}<br>
				{{sale.time_start}}{{sale.time_end}}
				<div>
					<p v-html="sale.description"></p>
				</div>
			</div>

			<!--map-->
			<div class="bg-yellow-lightest rounded-b-lg">
				<GmapMap
				  :center="{lat:sale.latLng.lat, lng:sale.latLng.lng}"
				  :zoom="15"
				  map-type-id="roadmap"
				  :options="{
				  	gestureHandling:'cooperative'
				  }"
				  class="w-full map-height"
				>
				  <GmapMarker
				    :position="sale.latLng"
				    :clickable="true"
				    :draggable="true"

				    @click="center=m"
				  />
				</GmapMap>
			</div>
		</div>

	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
export default {
	name:'Sale',
	components:{
		Navbar,
		Header,
		Actionbar
	},
	data(){
		return {
			sale:{},
		}
	},
	methods:{
		async getSale(saleId){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Call firebase function to retreive sales object from firestore 'sales' collection with saleId
			const response = await this.$firebase.sales.doc(saleId).get().then(querySnapshot => {

				// Check to see if firestore document with saleId exists
				if(querySnapshot.exists){

					// Document with saleId does exists, set 'this.sale' object with firestore data
					state.sale = querySnapshot.data()

				}else{

					// Document with saleId does not exist or has been deleted. Show user 404 page
					this.$router.push({'name':'notfound'})

				}

			})
		},
	},
	mounted(){

		// Set state so we can use variable within functions
		var state = this

		// Get id of sale from URL
		var saleId = this.$route.params.id

		// Run method once the view is mounted
		this.getSale(saleId).then(function(){

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