import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Purecss from 'purecss'
import VModal from 'vue-js-modal'
import Toasted from 'vue-toasted'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(VModal, {
  componentName: 'vue-modal'
})
Vue.use(Toasted, {
  duration: 3000
})
Vue.use(Purecss)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
