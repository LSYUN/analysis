/**
 * Created by Administrator on 2018/2/28.
 */
const state = {
  pathKey: 'projectAdd',
  pathName: '添加工程'
};
const mutations = {
  changePath(state, path) {
    state.pathKey = path.enPath;
    state.pathName = path.cnPath;
  }
};
const actions = {};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
