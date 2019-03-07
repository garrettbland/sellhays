<template>
	<div>
		<h1>Sell Hays</h1>
		<div>
			<div v-if="loading">Loading...</div>
			<div v-if="!loading">Not loading...</div>
		</div>

		<p>
			<ul>
				<li>
					<div>
						{{sale.date}}
					</div>
					<div>
						{{sale.address}}
					</div>
					<div>
						{{sale.description}}
					</div>
					<div>
						Tags
						<ul>
							<li v-for="tag in sale.tags">{{tag}}</li>
						</ul>
					</div>
					<div>
						Images
						<ul>
							<li v-for="image in sale.images"><img :src="image"/></li>
						</ul>
					</div>
				</li>
			</ul>
		</p>
	</div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
	name:'Home',
	data(){
		return {
			loading:false,
			sale:{}
		}
	},
	methods:{
		async getSale(saleId){

			// Start loading indicator
			// TO DO: Put this into vuex so we can add loading stuff to navigation bar
			this.loading = true

			// Set state so we can use variable within firebase functions
			var state = this

			// Call firebase function to retreive sales object from firestore 'sales' collection with saleId
			const response = await fb.sales.doc(saleId).get().then(querySnapshot => {

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
			// TO DO: Put this into vuex so we can add loading stuff to navigation bar
			state.loading = false

		})
	},
}
</script>