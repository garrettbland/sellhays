<template>
	<div>
		<h1>Create Garage Sale</h1>
		<div>
			<h4>{{getCurrentUser()}}</h4>
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
const fb = require('@/firebaseConfig.js')
export default {
	name:'Create',
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
	      // if (!files.length)
	      //   return
	      //this.createImage(file)
	    },
	    createImage(file) {
	
	      var image = new Image()
	      var reader = new FileReader()

	      reader.onload = (e) => {
	        return e.target.result
	      };
	      reader.readAsDataURL(file)
	      //state.uploadImage(file)
	    },
	    removeImage(index) {
	      this.tempImages.splice(index, 1);
	    },
	    uploadImage(file){
	    	var state = this
	    	var storageRef = fb.storage.ref('sales/'+Date.now());
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
		logout(){
			
			// Set state so we can use variable within firebase functions
			var state = this

			fb.auth.signOut().then(function() {
			  // Sign-out successful.
			  state.$router.replace({'name':'home'})
			}, function(error) {
			  // An error happened.
			  console.log(error)
			})

		},
		getCurrentUser(){
			var user = fb.auth.currentUser
			this.sale.uid = user.uid
			return user.displayName
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

			//var promises = []

			// var tempImages = state.tempImages
			// state.processArray(tempImages).then(function(){
			// 	console.log('fucking work please')
			// })

			// {
			//   for (const item of tempImages) {
			//     await putStorageItem(item)
			//   }
			//   console.log('Done!');
			// }


			// state.tempImages.forEach(async function(file){
			// 	var promise = state.putStorageItem(file)
			// 	await promises.push(promise)
			// 	console.log(promises)
			// })

			// Promise.all(

			// 	// Upload images first so we can grab public URL
			// 	state.tempImages.map(item => state.putStorageItem(item))

			// )
			// .then((url) => {
			// 	console.log(`All images uploaded successfully`)

			// 	//Now save data to firestore
			// 	state.putFirestoreItem()

			// })
			// .catch((error) => {
			// 	console.log(`Some failed: `, error.message)
			// });
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
		// async processArray(array){
		// 	// Set state so we can use variable within firebase functions
		// 	var state = this

		// 	//const promises = state.tempImages.map(item => state.putStorageItem(item))

		// 	await Promise.all(state.tempImages.map(item => state.putStorageItem(item))).then(function(){
		// 		console.log('done fucker')
		// 	})

		// 	// for (const item of array){
		// 	// 	await state.putStorageItem(item)
		// 	// }
		// 	// console.log('done!')
		// },
		putStorageItem(item) {

			console.log('put storage item is happening...')

			// Set state so we can use variable within firebase functions
			var state = this

			return new Promise((resolve,reject) => {
				fb.storage.ref('sales/'+Date.now()).put(item)
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

			// // the return value will be a Promise
			// return fb.storage.ref('sales/').put(item)
			// .then((snapshot) => {
			// 	snapshot.ref.getDownloadURL().then(function(downloadURL) {
	  //             console.log('File available at', downloadURL);
	  //             //Set preview
	  //             state.sale.images.push(downloadURL)
	  //           });
			// }).catch((error) => {
			// 	console.log('One failed:', item, error.message)
			// })
		},
		putFirestoreItem(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase function to create sale and pass in sale object
			fb.sales.add(
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
	},
	mounted(){

		// Run method once the view is mounted
		this.getCurrentUser()

	}
}
</script>