/**
 * Created by Administrator on 2018/2/8.
 */
import axios from "axios";
import qs from "qs";
import *  as _ from "../vuex/store";

axios.default.timeout = 5000;
axios.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.default.baseURL = 'http://localhost:8201/';

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  _.toast("错误的参数", "fail");
})
