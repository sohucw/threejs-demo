import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/index';
import ElementUI from 'element-ui';
import '@/assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'small' // set element-ui default size
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
