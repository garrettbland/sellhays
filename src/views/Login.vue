<template>
	<div>
		<h1>Login</h1>
		<p>
			Login with to continue
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
const fb = require('@/firebaseConfig.js')
export default {
	name:'Login',
	data(){
		return {

		}
	},
	methods:{
		signIn(socialPlatform){

			fb.auth.signInWithPopup(fb[socialPlatform]).then((result) => {
				console.log('')
				// this.$store.commit('setCurrentUser', user)
				this.$router.replace({'name':'create'})
			}).catch((err) => {
				console.log(err)
			})

		}
	}
}
</script>