import Vue from 'vue'
import App from './App.vue';
import router from './router'
import store from './store'
// elemenUi 
import './elementUi';
// 富文本编辑器
import './quillEditor'

import '@/assets/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
