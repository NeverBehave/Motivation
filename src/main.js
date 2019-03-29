import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Purecss from 'purecss'
import VModal from 'vue-js-modal'
import Toasted from 'vue-toasted'
import moment from 'moment'
import VueI18n from 'vue-i18n'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import lang from './i18n'

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(VModal, {
  componentName: 'vue-modal'
})
Vue.use(Toasted, {
  duration: 3000
})
Vue.use(Purecss)
Vue.use(VueI18n)

OfflinePluginRuntime.install()

export const i18n = new VueI18n({
  locale: (() => {
    let l = navigator.language.toLocaleLowerCase()
    return l.includes('zh') || l.includes('cn') ? 'cn' : l
  })(), // 设置语言环境
  fallbackLocale: 'en',
  messages: lang // 设置语言环境信息
})

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
