<template>
	<div>
		
		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Create New Sale"
			description="Post your garage sale for free"
		/>

		<!--action bar-->
		<Actionbar />

		<h1>Create Garage Sale</h1>
		<div>
			<button @click="logout()">
				Logout
			</button>
		</div>
		<div>
			<div v-if="loading">Loading...</div>
			<div v-if="!loading">Not loading...</div>
		</div>
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
		<div>
			<button @click="createSale()">
				Create
			</button>
		</div>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
export default {
	name:'Create',
	components:{
		Navbar,
		Header,
		Actionbar
	},
	data(){
		return {
			loading:false,
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
			}
		}
	},
	methods:{
		getImage(image){
			return URL.createObjectURL(image)
		},
		onFileChange(e) {
			
	      var file = e.target.files[0]
	      //this.tempImages.push(URL.createObjectURL(file))
	      this.tempImages.push(file)

	    },
	    removeImage(index) {
	      this.tempImages.splice(index, 1);
	    },
	    uploadImage(file){
	    	var state = this
	    	var storageRef = this.$firebase.storage.ref('sales/'+Date.now());
	        var task = storageRef.put(file);
	        task.on('state_changed', function progress(snapshot) {

	          var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100
	          state.uploader = percentage

	        }, function error(err) {

	            console.log('there was an error uploading image')

	        },function complete() {

	          console.log('success! Image uploaded')
	            // Handle successful uploads on complete
	            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
	              console.log('File available at', downloadURL);
	              //Set preview
	              state.sale.image = downloadURL
	            });

	        });
	    },
		addTag(){
			if(this.tag !== ''){
				this.sale.tags.push(this.tag)
				this.tag = ''
			}
		},
		removeTag(index){
			this.sale.tags.splice(index, 1);
		},
		createSale(){

			// Start loading indicator
			// TO DO: Put this into vuex so we can add loading stuff to navigation bar
			this.loading = true

			// Set state so we can use variable within firebase functions
			var state = this

			state.test().then(function(){
				console.log('yay!')
				//Now save data to firestore
				state.putFirestoreItem()
			})
		},
		async test(){
			// Set state so we can use variable within firebase functions
			var state = this

			const images = state.tempImages
			for(const item of images){
				const result = await state.putStorageItem(item)
				console.log('result is...'+result)
			}
			console.log('after forEach')
		},
		putStorageItem(item) {

			console.log('put storage item is happening...')

			// Set state so we can use variable within firebase functions
			var state = this

			return new Promise((resolve,reject) => {
				this.$firebase.storage.ref('sales/'+Date.now()).put(item)
				.then((snapshot) => {
					snapshot.ref.getDownloadURL().then(function(downloadURL) {
		              console.log('File available at', downloadURL);
		              //Set preview
		              state.sale.images.push(downloadURL)
		              resolve(downloadURL)
		            });
				}).catch((error) => {
					console.log('One failed:', item, error.message)
				})
			})
		},
		putFirestoreItem(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase function to create sale and pass in sale object
			this.$firebase.sales.add(
				state.sale
			).then(() => {

				// Reset form
				// TO DO: Put some sort of alert or something showing success and link to sale?
				state.sale = {}

				// Reset image
				state.tempImages = []

				// End loading indicator
				// TO DO: Put this into vuex so we can add loading stuff to navigation bar
				state.loading = false


			}).catch(err => {

				// Log the error to console if something went wrong
				console.log(err)

			})
		}
	}
}
</script>