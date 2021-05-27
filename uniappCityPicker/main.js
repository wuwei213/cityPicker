import Vue from 'vue'
import App from './App'
// 引入全局存储
import store from '@/store';

// 全局组件
import rfLoading from '@/components/rf-loading';    //页面刷新过渡动画
import wxCityPicker from '@/components/wxCityPicker/wxCityPicker.vue' //城市三级组件


// 挂载全局自定义方法
Vue.prototype.$mStore = store;



Vue.component('rfLoading', rfLoading);

Vue.component('city-picker',wxCityPicker)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
