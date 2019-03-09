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
		<div>
			Current user from vuex {{currentUser}}
		</div>
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
				console.log('auth is successfull...')
				this.$store.commit('setCurrentUser', result.user)
			}).catch((err) => {
				console.log(err)
			})

		},
		redirect(){
			console.log('redirect fired...')
			if(this.currentUser){
				this.$router.replace(this.$route.query.redirect || '/account')
			}
		}
	},
	computed: {
		...mapState(['currentUser'])
	},
  	mounted(){
  		this.redirect()
  	}
}
</script>