<template>
	<div>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			:title="sale.address"
			description="View details, images, and more"
		/>

		<div class="max-w-xl mx-auto -mt-6 bg-grey p-4 rounded-lg shadow-lg">
			<ul>
				<li>
					<div>
						{{sale.date.start}}
					</div>
					<div>
						{{sale.address}}
					</div>
					<div v-html="sale.description">

					</div>
					<div>
						Tags
						<ul>
							<li v-for="(tag,index) in sale.tags" :key="index">{{tag}}</li>
						</ul>
					</div>
					<div>
						Images
						<ul>
							<li v-for="(image,index) in sale.images" :key="index"><img :src="image"/></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
export default {
	name:'Home',
	components:{
		Navbar,
		Header,
		Actionbar
	},
	data(){
		return {
			sale:{}
		}
	},
	methods:{
		async getSale(saleId){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Call firebase function to retreive sales object from firestore 'sales' collection with saleId
			const response = await this.$firebase.sales.doc(saleId).get().then(querySnapshot => {

				// Check to see if firestore document with saleId exists
				if(querySnapshot.exists){

					// Document with saleId does exists, set 'this.sale' object with firestore data
					state.sale = querySnapshot.data()

				}else{

					// Document with saleId does not exist or has been deleted. Show user 404 page
					this.$router.push({'name':'notfound'})

				}

			})
		},
	},
	mounted(){

		// Set state so we can use variable within functions
		var state = this

		// Get id of sale from URL
		var saleId = this.$route.params.id

		// Run method once the view is mounted
		this.getSale(saleId).then(function(){

			// End loading indicator
			state.$store.commit('setLoading', false)

		})
	},
}
</script>