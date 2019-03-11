<template>
		<div class="w-full bg-purple">
			<div class="flex items-center justify-center py-24 h-32">
				<div class="text-center" v-if="$store.state.loading === false">
					<h1 class="text-4xl">
						{{title}}
					</h1>
					<p>
						{{description}}
					</p>
				</div>
			</div>
		</div>
</template>

<script>
export default {
	name:'header',
	props:{
		title:{
			type:String,
			required:false
		},
		description:{
			type:String,
			required:false
		}
	},
	data(){
		return {

		}
	}	
}
</script>