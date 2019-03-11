<template>
	<div>

		<div class="w-full bg-red">
			<div class="max-w-xl mx-auto flex items-center justify-between px-3 py-2">
				<div class="w-1/3">
					<router-link tag="a" :to="{'name':'home'}">
						<img src="http://acmelogos.com/images/logo-5.svg" alt="logo placeholder"/>
					</router-link>
				</div>
				<div class="w-1/3 text-center">
					<div v-if="$store.state.loading">
						Loading...
					</div>
				</div>
				<div class="w-1/3 text-right">
					<div v-if="$store.state.currentUser == null">
						<router-link tag="a" :to="{'name':'login'}">
							Login
						</router-link>
					</div>
					<div v-else>
						<router-link tag="a" class="flex items-center justify-end" :to="{'name':'account'}">
							<div>
								My Account
							</div> 
							<div>
								<img class="rounded-full w-16 h-16 p-1 bg-orange hover:bg-blue" :src="$store.state.currentUser.photoURL" />
							</div>
						</router-link>
					</div>
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