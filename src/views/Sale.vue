<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			:title="sale.address"
			description="View details, images, and more"
		/>

		<div class="max-w-xl mx-auto -mt-6 bg-white rounded-lg shadow-md mb-12 font-sans">
			
			<!--body-->
			<div class="p-4 flex flex-col">

				<!--buttons-->
				<div class="flex flex-wrap">

					<!--button-->
					<div class="w-full sm:w-full md:w-auto flex items-center mb-4 px-6 py-2 mr-2 rounded-lg bg-grey-lighter text-grey-darkest border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg fill="#3B5998" role="img" class="w-6 h-6 mr-2 pt-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook icon</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path></svg>
						</div>
						<div>
							Share
						</div>
					</div>

					<div class="w-full sm:w-full md:w-auto flex items-center mb-4 px-6 py-2 mr-2 rounded-lg bg-grey-lighter text-grey-darkest border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg fill="#1DA1F2" role="img" class="w-6 h-6 mr-2 pt-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
						</div>
						<div>
							Tweet
						</div>
					</div>
					<div class="w-full sm:w-full md:w-auto flex items-center mb-4 px-6 py-2 mr-2 rounded-lg bg-grey-lighter text-grey-darkest border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 mr-2 pt-1"><path class="printer-primary" d="M5 8h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5c0-1.1.9-2 2-2zm1 2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H6z"></path><path class="printer-secondary" d="M6 14h12v6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-6zm0-6V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4H6z"></path></svg>
						</div>
						<div>
							Print
						</div>
					</div>
					<div class="w-full sm:w-full md:w-auto flex items-center mb-4 px-6 py-2 mr-2 rounded-lg bg-grey-lighter text-grey-darkest border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 mr-2 pt-1"><path class="link-secondary" d="M19.48 13.03l-.02-.03a1 1 0 1 1 1.75-.98A6 6 0 0 1 16 21h-4a6 6 0 1 1 0-12h1a1 1 0 0 1 0 2h-1a4 4 0 1 0 0 8h4a4 4 0 0 0 3.48-5.97z"></path><path class="link-primary" d="M4.52 10.97l.02.03a1 1 0 1 1-1.75.98A6 6 0 0 1 8 3h4a6 6 0 1 1 0 12h-1a1 1 0 0 1 0-2h1a4 4 0 1 0 0-8H8a4 4 0 0 0-3.48 5.97z"></path></svg>
						</div>
						<div>
							Copy Link
						</div>
					</div>
					<div class="w-full sm:w-full md:w-auto flex items-center mb-4 px-6 py-2 mr-2 rounded-lg bg-grey-lighter text-grey-darkest border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
