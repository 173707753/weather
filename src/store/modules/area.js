/**
 * 存放 ** 数据
 * **/
 
// initial state
const state = {
  areaList: []
}
 
// getters
const getters = {}
 
// actions
const actions = {
	setAreaList({ commit }, params) {
		commit('set_Area_List', params);
	}
}
 
// mutations
const mutation = {
  set_Area_List(state, newVal) { //设置参数
    state.areaList = newVal;
  }
}
 
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutation
}