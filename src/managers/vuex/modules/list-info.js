/**
 * Created by Administrator on 2018/3/2.
 */
const state = {
  info: {}
};
const mutations = {
  update(state, obj){
    window.session.setObj(window.sessionKeys.TEMPINFO, obj);
    state.info = {};
    state.info = obj;
  }
};
const actions = {
};
const getters = {
  info: function (state) {
    if (!state.info || !state.info.id) {
      state.info = window.session.getObj(window.sessionKeys.TEMPINFO);
    }
    return state.info;
  }};

export default {
  state,
  mutations,
  actions,
  getters
}
