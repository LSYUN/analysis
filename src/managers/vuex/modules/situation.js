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
  },
  SET_GROUP(state, obj){
    state.groupObj = obj;
  },
  SET_POINT_1(state, obj){
    state.pointObj1 = obj;
  },
  SET_POINT_2(state, obj){
    state.pointObj2 = obj;
  },
  SET_REQUEST(state, obj){
    state.request = obj;
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
  }
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
    return state.itemObj1 && state.itemObj1.id ? state.itemObj1 : window.session.getObj(window.sessionKeys.MONITORITEM1);
  },
  getItemObj2(state){
    return state.itemObj2 && state.itemObj2.id ? state.itemObj2 : window.session.getObj(window.sessionKeys.MONITORITEM2);
  },
  getGroupObj(state){
    return state.groupObj;
  },
  getPointObj1(state){
    return state.pointObj1;
  },
  getPointObj2(state){
    return state.pointObj2;
  },
  getRequest(state){
    return state.request;
  },
  getStartDate(state){
    return state.startDate;
  },
  getEndDate(state){
    return state.endDate;
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
