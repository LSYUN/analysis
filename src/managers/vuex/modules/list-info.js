/**
 * Created by Administrator on 2018/3/2.
 */
const state = {
  info: {}
};
const mutations = {
  updateInfo(state, obj){
    window.session.setObj(window.sessionKeys.TEMPINFO, obj);
    state.info = {};
    state.info = obj;
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
