import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const eventBus = new Vue()
Vue.prototype.$eventBus = eventBus

const app = new Vue(App)
app.$mount()
