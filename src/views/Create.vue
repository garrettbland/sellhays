<template>
	<div>

		<Modal title="Success!" v-if="successfulModal" @close="successfulModal = false" @confirm="goToSale()" actionTitle="View your sale">
	      <div class="px-4 text-lg leading-tight">
	      	Your sale was created successfully. To manage your current sales, go into your account page.
	      </div>
	    </Modal>
		
		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Create New Sale"
			description="Post your garage sale for free"
		/>
		    
		  <form @submit.prevent="validate">
		  <div class="max-w-xl mx-auto bg-white p-4 rounded-lg shadow-lg -mt-6 font-sans">
		    <div class="flex flex-col">

		    <!-- row -->
		    <div class="flex flex-wrap justify-between items-center">
		    	<div class="w-full">
		    		<div class="text-grey-dark uppercase text-sm px-2 py-2">
		    			Address <span v-if="sale.address == ''" class="text-red">Required</span>
		    		</div>
		      		<gmap-autocomplete 
				      	:value="sale.address"
				        placeholder="Sale Address"
				        class="w-full bg-grey-light p-3 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey"
				        @place_changed="setPlace"
				        :select-first-on-enter="true"
				        :options="{
				        	bounds: {north: 38.928954, south: 38.828196, east: -99.237630, west: -99.385881},
	            			strictBounds: true
				        }">
			      	</gmap-autocomplete>
		      	</div>
		    </div>

		    <!-- row -->
		    <div class="flex flex-wrap justify-between items-center mt-8">
		    	<div class="w-full sm:w-full md:w-1/2 md:pr-4 pt-4 sm:pt-4 md:pt-0">
		    		<div class="text-grey-dark uppercase text-sm px-2 py-2">
		    			Date of Sale <span v-if="sale.date_start == ''" class="text-red">Required</span>
		    		</div>
		      		<input v-model="sale.date_start" placeholder="Aug 5, 2019" class="w-full bg-grey-light p-3 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey" />
		      	</div>
		      	<div class="w-full sm:w-full md:w-1/4 md:pr-4 pt-4 sm:pt-4 md:pt-0">
		      		<div class="text-grey-dark uppercase text-sm px-2 py-2">
		    			Start Time <span v-if="sale.time_start == ''" class="text-red">Required</span>
		    		</div>
		      		<input v-model="sale.time_start" placeholder="2:00 PM" class="w-full bg-grey-light p-3 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey" />
		      	</div>
		      	<div class="w-full sm:w-full md:w-1/4 pt-4 sm:pt-4 md:pt-0">
		      		<div class="text-grey-dark uppercase text-sm px-2 py-2">
		    			End Time <span v-if="sale.time_end == ''" class="text-red">Required</span>
		    		</div>
		      		<input v-model="sale.time_end" placeholder="7:00 PM" class="w-full bg-grey-light p-3 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey" />
		      	</div>
		    </div>

		   	<!-- row -->
		    <div class="flex flex-col mt-8">
	    		<div class="text-grey-dark uppercase text-sm p-2">
	    			Categories <span v-if="sale.category_1 == ''" class="text-red">Min (1) category required</span>
	    		</div>
		    	<div class="flex flex-wrap justify-between items-center">
		      		<div class="w-full sm:w-full md:w-1/3 md:pr-4 mb-2 sm:mb-2 md:mb-0 pt-4 sm:pt-4 md:pt-0">
			      		<div class="inline-block relative w-full">
						  <select v-model="sale.category_1" placeholder="Select Category" class="block appearance-none w-full bg-grey-light p-3 pr-8 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey">
						  	<option selected disabled value="">Select Category</option>
						    <option v-for="category in categories.categories"
						        :selected="category == sale.category_1 ? 'selected' : ''"
						        :value="category">
						       {{ category | capitalize }}
						    </option>
						  </select>
						  <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
						    <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						  </div>
						</div>
					</div>
		      		<div class="w-full sm:w-full md:w-1/3 md:pr-4 mb-2 sm:mb-2 md:mb-0 pt-4 sm:pt-4 md:pt-0">
			      		<div class="inline-block relative w-full">
						  <select v-model="sale.category_2" class="block appearance-none w-full bg-grey-light p-3 pr-8 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey" >
						  	<option selected disabled value="">Select Category</option>
						    <option v-for="category in categories.categories"
						        :selected="category == sale.category_2 ? 'selected' : ''"
						        :value="category">
						       {{ category | capitalize }}
						    </option>
						  </select>
						  <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
						    <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						  </div>
						</div>
					</div>
		      		<div class="w-full sm:w-full md:w-1/3 pt-4 sm:pt-4 md:pt-0">
			      		<div class="inline-block relative w-full">
						  <select v-model="sale.category_3" class="block appearance-none w-full bg-grey-light p-3 pr-8 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey">
						  	<option selected disabled value="">Select Category</option>
						    <option v-for="category in categories.categories"
						        :selected="category == sale.category_3 ? 'selected' : ''"
						        :value="category">
						       {{ category | capitalize }}
						    </option>
						  </select>
						  <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
						    <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						  </div>
						</div>
					</div>
				</div>
		    </div>

		    <!-- row -->
		    <div class="flex flex-wrap justify-between items-center mt-8">
	    		<div class="w-full text-grey-dark uppercase text-sm px-2 py-2">
	    			Description <span v-if="sale.description == ''" class="text-red">Required</span>
	    		</div>
		      	<div class="w-full">
		      		<VueTrix v-model="sale.description" placeholder="Description of your sale, popular items, contact info, ect" @trix-file-accept.prevent/>
		      	</div>
		    </div>

		    <!-- row -->
