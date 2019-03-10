<template>
	<div class="max-w-xl mx-auto flex items-center justify-between bg-blue mx-3 px-3 py-6 rounded-lg shadow-lg -mt-6 mb-6">
		<div>
			<div v-if="$store.state.currentUser == null">
				<router-link tag="a" :to="{'name':'login',query:{redirect:'create'}}">
					Create Free Sale
				</router-link>
			</div>
			<div v-else>
				<router-link tag="a" :to="{'name':'create'}">
					Create Free Sale
				</router-link>
			</div>
		</div>
		<div>
			<img src="https://image.flaticon.com/icons/png/512/17/17764.png" alt="" class="w-6"/>
		</div>
	</div>
</template>

<script>
export default{
	name:'Actionbar',
	props:{

	},
	data(){
		return {

		}
	}
}
</script>