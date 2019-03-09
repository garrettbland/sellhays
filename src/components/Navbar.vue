<template>
	<div class="w-full bg-red">
		<div class="container mx-auto flex items-center justify-between px-3 py-2">
			<div class="w-1/3">
				<router-link tag="a" :to="{'name':'home'}">
					<img src="http://acmelogos.com/images/logo-5.svg" alt="logo placeholder"/>
				</router-link>
			</div>
			<div class="w-1/3 text-center">
				<div v-if="$store.state.loading">
					Loading...
				</div>
			</div>
			<div class="w-1/3 text-right">
				<div v-if="$store.state.currentUser == null">
					<router-link tag="a" :to="{'name':'login'}">
						Login
					</router-link>
				</div>
				<div v-else>
					<router-link tag="a" :to="{'name':'account'}">
						{{$store.state.currentUser.displayName}}
					</router-link>
					<button @click="logout()">
						Logout
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'navbar',
	data(){
		return {

		}
	},
	methods:{
		logout(){
			
			// Set state so we can use variable within firebase functions
			var state = this

			this.$firebase.auth.signOut().then(function() {

				// Sign-out successful. Set currentUser to null in vuex store
				state.$store.dispatch('clearData')
				state.$router.replace({'name':'login'})

			}, function(error) {

				// An error happened.
				console.log(error)

			})

		},
	}
}

</script>