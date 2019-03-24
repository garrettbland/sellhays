<template>
	<div class="w-full header-background background font-sans noprint">
	  <div class="flex items-center justify-center py-24 h-64">
	    <div class="text-center px-4">
	      <h1 class="text-4xl text-white leading-normal nunito" v-if="title">
		    {{title}}
		  </h1>
	 	  <p class="text-white opacity-75 leading-normal text-lg nunito" v-if="title">
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