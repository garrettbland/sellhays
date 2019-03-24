<template>
	<div class="w-full bg-grey-lighter noprint">
	  <div class="max-w-xl mx-auto flex items-center justify-between px-3 py-2 font-sans">
	    <div class="w-2/5">
	      <router-link :to="{'name':'home'}" class="router-link-exact-active router-link-active flex items-center nunito no-underline text-purple hover:text-purple-dark">
	        <div>
	          <img src="https://image.flaticon.com/icons/svg/138/138237.svg" alt="Sell Hays Logo" class="w-12 mr-4"/>
	        </div>
	        <div class="text-lg font-bold hidden sm:hidden md:block">
	          Sell Hays
	        </div>
	      </router-link>
	    </div>
	    <div class="w-1/5 text-center">
	    	<div v-if="$store.state.loading">
				<svg width="2.5rem"  height="2.5rem"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring" style="background: none;"><circle cx="50" cy="50" fill="none" stroke-linecap="round" r="40" stroke-width="12" stroke="#9561e2" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(224.113 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
			</div>
	    </div>
	    <div class="w-2/5 flex justify-end">

	    	<div v-if="$store.state.currentUser == null">
				<router-link :to="{'name':'account'}" class="router-link-exact-active router-link-active flex items-center nunito no-underline text-grey-dark hover:text-grey-darker">
					<div class="text-lg font-bold">
						Login
					</div>
				</router-link>
			</div>
			<div v-else>
				<router-link tag="a" :to="{'name':'account'}" class="router-link-exact-active router-link-active flex items-center nunito no-underline text-grey-dark hover:text-grey-darker">
					<div class="text-lg hidden sm:hidden md:block mr-4">
						{{$store.state.currentUser.displayName}}
					</div>
					<div>
						<img :src="$store.state.currentUser.photoURL" alt="Profile Image" class="w-12 h-12 rounded-full shadow-md"/>
					</div>
				</router-link>
			</div>

	    </div>
	  </div>
	</div>
</template>

<script>
import Modal from '@/components/Modal'
export default {
	name:'navbar',
	data(){
		return {
			
		}
	},
	methods:{

	}
}

</script>