/**
 * Created by Administrator on 2018/2/8.
 */
import Vue from "vue";
import Vuex from "vuex";

import navigation from "./modules/navigation";
import listInfo from "./modules/list-info";
import situation from "./modules/situation.js";
import table from "./modules/table.js";

// import user from './modules/user'
// import sport from './modules/sport'
// import travel from './modules/travel'
// import detail from './modules/detail'
// import com from './modules/com'

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  //   lsy: 'lushiyun'
  // }
  modules: {
    nav: navigation,
    listInfo,
    situation,
    table
    // a: common
  }
})
