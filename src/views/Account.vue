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
			description="Manage your sales and account"
		/>

		<!--action bar-->
		<Actionbar showLogout />

		<!--account-->
		<div class="max-w-xl mx-auto flex flex-wrap mb-12">

			<!--my sales-->
			<div class="flex flex-col font-sans w-full mt-6 mx-4 sm:mx-4 md:mx-0">
				<div class="mb-4">
					<span class="text-2xl leading-tight">
						My Sales
					</span>
				</div>
				<div class="bg-white shadow-lg rounded-lg">
					<div class="flex justify-between border-b-2 border-grey-light p-4">
						<div class="w-1/3 font-bold">
							Date
						</div>
						<div class="flex flex-1 font-bold">
							<span class="hidden sm:hidden md:block">
								Address
							</span>
						</div>
						<div class="flex w-1/3 justify-end font-bold">
							Actions
						</div>
					</div>
					<div v-if="!sales.length" class="flex flex-col items-center justify-center py-24 text-grey-dark">
						<div>Looks like you don't have any sales yet.</div>
					</div>
					<div @click="viewSale(sale.id)" v-for="(sale,index) in sales" :key="index" class="flex justify-between items-center p-4 hover:bg-grey-lighter cursor-pointer no-underline text-grey-darkest my-sales-table">
						<div class="flex w-1/3">
							{{sale.date.start}}
						</div>
						<div class="flex flex-1">
							<span class="hidden sm:hidden md:block">
								{{sale.address}}
							</span>
						</div>
						<div class="flex justify-end h-8" v-on:click.stop>
							<button @click="confirmDelete(sale)" class="focus:outline-none outline-none">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 icon-trash"><path class="trash-primary" d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z"></path><path class="trash-secondary" d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z"></path></svg>
							</button>
						</div>
					</div>
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
		}
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