<!-- 		    <div class="flex flex-wrap justify-between items-center mt-8 md:hidden">
	    		<div class="w-full text-grey-dark uppercase text-sm px-2 py-2">
	    			Description <span v-if="sale.description == ''" class="text-red">Required</span>
	    		</div>
		      	<div class="w-full">
		      		<textarea v-model="sale.description" rows="5" placeholder="Description of your sale, popular items, contact info, ect" class="w-full bg-grey-light p-3 text-lg text-black rounded-lg focus:outline-none focus:bg-white border-2 border-transparent hover:border-grey focus:border-grey" ></textarea>
		      	</div>
		    </div> -->



		   	<!-- row -->
		    <div class="flex flex-col mt-8">
		    	<div class="w-full text-grey-dark uppercase text-sm px-2 py-2">
	    			Images (max of 3)
	    		</div>
	    		<div class="flex flex-wrap">
			      <div class="w-full sm:w-full md:w-1/3 px-2 pb-2 sm:pb-2 md:pb-0" v-for="(image,index) in tempImages">
			      	<div class="flex justify-center rounded-lg relative">
			      		<div>
			      			<img :src="getImage(image)" class="z-10 shadow-md rounded-lg bg-white"/>
							<button @click="removeImage(index)" class="absolute pin-t pin-l z-20 hover:opacity-50 focus:outline-none outline-none cursor-pointer">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 icon-close-circle"><circle cx="12" cy="12" r="10" class="trash-primary"></circle><path class="secondary" d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"></path></svg>
							</button>
			      		</div>
			      	</div>
			      </div>
			      <div class="w-full sm:w-full md:w-1/3 px-2" v-if="tempImages.length < 3">
		      		<div class="flex justify-center bg-grey-lightest border-2 border-dashed border-grey rounded-lg hover:border-purple cursor-pointer" @click="chooseImage()">
		      			<div class="py-16 text-grey-darker opacity-75">
		      				Click here to add image
		      				<input type="file" ref="addImage" hidden @change="onFileChange">
		      			</div>
		      		</div>
		      	  </div>
			    </div>
		    </div>
    
		    </div>
		  </div>

		<div class="max-w-xl mx-auto items-center flex flex-wrap sm:flex-wrap md:flex-no-wrap justify-center sm:justify-center md:justify-end font-sans mb-12 p-4 sm:p-4 md:p-0">
			<div class="mt-4 md:mr-4 p-2 bg-red-lighter text-red-darker rounded-lg shadow-lg w-full sm:w-full md:w-auto" v-if="errors.length > 0">
				Form incomplete. Please check all fields and try again
			</div>
			<button type="submit" class="flex justify-center sm:justify-center items-center px-2 h-12 bg-purple border-2 border-transparent hover:bg-purple-dark rounded-lg no-underline focus:outline-none mt-4">
				<span class="px-3 text-white text-xl">Submit</span>

				<svg v-if="!$store.state.loading" width="1.8rem" height="1.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8"><path class="secondary" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"></path></svg>

				<svg v-if="$store.state.loading" width="1.2rem"  height="1.2rem"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-8" preserveAspectRatio="xMidYMid" style="background: none;"><circle cx="50" cy="50" fill="none" stroke-linecap="round" r="40" stroke-width="12" stroke="#ffffff" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(224.113 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>

			</button>
		</div>
		</form>

	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
