<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Account"
			description="Manage your listings"
		/>

		<!--action bar-->
		<Actionbar />

		<p>
			List of old listings
		</p>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
export default {
	name:'Login',
	components:{
		Navbar,
		Header,
		Actionbar
	},
	data(){
		return {

		}
	}
}
</script>