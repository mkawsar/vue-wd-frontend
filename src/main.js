import Vue from 'vue'
import VueNotify from 'vue-notifyjs'
import App from './App'
import router from './router'
import env from '@/.env'
import notification from '@/services/notification';

Vue.use(VueNotify);

Vue.config.productionTip = false
require('./bootstrap');
Vue.prototype.$env = env
Vue.prototype.$notification = notification


// Custom Plugins / Services
import localStorage from '@/services/localStorage';

Vue.prototype.$localStorage = localStorage;

require('element-ui/lib/theme-chalk/index.css')

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
