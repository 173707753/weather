/* 
	vuex 状态管理文件   index.js为 store 的入口文件
 */

import Vue from 'vue';
import Vuex from 'vuex'
// import area from './area/area.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		// area
	},
	state: {
		areaList: []
	},
	mutations:{
	},
	actions: {
	}
})
