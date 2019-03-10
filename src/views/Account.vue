<template>
	<div>

		<Modal title="Alert" v-if="confirmDeleteModal" @close="confirmDeleteModal = false" @confirm="deleteSale()" actionTitle="Confirm Delete">
	      <div class="p-4">
	      	Are you sure you want to delete this sale? This cannot be reversed.
	      </div>
	    </Modal>

		<!--navbar-->
		<Navbar />

		<!--header-->
		<Header 
			title="Account"
			description="Manage your listings"
		/>

		<!--action bar-->
		<Actionbar />

		<!--sales-->
		<div class="max-w-xl mx-auto flex flex-wrap">
			<h2>
				My Sales
			</h2>
			<div class="flex justify-between items-center bg-grey p-4 w-full mb-4 rounded-lg" v-for="sale in sales">
				<div>
					<router-link tag="a" :to="{'name':'sale',params:{id:sale.id}}" class="cursor-pointer no-underline text-black">
						<div>
							<span class="text-3xl">{{sale.address}}</span>
						</div>
						<div>
							{{sale.description}}
						</div>
					</router-link>
				</div>
				<div @click="confirmDelete(sale)">
					Delete
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Actionbar from '@/components/Actionbar'
import Modal from '@/components/Modal'
export default {
	name:'Account',
	components:{
		Navbar,
		Header,
		Actionbar,
		Modal
	},
	data(){
		return {
			sales:null,
			confirmDeleteModal:false,
			selectedSale:null
		}
	},
	methods:{
		viewSale(saleId){

			// Send user to sale detail view with params
			this.$router.push({'name':'sale',params:{id:saleId}})

		},
		async getSales(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Grab currentUser uid
			const uid = state.$store.state.currentUser.uid

			// Call firebase function to retreive sales object from firestore 'sales' collection where uid is current user uid
			const response = await this.$firebase.sales.where('uid','==',uid).onSnapshot(querySnapshot => {

				// Set 'this.sales' array to empty
				state.sales = []

				// Use querySnapshot callback from above to build array of objects for 'this.sales'
				querySnapshot.forEach(doc => {
					state.sales.push({
						id:doc.id,
						address:doc.data().address,
						date: doc.data().date,
						description:doc.data().description,
						images:doc.data().images,
						tags:doc.data().tags,
						uid:doc.data().uid
					})
				})

			})
		},
		confirmDelete(sale){

			// Set selected sale id and open confirm delete modal
			this.selectedSale = sale
			this.confirmDeleteModal = true

		},
		deleteSale(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Start loading indicator
			state.$store.commit('setLoading', true)

			// Start deleteing images from array, then delete firestore item
			state.deleteImages().then(function(){
				state.deleteFirestoreItem()
			})

		},
		deleteFirestoreItem(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Sale id
			var saleId = state.selectedSale.id

			// Delete sale with sale id then continue on to remove images from storage
			state.$firebase.sales.doc(saleId).delete()
			.then(function(){

				// Reset modal and selected sale state
				state.selectedSale = null
				state.confirmDeleteModal = false

				// End loading indicator
				state.$store.commit('setLoading', false)

			})
			.catch(function(error){
				console.log('something went wrong deleteing...'+error)
			})

		},
		async deleteImages(){

			// Set state so we can use variable within firebase functions
			var state = this

			// Array of image paths
			var images = state.selectedSale.images

			// Loop through temp images array and upload to firebase storage
			for(const item of images){
				const result = await state.deleteStorageItem(item)
			}

		},
		deleteStorageItem(item) {

			// Set state so we can use variable within firebase functions
			var state = this

			// Return a new promise for each image upload
			// After each successful upload, we push the public image URL to the sale object images array
			return new Promise((resolve,reject) => {

				// Takes the full image storage path, and strips away everything except for the file name
				var url = item
				url = url.split('%2F').pop().replace(/\#(.*?)$/, '').replace(/\?(.*?)$/, '');

				// Create reference to file location
				var imageRef = state.$firebase.storage.ref('sales/'+url)

				// Delete the file
				imageRef.delete()
				.then(function(){

					// File was deleted successfully, resolve the promise
					resolve()

				})
				.catch(function(){
					
					// There was an error
					// TO-DO: Make an alert or popup or something
					console.log('error occured deleting image')

				})

			})
		},
	},
	mounted(){

		// Set state so we can use variable within functions
		var state = this

		// Run 'getSales' method once the view is mounted
		this.getSales().then(function(){

			// End loading indicator
			state.$store.commit('setLoading', false)

		})
	}
}
</script>