import Modal from '@/components/Modal'
import VueTrix from 'vue-trix';
import categories from '@/assets/categories.json'
export default {
	name:'Create',
	components:{
		Navbar,
		Header,
		Actionbar,
		Modal,
		VueTrix,
		categories
	},
	data(){
		return {
			categories,
			tag:'',
			tempImages:[],
			sale:{
				address:null,
				latLng:null,
				date_start:null,
				time_start:null,
				time_end:null,
				description:null,
				uid:null,
				images:[],
				category_1:null,
				category_2:null,
				category_3:null,
			},
			successfulModal:false,
			recentlyCreatedSaleId:null,
			errors:[],
		}
	},
	methods:{
		setPlace(place) {
			if (!place) return
			this.sale.latLng = {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			};

			this.sale.address = place.address_components[0].long_name + ' ' + place.address_components[1].long_name + ' ' + place.address_components[2].long_name + ' ' + place.address_components[4].short_name + ' ' + place.address_components[6].long_name

			//window.alert(place.address_components[0].long_name + place.address_components[1].long_name + place.address_components[2].long_name + place.address_components[4].short_name + place.address_components[6].long_name)
		},
		chooseImage(){

			// Find reference id in template and simulate a click
			this.$refs.addImage.click()

		},
		goToSale(){

			// Route user to the newly created sale
			this.$router.push({'name':'sale',params:{id:this.recentlyCreatedSaleId}})

		},
		getImage(image){

			// Creates blob url so we can show user preview of image
			return URL.createObjectURL(image)

		},
		onFileChange(e) {
		
			// Listen for user to select image and add image to array of temp images for upload
			var file = e.target.files[0]
			this.tempImages.push(file)

	    },
	    removeImage(index) {

	    	// Removes image from temp images array
			this.tempImages.splice(index, 1);

	    },
		validate(event){

			// Set state so we can use variable within functions
			var state = this

			// Reset form errors
			state.errors = []

			// Set required fields
			const requiredFields = ['address','date_start','time_start','time_end','category_1','description']

			// Loop through array and set field error if null or empty
			requiredFields.forEach(function(field){
				if(state.sale[field] == null || state.sale[field] == ""){
					state.sale[field] = ""
					state.errors.push(field)
				}
			})

			// If there are no errors, create sale function
			if(state.errors.length == 0){
				this.createSale(event)
			}

		},
		createSale(event){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Starts image upload method. Once complete, then it will save data to firestore
			// We do this so we can upload image -> grab the uploaded public URL -> save to firestore
			state.startImageUpload().then(function(){

				state.putFirestoreItem(event)

			})
		},
		async startImageUpload(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Loop through temp images array and upload to firebase storage
			const images = state.tempImages
			for(const item of images){
				const result = await state.putStorageItem(item)
			}

		},
		putStorageItem(item) {

			// Set state so we can use variable within firebase functions
			var state = this

			// Return a new promise for each image upload
			// After each successful upload, we push the public image URL to the sale object images array
			return new Promise((resolve,reject) => {
				state.$firebase.storage.ref('sales/'+Date.now()).put(item)
				.then((snapshot) => {
					snapshot.ref.getDownloadURL().then(function(downloadURL) {

		              state.sale.images.push(downloadURL)
		              resolve(downloadURL)

		            });
				}).catch((error) => {

					// Something went wrong uploading image
					// TO-DO: Make an alert or popup or something
					console.log('Image upload failed...', item, error.message)

				})
			})
		},
		putFirestoreItem(event){

			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase function to create sale and pass in sale object
			this.$firebase.sales.add(
				state.sale
			)
			.then(docRef => {

				// User uid
				const uid = state.$store.state.currentUser.uid

				// Set recently created sale id for user to view their sale if desired
				state.recentlyCreatedSaleId = docRef.id

				// Reset form
				event.target.reset()

				// Reset sale object
				state.sale = {
					address:null,
					date_start:null,
					time_start:null,
					time_end:null,
					description:null,
					uid:uid,
					images:[],
					category_1:null,
					category_2:null,
					category_3:null,
				}

				// Reset temp images
				state.tempImages = []

				// End loading indicator
				// TO DO: Put some sort of alert or something showing success and link to sale?
				state.$store.commit('setLoading', false)

				// Show user successful modal with link to sale
				//this.selectedSale = sale
				this.successfulModal = true


			})
			.catch(err => {

				// TO-DO: Make an alert or popup or something
				console.log(err)

			})
		}
	},
	mounted(){

		// Set sale user id
		this.sale.uid = this.$store.state.currentUser.uid

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
