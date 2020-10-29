import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueMoment from 'vue-moment'
import VueMasonry from 'vue-masonry-css'
import Element from 'element-ui'

import dateFilter from '@/filters/date.filter'
import i18n from '@/languages'
import router from './router'
import store from './store'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css'
import './styles/_index.scss'

Vue.config.productionTip = false
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueMeta)
Vue.use(VueMoment)
Vue.use(VueMasonry)
Vue.filter('date', dateFilter)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
