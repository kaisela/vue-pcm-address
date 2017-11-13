import Vue from 'vue'
import App from './main.vue'
import Address from './index';
Vue.component('my-address', Address);
let vm = new Vue({
  el: '#app',
  render: h => h(App)
})
Vue.use(vm)
