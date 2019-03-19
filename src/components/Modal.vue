<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="w-full sm:w-full md:max-w-lg lg:max-w-md modal-container shadow-lg rounded-lg bg-white font-sans" @click.stop>
          <div class="flex p-4 justify-between items-center">
            <div class="text-2xl text-grey-darker">
              {{title}}
            </div>
            <div>
              <button @click="$emit('close')" class="focus:outline-none">
                <svg class="text-grey-dark hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1361"><path d="M18 6L6 18M6 6L18 18"/></svg>
              </button>
            </div>
          </div>
          <div>
            <slot></slot>
          </div>
          <div class="p-4" @click="$emit('confirm')">
            <button type="submit" class="flex justify-center sm:justify-center items-center px-2 h-10 bg-purple border-2 border-transparent hover:bg-purple-dark rounded-lg no-underline focus:outline-none">
              <span class="px-3 text-white text-md">{{actionTitle}}</span>

              <svg v-if="!$store.state.loading" width="1.8rem" height="1.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8"><path class="secondary" d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"></path></svg>

              <svg v-if="$store.state.loading" width="1.2rem"  height="1.2rem"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-8" preserveAspectRatio="xMidYMid" style="background: none;"><circle cx="50" cy="50" fill="none" stroke-linecap="round" r="40" stroke-width="12" stroke="#ffffff" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(224.113 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>

            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  components: {
    
  },
  props:{
    title:{
      type:String,
      required:false
    },
    actionTitle:{
      type:String,
      required:false
    }
  },
  data(){
    return {
   
    }
  },
  methods:{
 

  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
  /*  width: 300px;*/
    margin: 0px auto;
  /*  padding: 20px 30px;*/
  /*  background-color: #fff;
    border-radius: 2px;*/
    transition: all .3s ease;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>