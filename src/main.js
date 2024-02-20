import Vue from 'vue'
import App from './App.vue'

// 引入第三方依赖
import Element from 'element-ui'

// 引入自定义封装第三方插件
import router from './router'
import store from './store'
import animated from 'animate.css/animate.compat.css'
import './assets/font/iconfont/iconfont.css'
// 引入 js 自定义文件
import './error' // vue 错误日志

//  引入样式
import 'element-ui/lib/theme-chalk/index.css' //element样式
import './styles/common.scss' //通用样式
// 引入自定义全局组件'
// vue 插件使用
Vue.use(Element)
Vue.use(animated)
Vue.config.productionTip = false

const vm = new Vue({
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
	render: (h) => h(App),
}).$mount('#app')
