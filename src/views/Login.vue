<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Login"
			description="Sign in with your preferred social login to post"
		/>

		<div class="max-w-xl mx-auto bg-white p-2 rounded-lg shadow -mt-6 font-sans">
			<div class="flex flex-wrap">
				<div class="w-full sm:w-full md:w-1/3 p-2">
					<div @click="signIn('google')" class="flex flex-col rounded-lg bg-grey-lighter py-6 items-center justify-center border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 20 20">
							    <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
							    <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
							    <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 0 0 0 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
							    <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
							</svg>
						</div>
						<div class="pt-1 text-grey-darkest">
							Sign in with Google
						</div>
					</div>
				</div>
				<div class="w-full sm:w-full md:w-1/3 p-2">
					<div @click="signIn('twitter')" class="flex flex-col rounded-lg bg-grey-lighter py-6 items-center justify-center border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg fill="#1DA1F2" role="img" class="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
						</div>
						<div class="pt-1 text-grey-darkest">
							Sign in with Twitter
						</div>
					</div>
				</div>
				<div class="w-full sm:w-full md:w-1/3 p-2">
					<div @click="signIn('facebook')" class="flex flex-col rounded-lg bg-grey-lighter py-6 items-center justify-center border-2 border-transparent hover:border-purple cursor-pointer outline-none">
						<div>
							<svg fill="#3B5998" role="img" class="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook icon</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path></svg>
						</div>
						<div class="pt-1 text-grey-darkest">
							Sign in with Facebook
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="max-w-md text-sm mx-auto text-center justify-center py-6 px-4 text-grey-darkest opacity-75 italic font-sans mb-12 leading-tight">
			<p class="mb-4">
				We require a social login to prevent abuse. We dont keep any of your information or share your information with others. For more info, view our 
				<router-link :tag="a" :to="{'name':'privacy'}">privacy policy</router-link>
			</p>
			<p>
				By signing up, you are agreeing to our 
				<router-link :tag="a" :to="{'name':'terms'}">terms & conditions</router-link>
			</p>
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