<template>
	<div class="w-full bg-red px-3 py-2">
		<div class="container mx-auto flex items-center justify-between">
			<div class="w-1/3">
				<router-link tag="a" :to="{'name':'home'}">
					<img src="http://acmelogos.com/images/logo-5.svg" alt="logo placeholder"/>
				</router-link>
			</div>
			<div class="w-1/3 text-center">
				Loading Indicator
			</div>
			<div class="w-1/3 text-right">
				<router-link tag="a" :to="{'name':'login'}">
					Login
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