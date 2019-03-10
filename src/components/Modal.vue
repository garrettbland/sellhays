<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="w-full sm:w-full md:max-w-lg lg:max-w-md modal-container shadow-lg rounded-lg bg-white" @click.stop>
          <div class="flex p-4 justify-between items-center">
            <div class="text-2xl text-grey-darkest">
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
          <div class="p-4 bg-grey-lighter rounded-b-lg flex justify-end" @click="$emit('confirm')">
            <div>
              Confirm
            </div>
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