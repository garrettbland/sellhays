<template>
	<div>
		<h1>Login</h1>
		<p>
			Login with Google or Facebook to continue
			<button @click="signIn()">
				Sign In with Google
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
		signIn(){

			fb.auth.signInWithPopup(fb.google).then((result) => {
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