<template>
	<div>

		<Modal title="Success!" v-if="successfulModal" @close="successfulModal = false" @confirm="goToSale()" actionTitle="View your sale">
	      <div class="p-4">
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
		    
		    
		  <div class="max-w-xl mx-auto bg-white p-4 rounded-lg shadow-lg -mt-6 font-sans">
		    <div class="flex flex-col">

		    <!-- row -->
		    <div class="flex justify-between items-center">
		    	<div class="w-3/5 pr-4">
		    		<div>
		    			Address
		    		</div>
		      		<input v-model="sale.address" placeholder="Street Address" class="w-full bg-grey-light p-3 text-2xl text-black rounded-lg focus:outline-none border-2 border-transparent hover:border-grey focus:border-grey"/>
		      	</div>
		      	<div class="w-2/5">
		      		<div>
		    			City
		    		</div>
		      		<div class="flex bg-grey-lighter p-3 text-2xl text-grey-darker opacity-75 rounded-lg focus:outline-none border-2 border-transparent">
			        	Hays, Kansas 67601
			     	</div>
		      	</div>
		    </div>

		    <!-- row -->
		    <div class="flex justify-between items-center mt-8">
		    	<div class="w-1/2 pr-4">
		    		<div>
		    			Date of Sale
		    		</div>
		      		<input v-model="sale.date.start" placeholder="Aug 5, 2019" class="w-full bg-grey-light p-3 text-2xl text-black rounded-lg focus:outline-none border-2 border-transparent hover:border-grey focus:border-grey"/>
		      	</div>
		      	<div class="w-1/4 pr-4">
		      		<div>
		    			Start Time
		    		</div>
		      		<input v-model="sale.time.start" placeholder="2:00 PM" class="w-full bg-grey-light p-3 text-2xl text-black rounded-lg focus:outline-none border-2 border-transparent hover:border-grey focus:border-grey"/>
		      	</div>
		      	<div class="w-1/4">
		      		<div>
		    			End Time
		    		</div>
		      		<input v-model="sale.time.end" placeholder="7:00 PM" class="w-full bg-grey-light p-3 text-2xl text-black rounded-lg focus:outline-none border-2 border-transparent hover:border-grey focus:border-grey"/>
		      	</div>
		    </div>

		    <!-- row -->
		    <div class="flex justify-between items-center mt-8">
		      	<div class="w-full">
		      		<VueTrix v-model="sale.description" placeholder="Description of your sale" class="text-2xl" @trix-file-accept.prevent/>
		      	</div>
		    </div>

		   	<!-- row -->
		    <div class="flex flex-wrap justify-between items-center mt-8">
		    	<div class="w-full">
	    			Images (max of 3)
	    		</div>
		      	<div class="w-1/3 px-2" v-for="(image,index) in tempImages">
		      		<div class="flex justify-center bg-grey-lightest border-2 border-dashed border-grey rounded-lg hover:border-purple cursor-pointer">
		      			<div>
		      				<img :src="getImage(image)" />
							<button @click="removeImage(index)">Remove image</button>
		      			</div>
		      		</div>
		      	</div>
		      	<div class="w-1/3 px-2">
		      		<div class="flex justify-center bg-grey-lightest border-2 border-dashed border-grey rounded-lg hover:border-purple cursor-pointer">
		      			<div class="py-12 text-grey-darker opacity-75">
		      				Click here to add image
		      				<input type="file" @change="onFileChange">
		      			</div>
		      		</div>
		      	</div>
		    </div>

		    <!-- row -->
		    <div class="flex justify-between items-center mt-8">
		      	<div class="w-full">
		      		<input v-model="tag" placeholder="tag"><button @click="addTag()">Add +</button>
					<ul>
						<li v-for="(tag,index) in sale.tags">{{tag}} <button @click="removeTag(index)">X</button></li>
					</ul>
		      	</div>
		    </div>
    
		    </div>
		  </div>

		<div class="max-w-xl mx-auto flex justify-end">
			<button @click="createSale()" class="rounded-lg shadow-lg p-4 bg-purple">
				Create
			</button>
		</div>

	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
import Modal from '@/components/Modal'
import VueTrix from "vue-trix";
export default {
	name:'Create',
	components:{
		Navbar,
		Header,
		Actionbar,
		Modal,
		VueTrix
	},
	data(){
		return {
			tag:'',
			tempImages:[],
			promises:[],
			sale:{
				date:{
					start:null,
					end:null,
				},
				time:{
					start:null,
					end:null,
				},
				address:null,
				description:null,
				uid:null,
				images:[],
				tags:[],
			},
			successfulModal:false,
			recentlyCreatedSaleId:null
		}
	},
	methods:{
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
		addTag(){

			// Adds tag to sales tag array and resets input box
			if(this.tag !== ''){
				this.sale.tags.push(this.tag)
				this.tag = ''
			}
		},
		removeTag(index){

			// Removes tag from sales tag array
			this.sale.tags.splice(index, 1);

		},
		createSale(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Starts image upload method. Once complete, then it will save data to firestore
			// We do this so we can upload image -> grab the uploaded public URL -> save to firestore
			state.startImageUpload().then(function(){

				state.putFirestoreItem()

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
		putFirestoreItem(){

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
				state.sale = {
					date:{
						start:null,
						end:null
					},
					time:{
						start:null,
						end:null
					},
					address:null,
					description:null,
					uid:uid,
					images:[],
					tags:[]
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
		this.sale.uid = this.$store.state.currentUser.uid
	}
}
</script>