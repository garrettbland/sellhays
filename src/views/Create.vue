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

		<div class="max-w-xl mx-auto -mt-6 mb-6 bg-grey p-4 rounded-lg shadow-lg">
			<h1>Create Garage Sale</h1>

			<div>
				<input v-model="sale.date" placeholder="date">
				<br>
				<input v-model="sale.address" placeholder="address">
				<br>
				<textarea v-model="sale.description" placeholder="description"></textarea>
				<br>
				<strong>Tags</strong>
				<br>
				<input v-model="tag" placeholder="tag"><button @click="addTag()">Add +</button>
				<ul>
					<li v-for="(tag,index) in sale.tags">{{tag}} <button @click="removeTag(index)">X</button></li>
				</ul>
				<br>
				<div v-for="(image,index) in tempImages" class="w-1/3">
					<img :src="getImage(image)" />
					<button @click="removeImage(index)">Remove image</button>
				</div>
				<h2>Add new image</h2>
				<input type="file" @change="onFileChange">
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
export default {
	name:'Create',
	components:{
		Navbar,
		Header,
		Actionbar,
		Modal
	},
	data(){
		return {
			tag:'',
			tempImages:[],
			promises:[],
			sale:{
				date:null,
				address:null,
				description:null,
				uid:null,
				images:[],
				tags:[]
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
					date:null,
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