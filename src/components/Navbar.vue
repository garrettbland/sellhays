<template>
	<div class="w-full bg-red">
		<div class="container mx-auto flex items-center justify-between px-3 py-2">
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
				<router-link tag="a" :to="{'name':'login'}" v-if="$store.state.currentUser == null">
					Login
				</router-link>
				<router-link tag="a" :to="{'name':'login'}" v-if="$store.state.currentUser">
					{{$store.state.currentUser.displayName}}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'navbar',
	data(){
		return {

		}
	}
}

</script>