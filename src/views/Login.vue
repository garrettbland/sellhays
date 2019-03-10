<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Login"
			description="Sign in with your favorite social login to post"
		/>

		<p>
			<br>
			<button @click="signIn('google')">
				Sign In with Google
			</button>
			<br>
			<button @click="signIn('twitter')">
				Sign In with Twitter
			</button>
			<br>
			<button @click="signIn('facebook')">
				Sign In with Facebook
			</button>
		</p>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import { mapState } from 'vuex'
export default {
	name:'Login',
	components:{
		Navbar,
		Header
	},
	data(){
		return {

		}
	},
	methods:{
		signIn(socialPlatform){

			// Sign in with firebase popup and feed in the social platform user selected
			this.$firebase.auth.signInWithRedirect(this.$firebase[socialPlatform]).then((result) => {

				// Sets user in vuex store
				this.$store.commit('setCurrentUser', result.user)

			}).catch((err) => {

				// If there was a problem logging in
				// TO-DO: Make an alert or popup or something
				console.log(err)
			})

		},
		redirect(){

			// If user is logged in, then route user to redirect or 'account' by default
			if(this.currentUser){
				this.$router.replace(this.$route.query.redirect || '/account')
			}
		}
	},
	computed: {

		// Maps currentUser from vuex store to use
		...mapState(['currentUser'])

	},
  	mounted(){

  		// After page is reloaded or loaded, fire redirect method
  		this.redirect()

  	}
}
</script>