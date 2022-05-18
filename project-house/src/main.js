import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './plugins/router'
import vuetify from './plugins/vuetify'

import titleMixin from './titleMixin'

Vue.mixin(titleMixin)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  created () {
    window.addEventListener('offline', () => {
      store.dispatch('setConnected', false)
    })
    window.addEventListener('online', () => {
      store.dispatch('setConnected', true)
    })
  }
}).$mount('#app')

