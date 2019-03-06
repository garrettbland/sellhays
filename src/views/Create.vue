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
			<input v-model="sale.address" placeholder="address">
			<textarea v-model="sale.description" placeholder="description"></textarea>
		</div>
		<code>
			{{sale}}
		</code>
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
	name:'Home',
	data(){
		return {
			loading:false,
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
		this.getCurrentUser()
	}
}
</script>