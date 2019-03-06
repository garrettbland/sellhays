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
			<div v-if="!image">
				<h2>Select an image</h2>
				<input type="file" @change="onFileChange">
			</div>
			<div v-else class="w-1/3">
				<img :src="image" />
				<button @click="removeImage">Remove image</button>
			</div>
		</div>
		<div>
			<button @click="createSale()">
				Create
			</button>
		</div>
		<div>
			<code>
				{{sale}}
			</code>
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
			image:'',
			uploader:0,
			sale:{
				date:null,
				address:null,
				description:null,
				uid:null,
				image:null,
				tags:[]
			}
		}
	},
	methods:{
		onFileChange(e) {
	      var files = e.target.files || e.dataTransfer.files;
	      if (!files.length)
	        return;
	      this.createImage(files[0]);
	    },
	    createImage(file) {
	      var image = new Image();
	      var reader = new FileReader();
	      var state = this;

	      reader.onload = (e) => {
	        state.image = e.target.result;
	      };
	      reader.readAsDataURL(file);
	      state.uploadImage(file)
	    },
	    removeImage: function (e) {
	      this.image = '';
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

			// Call firebase function to create sale and pass in sale object
			fb.sales.add(
				state.sale
			).then(() => {

				// Reset form
				// TO DO: Put some sort of alert or something showing success and link to sale?
				state.sale = {}

				// Reset image
				state.image = ''

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