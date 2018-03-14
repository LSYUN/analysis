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
  setItemObj1(state, obj){
    state.itemObj1 = obj;
  },
  setItemObj2(state, obj){
    state.itemObj2 = obj;
  },
  setPointObj1(state, obj){
    state.pointObj1 = obj;
  },
  setPointObj2(state, obj){
    state.pointObj2 = obj;
  },
  setRequest(state, obj){
    state.request = obj;
  },
  setStartDate(state, obj){
    state.startDate = obj;
  },
  setEndDate(state, obj){
    state.endDate = obj;
  },
};
const actions = {
  setItemObj1({commit}, obj){
    commit(['ITEM_OBJ_1'], obj);
  },
  setItemObj2({commit}, obj){
    commit(['ITEM_OBJ_2'], obj);
  },
  setPointObj1({commit}, obj){
    commit(['POINT_OBJ_1'], obj);
  },
  setPointObj2({commit}, obj){
    commit(['POINT_OBJ_2'], obj);
  },
  setRequest({commit}, obj){
    commit(['ITEM_OPTION'], obj);
  },
  setStartDate({commit}, obj){
    commit(['START_DATE'], obj);
  },
  setEndDate({commit}, obj){
    commit(['END_DATE'], obj);
  },
};
const getters = {
  getItemObj1(state){
    return state.itemObj1;
  },
  getItemObj2(state){
    return state.itemObj2;
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
