<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Account"
			description="Manage your listings"
		/>

		<p>
			List of old listings
		</p>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
export default {
	name:'Login',
	components:{
		Navbar,
		Header
	},
	data(){
		return {

		}
	}
}
</script>