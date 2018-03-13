/**
 * Created by Administrator on 2018/2/24.
 */
import AxiosManager from "./apis/axios";
import UrlManager from "./apis/urls";
/**
 * baseUrl:dx.server后台url
 * wsUrl:webScok url
 * alarmUrl:预警消息服务URl
 * redirectUrl:token失效等情况下路由重定向URl
 * enterprise:企业类型（决定登录页面标题名称）
 * avatar:头像
 * companyLogo企业logo
 * title企业大标题
 * //const alarmUrl = 'http://183.233.190.96:8700/api';//131服务器
 */
/***
 * 1:本地测试
 * 2:阿里云服务
 * 3:湖南湘银河
 * 4:贵州花溪
 * 5:单机版
 * 6:南通服务器
 * @type {*}
 * 长沙水渡河 于 webFrontMini 项目
 */
// const type = 1;
const type = 2;
// const type = 3;
// const type = 4;
// const type = 5;
// const type = 6;
function deploys(type) {
  var baseUrl, wsUrl, alarmUrl, redirectUrl, enterprise, avatar, companyLogo, welcomeL, title;
  switch (type) {
    case 1:/*本地测试*/
      baseUrl = 'http://127.0.0.1:8201/api';//本地测试
      wsUrl = 'ws://127.0.0.1:8201/api';//本地测试
      alarmUrl = 'http://127.0.0.1:8200/api';//本地测试
      redirectUrl = 'http://127.0.0.1:8080/#!/login';//阿里云前端地址
      // redirectUrl = 'http://112.74.205.248:8600/#!/login';//阿里云前端地址
      enterprise = require('./assets/enterprises/enterprise-dt.png');
      avatar = require('./assets/avatars/avatar-dt.jpg');
      companyLogo = require('./assets/companyLogo/qrcode_258.png');
      welcomeL = '欢迎';
      title = '云监测分析平台';
      break;
    case 2:/*阿里云服务*/
      baseUrl = 'http://112.74.205.248:8400/api';//阿里云服务器
      wsUrl = 'ws://112.74.205.248:8400/api';//阿里云服务器
      alarmUrl = 'http://112.74.205.248:8700/api'; //阿里云服务器
      redirectUrl = 'http://112.74.205.248:8600/#!/login'; //阿里云前端地址
      enterprise = require('./assets/enterprises/enterprise-dt.png');
      avatar = require('./assets/avatars/avatar-dt.jpg');
      companyLogo = require('./assets/companyLogo/qrcode_258.png');
      welcomeL = '欢迎';
      title = '云监测分析平台';
      break;
    case 3:/*湖南湘银河*/
      baseUrl = 'http://222.244.145.16:8500/api';//湘银河服务器
      wsUrl = 'ws://222.244.145.16:8500/api';//湘银河服务器
      alarmUrl = 'http://222.244.145.16:8503/api';//湘银河服务器
      redirectUrl = 'http://222.244.145.16:8502/#!/login';//湘银河
      enterprise = require('./assets/enterprises/enterprise-dt.png');
      avatar = require('./assets/avatars/avatar-xyh.png');
      companyLogo = require('./assets/companyLogo/xiangyinhe.png');
      welcomeL = '湘银河科技欢迎';
      title = '云监测分析平台';
      break;
    case 4:/*贵州花溪*/
      baseUrl = 'http://112.74.205.248:8400/api';//阿里云服务器
      wsUrl = 'ws://112.74.205.248:8400/api';//阿里云服务器
      alarmUrl = 'http://112.74.205.248:8700/api';//阿里云服务器
      redirectUrl = 'http://112.74.205.248:9600/#!/login';//阿里云前端地址
      enterprise = require('./assets/enterprises/enterprise-gz.png');
      avatar = require('./assets/avatars/avatar-dt.jpg');
      companyLogo = require('./assets/companyLogo/qrcode_258.png');
      welcomeL = '欢迎';
      title = '云监测分析平台';
      break;
    case 5:/*单机版*/
      baseUrl = 'http://127.0.0.1:8400/api';//单机版
      wsUrl = 'ws://127.0.0.1:8400/api';//单机版
      alarmUrl = 'http://112.74.205.248:8700/api';//阿里云服务器
      redirectUrl = 'http://127.0.0.1:8600/#!/login';//单机版
      enterprise = require('./assets/enterprises/enterprise-dt.png');
      avatar = require('./assets/avatars/avatar-dt.jpg');
      companyLogo = require('./assets/companyLogo/qrcode_258.png');
      welcomeL = '欢迎';
      title = '云监测分析平台';
      break;
    case 6:/*南通单机版*/
      baseUrl = 'http://58.221.12.130:8400/api';
      wsUrl = 'ws://58.221.12.130:8400/api';
      alarmUrl = 'http://112.74.205.248:8700/api';//阿里云服务器
      redirectUrl = 'http://58.221.12.130:8600/#!/login';
      enterprise = require('./assets/enterprises/enterprise-dt.png');
      avatar = require('./assets/avatars/avatar-dt.jpg');
      companyLogo = require('./assets/companyLogo/qrcode_258.png');
      welcomeL = '欢迎';
      title = '云监测分析平台';
      break;
  }
  return {baseUrl, wsUrl, alarmUrl, redirectUrl, enterprise, avatar, companyLogo, welcomeL, title};
}

class Config {
  constructor(http, url, wsUrl, alarmUrl, redirectUrl, enterprise, avatar, companyLogo, welcomeL, title) {
    this.http = http;
    this.url = url;
    this.wsUrl = wsUrl;
    this.alarmUrl = alarmUrl;
    this.redirectUrl = redirectUrl;
    this.enterprise = enterprise;
    this.avatar = avatar;
    this.companyLogo = companyLogo;
    this.welcomeL = welcomeL;
    this.title = title;
  }
}
const getConfig = function () {
  var deploy = deploys(type);
  const http = AxiosManager.getAxiosManager(deploy.baseUrl);
  const url = UrlManager.getUrlManager(deploy.baseUrl);
  const wsUrl = UrlManager.getWsUrlManager(deploy.wsUrl);
  const alarmUrl = deploy.alarmUrl;
  const redirectUrl = deploy.redirectUrl;
  const enterprise = deploy.enterprise;
  const avatar = deploy.avatar;
  const companyLogo = deploy.companyLogo;
  const welcomeL = deploy.welcomeL;
  const title = deploy.title;
  return new Config(http, url, wsUrl, alarmUrl, redirectUrl, enterprise, avatar, companyLogo, welcomeL, title);
};
export default getConfig();
