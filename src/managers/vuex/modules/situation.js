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
  itemOption: {
    mark:'',
    url:'',

  },
  startDate: {},
  endDate: {},
  dateCheck: false,
  pointCheck: false
};
const mutations = {
  ['ITEM_OBJ_1'](state, obj){
    state.itemObj1 = obj;
  },
  ['ITEM_OBJ_2'](state, obj){
    state.itemObj2 = obj;
  },
  ['POINT_OBJ_1'](state, obj){
    state.pointObj1 = obj;
  },
  ['POINT_OBJ_2'](state, obj){
    state.pointObj2 = obj;
  },
  ['ITEM_OPTION'](state, obj){
    state.itemOption = obj;
  },
  ['START_DATE'](state, obj){
    state.startDate = obj;
  },
  ['END_DATE'](state, obj){
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
  setItemOption({commit}, obj){
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
  itemObj1: state => state.itemObj1,
  // getItemObj1({commit}, obj){
  //   commit(['ITEM_OBJ_1'], obj);
  // },
  // getItemObj2({commit}, obj){
  //   commit(['ITEM_OBJ_2'], obj);
  // },
  // getPointObj1({commit}, obj){
  //   commit(['POINT_OBJ_1'], obj);
  // },
  // getPointObj2({commit}, obj){
  //   commit(['POINT_OBJ_2'], obj);
  // },
  // getItemOption({commit}, obj){
  //   commit(['ITEM_OPTION'], obj);
  // },
  // getStartDate({commit}, obj){
  //   commit(['START_DATE'], obj);
  // },
  // getEndDate({commit}, obj){
  //   commit(['END_DATE'], obj);
  // },
};

export default {
  state,
  mutations,
  actions,
  getters
}
