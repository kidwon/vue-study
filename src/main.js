// create vue root instance

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import * as VeeValidate from 'vee-validate'

Vue.use(ElementUI)
// Vue.use(VeeValidate)

new Vue({
  el: '#app',
  //
  components: {
    App
  },
  template: '<App/>'
})
