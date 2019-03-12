<template>
	<div class="max-w-xl mx-auto flex items-center justify-between bg-white p-3 rounded-lg shadow-lg -mt-6 mb-6 font-sans">
		<div v-if="$store.state.currentUser == null">
			<router-link tag="a" :to="{'name':'login',query:{redirect:'create'}}" class="flex items-center py-1 px-1 bg-purple text-white hover:bg-purple-dark rounded-lg no-underline focus:outline-none">
	            <span class="px-3 text-purple-lightest">Create Free Sale</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 icon-add"><path class="secondary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path></svg>
	        </router-link>
	    </div>
	    <div v-else>
	        <router-link tag="a" :to="{'name':'create'}" class="flex items-center py-1 px-1 h-10 bg-purple border-2 border-transparent hover:bg-purple-dark rounded-lg no-underline focus:outline-none">
	            <span class="px-3 text-purple-lightest">Create Free Sale</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 icon-add"><path class="secondary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path></svg>
	        </router-link>
		</div>
		<div>
			<button @click="logout()" v-if="showLogout == true" class="flex items-center py-1 px-1 h-10 bg-white border-2 border-purple text-purple hover:bg-purple hover:text-purple-lightest rounded-lg no-underline focus:outline-none">
	            <span class="px-3">Logout</span>
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