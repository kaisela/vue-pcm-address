import Vue from 'vue'
import App from './address.vue'

let vm = new Vue({
  el: '#app',
  render: h => h(App)
})
Vue.use(vm)