class="w-6 h-6 mr-2 pt-1"
viewBox="0 0 48 48"
style=" fill:#000000;"><g id="surface1"><path style=" fill:#1C9957;" d="M 42 39 L 42 9 C 42 7.34375 40.65625 6 39 6 L 9 6 C 7.34375 6 6 7.34375 6 9 L 6 39 C 6 40.65625 7.34375 42 9 42 L 39 42 C 40.65625 42 42 40.65625 42 39 Z "></path><path style=" fill:#3E7BF1;" d="M 9 42 L 39 42 C 40.65625 42 24 26 24 26 C 24 26 7.34375 42 9 42 Z "></path><path style=" fill:#CBCCC9;" d="M 42 39 L 42 9 C 42 7.34375 26 24 26 24 C 26 24 42 40.65625 42 39 Z "></path><path style=" fill:#EFEFEF;" d="M 39 42 C 40.65625 42 42 40.65625 42 39 L 42 38.753906 L 26.246094 23 L 23 26.246094 L 38.753906 42 Z "></path><path style=" fill:#FFD73D;" d="M 42 9 C 42 7.34375 40.65625 6 39 6 L 38.753906 6 L 6 38.753906 L 6 39 C 6 40.65625 7.34375 42 9 42 L 9.246094 42 L 42 9.246094 Z "></path><path style=" fill:#D73F35;" d="M 36 2 C 30.476563 2 26 6.476563 26 12 C 26 18.8125 33.664063 21.296875 35.332031 31.851563 C 35.441406 32.53125 35.449219 33 36 33 C 36.550781 33 36.558594 32.53125 36.667969 31.851563 C 38.335938 21.296875 46 18.8125 46 12 C 46 6.476563 41.523438 2 36 2 Z "></path><path style=" fill:#752622;" d="M 39.5 12 C 39.5 13.933594 37.933594 15.5 36 15.5 C 34.066406 15.5 32.5 13.933594 32.5 12 C 32.5 10.066406 34.066406 8.5 36 8.5 C 37.933594 8.5 39.5 10.066406 39.5 12 Z "></path><path style=" fill:#FFFFFF;" d="M 14.492188 12.53125 L 14.492188 14.632813 L 17.488281 14.632813 C 17.09375 15.90625 16.03125 16.816406 14.492188 16.816406 C 12.660156 16.816406 11.175781 15.332031 11.175781 13.5 C 11.175781 11.664063 12.660156 10.179688 14.492188 10.179688 C 15.316406 10.179688 16.070313 10.484375 16.648438 10.980469 L 18.195313 9.433594 C 17.21875 8.542969 15.921875 8 14.492188 8 C 11.453125 8 8.992188 10.464844 8.992188 13.5 C 8.992188 16.535156 11.453125 19 14.492188 19 C 19.304688 19 20.128906 14.683594 19.675781 12.539063 Z "></path></g></svg>
						</div>
						<div>
							Directions
						</div>
					</div>
				</div>

				<!--address-->
				<div class="text-2xl sm:text-2xl md:text-3xl font-bold mt-4">
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

				<!--Date-->
				<div class="flex items-center mt-6">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 icon-calendar mr-2"><path class="calendar-primary" d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z"></path><path class="calendar-secondary" d="M7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z"></path></svg>
					</div>
					<div class="flex flex-col">
						<div class="text-sm text-grey-dark">
							Date
						</div>
						<div class="text-lg text-purple-darkest font-bold">
							{{sale.date_start | formatDate}}
						</div>
					</div>
				</div>

				<!--Times-->
				<div class="flex items-center my-4">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 icon-time mr-2"><circle cx="12" cy="12" r="10" class="clock-primary"></circle><path class="clock-secondary" d="M13 11.59l3.2 3.2a1 1 0 0 1-1.4 1.42l-3.5-3.5A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.59z"></path></svg>
					</div>
					<div class="flex flex-col">
						<div class="text-sm text-grey-dark">
							Time
						</div>
						<div class="text-lg text-purple-darkest font-bold">
							{{sale.time_start}} - {{sale.time_end}}
						</div>
					</div>
				</div>
				
				<!--Description-->
				<div class="flex mb-6">
					<div class="w-8 mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-2 icon-document-notes"><path class="calendar-primary" d="M6 2h6v6c0 1.1.9 2 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm2 11a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H8zm0 4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8z"></path><polygon class="calendar-secondary" points="14 2 20 8 14 8"></polygon></svg>
					</div>
					<div class="flex flex-col">
						<div class="text-sm text-grey-dark">
							Description
						</div>
						<div class="text-lg text-black">
							<p v-html="sale.description"></p>
						</div>
					</div>
				</div>

				<!--Images-->
				<div class="flex mb-4">
					<div class="w-8 mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 mr-2 icon-photo"><path class="primary" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path class="secondary" d="M15.3 12.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 .3.7v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 .3-.7l4-4a1 1 0 0 1 1.4 0l3.3 3.29 1.3-1.3z"></path></svg>
					</div>
					<div class="flex flex-col">
						<div>
							<div class="text-sm text-grey-dark">
								Images
							</div>
							<div class="italic" v-if="sale.images.length > 0">
								Click to view larger image
							</div>
						</div>
						<div class="flex flex-wrap" v-if="sale.images.length > 0" >
							<div v-for="image in sale.images" class="w-full sm:w-full md:w-1/3 p-2">
								<img :src="image" class="rounded-lg shadow hover:shadow-md cursor-pointer"/>
							</div>
						</div>
						<div class="text-purple-darkest" v-else>
							No images were uploaded. :(
						</div>
					</div>
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
import moment from 'moment'
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
	  },
	  formatDate: function (value) {
	  	if (value) {
			return moment(value.toDate()).format('dddd, MMMM Do YYYY')
		}
	  }
	}
}
</script>