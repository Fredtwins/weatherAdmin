// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import 'base/icons'
import 'iview/dist/styles/iview.css'
import 'common/scss/reset.scss'
import 'common/scss/base.scss'

Vue.use(iView)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
