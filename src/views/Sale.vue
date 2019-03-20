<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			:title="sale.address"
			description="View details, images, and more"
		/>

		<div class="max-w-xl mx-auto -mt-6 bg-white rounded-lg shadow-md">
			
			<!--images-->
			<div class="h-64 rounded-t-lg flex overflow-x-scroll">
				<img v-for="image in sale.images" class="h-64 w-auto" :src="image"/>
			</div>

			<!--body-->
			<div class="p-4">
				<div class="flex items-center mt-2">
					<div class="bg-green text-green-darkest px-3 py-1 rounded-full text-md mr-1">
						{{sale.category_1 | capitalize}}
					</div>
					<div class="bg-green text-green-darkest px-3 py-1 rounded-full text-md mr-1" v-if="sale.category_2">
						{{sale.category_2 | capitalize}}
					</div>
					<div class="bg-green text-green-darkest px-3 py-1 rounded-full text-md mr-1" v-if="sale.category_3">
						{{sale.category_3 | capitalize}}
					</div>
				</div>
				<div class="text-3xl">
					{{sale.address}}
				</div>
				{{sale.date_start}}<br>
				{{sale.time_start}}{{sale.time_end}}
				<div>
					<p v-html="sale.description"></p>
				</div>
			</div>

			<!--map-->
			<div class="h-64 bg-blue rounded-b-lg">
				<GmapMap
				  :center="{lat:sale.latLng.lat, lng:sale.latLng.lng}"
				  :zoom="15"
				  map-type-id="roadmap"
				  style="width: 500px; height: 300px"
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