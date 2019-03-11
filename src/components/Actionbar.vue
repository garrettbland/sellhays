<template>
	<div class="max-w-xl mx-auto flex items-center justify-between bg-blue mx-3 px-3 py-6 rounded-lg shadow-lg -mt-6 mb-6">
		<div>
			<div v-if="$store.state.currentUser == null">
				<router-link tag="a" :to="{'name':'login',query:{redirect:'create'}}">
					Create Free Sale
				</router-link>
			</div>
			<div v-else>
				<router-link tag="a" :to="{'name':'create'}">
					Create Free Sale
				</router-link>
			</div>
		</div>
		<div>
			<button @click="logout()" v-if="showLogout == true">
				Logout
			</button>
		</div>
	</div>
</template>

<script>
export default{
	name:'Actionbar',
	props:{
		showLogout:{
			type:Boolean,
			required:false,
			default:false
		}
	},
	data(){
		return {

		}
	},
	methods:{
		logout(){
			
			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase signOut method, remove user from vuex store, and then send back to login page
			this.$firebase.auth.signOut().then(function() {

				// Sign-out successful. Set currentUser to null in vuex store
				state.$store.dispatch('clearData')
				state.$router.replace({'name':'login'})

			}, function(error) {

				// An error happened.
				// TO-DO: Make an alert or popup or something
				console.log(error)

			})

		}
	}
}
</script>