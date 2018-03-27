/**
 * Created by Administrator on 2018/3/8.
 */
const state = {
  projectId: '',
  itemObj1: {},
  itemObj2: {},
  groupObj: {},
  pointObj1: {},
  pointObj2: {},
  request: {},
  startDate: {},
  endDate: {},
  dateCheck: false,
  pointCheck: false
};
const mutations = {
  SET_ITEM_1(state, obj){
    state.itemObj1 = obj;
    window.session.setObj(window.sessionKeys.MONITORITEM1, obj);
  },
  SET_ITEM_2(state, obj){
    state.itemObj2 = obj;
    window.session.setObj(window.sessionKeys.MONITORITEM2, obj);
  },
  SET_GROUP(state, obj){
    console.log(obj);
    state.groupObj = obj;
    // window.session.setObj(window.sessionKeys.POINTGROUP, obj);
  },
  SET_POINT_1(state, obj){
    state.pointObj1 = obj;
    window.session.setObj(window.sessionKeys.MONITORITEM1, obj);
  },
  SET_POINT_2(state, obj){
    state.pointObj2 = obj;
    window.session.setObj(window.sessionKeys.MONITORITEM2, obj);
  },
  SET_START_DATE(state, obj){
    state.startDate = obj;
  },
  SET_END_DATE(state, obj){
    state.endDate = obj;
  },
  SET_DATE_CHECK(state, check){
    state.dateCheck = check;
  },
  SET_POINT_CHECK(state, check){
    state.pointCheck = check;
  },
  SET_GROUP_CHECK(state, check){
    state.groupCheck = check;
  },
  SET_REQUEST(state, obj){
    state.request = obj;
  },
};
const actions = {
  setItemObj1({commit}, obj){
    commit('SET_ITEM_1', obj);
  },
  setItemObj2({commit}, obj){
    commit('SET_ITEM_2', obj);
  },
  setGroupObj({commit}, obj){
    commit('SET_GROUP', obj);
  },
  setPointObj1({commit}, obj){
    commit('SET_POINT_1', obj);
  },
  setPointObj2({commit}, obj){
    commit('SET_POINT_2', obj);
  },
  setRequest({commit}, obj){
    commit('SET_REQUEST', obj);
  },
  setStartDate({commit}, obj){
    commit('SET_START_DATE', obj);
  },
  setEndDate({commit}, obj){
    commit('SET_END_DATE', obj);
  },
  setDateCheck({commit}, obj){
    commit('SET_DATE_CHECK', obj);
  },
  setPointCheck({commit}, obj){
    commit('SET_POINT_CHECK', obj);
  },
  setGroupCheck({commit}, obj){
    commit('SET_GROUP_CHECK', obj);
  },
};
const getters = {
  getItemObj1(state){
    return state.itemObj1 && state.itemObj1.hasOwnProperty('id ') ?
      state.itemObj1 :
      window.session.getObj(window.sessionKeys.MONITORITEM1);
  },
  getItemObj2(state){
    return state.itemObj2 && state.itemObj2.hasOwnProperty('id ') ?
      state.itemObj2 :
      window.session.getObj(window.sessionKeys.MONITORITEM2);
  },
  getGroupObj(state){
    return state.groupObj && state.groupObj.hasOwnProperty('id ') ?
      state.groupObj :
      window.session.getObj(window.sessionKeys.POINTGROUP);
  },
  getPointObj1(state){
    return state.pointObj1 && state.pointObj1.hasOwnProperty('id ') ?
      state.pointObj1 :
      window.session.getObj(window.sessionKeys.MONITORITEM1);
  },
  getPointObj2(state){
    return state.pointObj2 && state.pointObj2.hasOwnProperty('id ') ?
      state.pointObj2 :
      window.session.getObj(window.sessionKeys.MONITORITEM2);
  },
  getRequest(state){
    return state.request;
  },
  getStartDate(state){
    return state.startDate && state.startDate.hasOwnProperty('id ') ?
      state.startDate :
      window.session.getObj(window.sessionKeys.STARTDATE);
  },
  getEndDate(state){
    return state.endDate && state.endDate.hasOwnProperty('id ') ?
      state.endDate :
      window.session.getObj(window.sessionKeys.ENDDATE);
  },
  getDateCheck(state){
    return state.dateCheck;
  },
  getPointCheck(state){
    return state.pointCheck;
  },
  getGroupCheck(state){
    return state.groupCheck;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
