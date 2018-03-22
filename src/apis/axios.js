/**
 * Created by Administrator on 2018/2/8.
 */
import axios from "axios";
// import qs from "qs";
// import *  as _ from "../managers/vuex/store";
// import CONFIG from "../main-config";

class AxiosManager {
  constructor(baseUrl) {
    this.http = axios.create({
      baseURL: baseUrl + '/',
      // timeout: 5000,
    });
    this.http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    this.http.interceptors.request.use((config) => {
      // if (config.method === 'post') {
      //   config.data = qs.stringify(config.data);
      //   console.log(config);
      // }
      return config;
    }, (error) => {
      toastr.error("错误的参数", "fail");
    });
    this.http.interceptors.response.use((res) => {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res);
      }
      else {
        console.log(res);
        return Promise.reject(res);
      }
    }, (error) => {
      return Promise.reject(error);
    });

  }

  fetch(type, url, data) {
    return new Promise((resolve, reject) => {
      this.http({
        method: type,
        url: url,
        data: data
      }).then(function (response) {
        resolve(response);
      }, (error) => {
        reject(error);
      }).catch((error) => {
        reject(error);
      });
      // if (type = 'get') {
      //   http.get(url, data).then(response => {
      //     resolve(response);
      //   }, err => {
      //     reject(err);
      //   }).catch((error) => {
      //     reject(error);
      //   })
      // }
      // else {
      //   http.post(url, data).then(response => {
      //     resolve(response);
      //   }, err => {
      //     reject(err);
      //   }).catch((error) => {
      //     reject(error);
      //   })
      // }
    })
  }

  getValidation() {
    return this.fetch('get', 'getValidationCode');
  }

  getEncryption(account) {
    return this.fetch('get', 'getCode?account=' + account);
  }

  login(info) {
    return this.fetch('post', 'login', info);
  }

  useTokenLogin(token) {
    return this.http.get('getAccountByToken', token);
  }

  /**
   * 获取所有已上传项目图片的项目ID
   * @param organizationId
   */
  getProjectIdsExistMap() {
    return this.http.get('projectMap/allProjectMapIds');
  }

  // getProjectsDataForMap(accountId) {
  //   return this.http.get('getProjectsDataForMap/accountId/' + accountId);
  // }

  getAllOrganizationPage() {
    return this.http.get('organization/selectAll');
  }

  /**
   * 获取该账号所属机构的角色id，平台小标题，平台大标题以及平台logo
   *
   * @param accountId
   * @return
   */
  selectOrganizationRoleIdAndLogo(accountId) {
    return this.http.get('organization/selectOrganizationRoleIdAndLogo/' + accountId)
  }

  getProjectPage_R(aid) {
    return this.http.get('projects/list/account/' + aid);
  }

  getProjectById(id) {
    return this.http.get('projects/' + id);
  }

  getAddressByCode(coding) {
    return this.http.get('city/list/' + coding);
  }

  organizationAdd(formDataInfo) {
    return this.http.post('organizations/add', formDataInfo);
  }

  organizationModify(info) {
    return this.http.post('organizations/put', info);
  }

  organizationDelete(ids) {
    return this.http.put('organizations/delete', ids);
  }

  accountAdd(info) {
    return this.http.post('account/add', info);
  }

  accountModify(info) {
    return this.http.post('account/put', info);
  }

  accountUpdateWechatEnabled(info) {
    return this.http.post('/account/updateWechatEnabled', info);
  }

  WeChatAccountAdd(mobile) {
    return this.http.post('WeChatAccount/add/' + mobile);
  }

  accountDelete(ids) {
    return this.http.post('account/delete', ids);
  }

  projectAdd(info, superId, superName) {
    return this.http.post('projects/add?superOrganizationId=' + superId + '&superOrganizationName=' + superName, info);
  }

  projectModify(info, superId, superName) {
    return this.http.post('projects/put?superOrganizationId=' + superId + '&superOrganizationName=' + superName, info);
  }

  projectDelete(ids) {

    return this.http.post('projects/delete', ids);
  }

  monitorItemAdd(info) {
    return this.http.post('monitorItem/add', info);
  }

  /*周期的新增修改
   * */
  insertOrUpdate(info) {
    return this.http.post('itemParam/insertOrUpdate', info);
  }

  pushServerIntemAdd(info) {
    return this.http.post('dataReceiver/add', info);
  }

  monitorItemModify(info) {
    return this.http.put('monitorItem/update', info);
  }

  pushServerItemModify(info) {
    return this.http.put('dataReceiver/update', info);
  }

  monitorItemDelete(ids) {
    return this.http.post('monitorItem/batchDelete', ids);
  }

  /*
   *删除周期
   * */
  deleteById(itemParamId) {
    return this.http.post('itemParam/deleteById?itemParamId=' + itemParamId);
  }

  pushServerItemDelete(ids) {
    return this.http.post('dataReceiver/batchDelete', ids);
  }

  monitorPointAdd(info) {
    return this.http.post('monitorPoint/add', info);
  }

  monitorPointModify(info) {
    return this.http.put('monitorPoint/put', info);
  }

  monitorPointDelete(ids) {
    return this.http.post('monitorPoint/batchDelete', ids);
  }

  checkRecordAdd(formDataInfo) {
    return this.http.post('checkRecords/add', formDataInfo);
  }

  CheckRecordModify(info) {
    return this.http.post('checkRecords/put', info);
  }

  CheckRecordDelete(ids) {
    return this.http.post('checkRecords/batchDelete', ids);
  }

  CheckRecordPicture(id) {
    return this.http.get('checkRecords/picture/' + id);
  }

  alarmParamAdd(info) {
    return this.http.post('alarmTolerance/add', info);
  }

  alarmParamModify(info) {
    return this.http.put('alarmTolerance/update', info);
  }

  alarmParamDelete(id) {
    return this.http.post('alarmTolerance/batchDelete', id);
  }

  alarmParamUpdateOrInsert(info) {
    return this.http.post('alarmTolerance/updateOrInsert', info);
  }

  // getAlarmParamList(itemId) {
  //   return this.http.get('alarmTolerance/getByItemId/' + itemId);
  // }
  getAlarmParamList(itemId, pointId, watchingType) {
    return this.http.get('alarmTolerance/getByItemIdAndPointIdAndType?itemId=' + itemId + '&pointId=' + pointId + '&type=' + watchingType);
  }

  getParamById(mid) {
    return this.http.get('itemParam/getParam?monitorItemId=' + mid);
  }

  getRelAlarmAccountList(projectId, relType) {
    return this.http.get('relAlarmAccount/select/' + projectId + '?relType=' + relType);
  }

  setRelAlarmAccount(projectId, relType, firstRankList, secondRankList, thirdRankList, fourRankList, messageAccountIdList) {
    return this.http.post('relAlarmAccount/put/' + projectId + '/' + relType + '?firstRankList=' + firstRankList + '&secondRankList=' + secondRankList + '&thirdRankList=' + thirdRankList + '&fourRankList=' + fourRankList + '&messageAccountIdList=' + messageAccountIdList);
  }

  relPointAlarmAdd(info) {
    return this.http.post('relMonitorPointTolerance/add', info);
  }

  relPointAlarmModify(info) {
    return this.http.put('relMonitorPointTolerance/update', info);
  }

  getRelPointAlarm(pointid) {
    return this.http.get('alarmTolerance/getRelTolerance/' + pointid);
  }

  getNotRelPointAlarm(pointid, itemId) {
    return this.http.put('alarmTolerance/getNotRelTolerance/' + pointid + '?itemId=' + itemId);
  }

  AlarmMessageModify(config) {
    return this.http.post('alarmMessage/update', config);
  }

  getMonitorItemPage_R(pid) {
    return this.http.get('monitorItem/selectByProjectId/' + pid);
  }

  uploadProjectReportTemplate(projectId, type, formDataInfo) {
    return this.http.post('reportForms/uploadProjectReportTemplate?projectId=' + projectId + '&fileClassification=' + type, formDataInfo);
  }

  getFirstPointOfProject(pid) {
    return this.http.get('monitorPoint/' + pid + '/list');
  }

  /*
   *   根据监测项id查点组
   * */
  getFirstPointGroupOfItem(iid) {
    return this.http.get('monitorPointGroup/monitorItem/' + iid + '/relPointGroup');
  }

  /*
   * 根据点组id查测点
   * */
  getFirstPointOfGroup(gid) {
    return this.http.get('monitorPoint/pointGroup/' + gid + '/relPoint');
  }

  getFirstPointOfItem(iid) {
    return this.http.get('monitorPoint/monitorItem/' + iid + '/relMonitorPoint');
  }

  /**
   * 获取在线的IMC
   */
  getConcurrentIMCList() {
    return this.http.get('collect/getConcurrentClientList');
  }

  /**
   * 项目简图上传
   * @param request
   * @param projectId
   * @return
   * @throws IllegalStateException
   * @throws IOException
   */
  uploadProjectMap(projectId) {
    return this.http.post('projectMap/upload', projectId);
  }

  /**
   * 下载项目地图
   * @param request
   * @param projectId
   * @return
   * @throws Exception
   */
  getMapByProjectId(projectId) {
    return this.http.get('projectMap/getMapByProjectId/' + projectId);
  }

  /**
   * 保存项目图的记录中的信息formData
   * @param request
   * @param itemId pointId
   * @return
   * @throws Exception
   */
  setItemPointParams(formData, itemId, pointId) {
    return this.http.post('projectMap/saveByItemIdPointIdValue?itemId=' + itemId + '&pointId=' + pointId, formData)
  }


  /**
   * 获取项目图的记录中的信息formData
   * @param request
   * @param projectId
   * @return
   * @throws Exception
   */
  getItemPointParams(projectId) {
    return this.http.get('projectMap/selectAllPointInfoByProjectId/' + projectId + '/projectsData');
  }

  /**
   * 获取测点详细信息
   * @param request
   * @param  projectId,pointName,monitorItemId
   * @return
   * @throws Exception
   */
  getDetailsInfo(projectId, pointName, monitorItemId) {
    return this.http.get('projectMap/selectDetailsByProIdAndItemIdAndPointName/' + projectId + '/' + pointName + '/' + monitorItemId)

  }

  //删除项目地图
  deleteProjectMap(projectId) {
    this.http.post('projectMap/deleteByProject/' + projectId)
  }

  /**
   * 监测项与测点关联
   */
  relItemAddPoint(infoIds) {
    return this.http.post('relItemPoint/batchAdd', infoIds);
  }

  relItemRemovePoint(pointIds, itemId) {
    return this.http.post('relItemPoint/batchDelete', pointIds, itemId);
  }

  /**
   * 监测项与测点点组关联
   */
  relItemPointGroupAdd(list) {
    return this.http.post('relItemPointGroup/batchAdd', list);
  }

  relItemPointGroupDelete(pointGroupIds, itemId) {
    return this.http.post('relItemPointGroup/batchDelete', pointGroupIds, itemId);
  }

  /**
   * 文件上传
   * @param formDataInfo
   */
  uploadSystemFile(formDataInfo) {
    return this.http.post('fileInfo/system/upload', formDataInfo);
  }

  uploadOrganizationFile(formDataInfo, orgId) {
    return this.http.post('fileInfo/organization/technicalDoc/upload/' + orgId, formDataInfo);
  }

  fileInfoDelete(info) {
    return this.http.post('fileInfo/deleteFile', info);
  }

  getRelSensorByPoint(pointId) {
    return this.http.get('monitorPoint/' + pointId + '/deviceSensorList');
  }

  getRelTypeByGroup(groupId) {
    return this.http.get('monitorPointGroup/' + groupId + '/relMonitorPointGroup');
  }

  getItemDevicePara(pointId, deviceId) {
    return this.http.get('itemDeviceParam/getByPointAndDevice?pointId=' + pointId + '&deviceId=' + deviceId);
  }

  getPointGroupParams(pointGroupId) {
    return this.http.get('itemPointGroupParam/getPointGroupParams?pointGroupId=' + pointGroupId);
  }

  setItemDevicePara(pointId, deviceId, vdata) {
    return this.http.post('itemDeviceParam/setData?pointId=' + pointId + '&deviceId=' + deviceId, vdata);
  }

  insertOrUpdatePointGroupParam(groupId, vdata) {
    return this.http.post('itemPointGroupParams/pointGroupParams?pointGroupId=' + groupId, vdata);
  }

  /*IMC增改删 start*/
  imcAdd(info) {
    return this.http.post('imc/add', info);
  }

  imcModify(info) {
    return this.http.put('imc/update', info);
  }

  imcDelete(ids) {
    return this.http.post('imc/batchDelete', ids);
  }

  mcuDelete(ids) {
    return this.http.post('mcus/delete', ids);
  }

  /**
   * 获取通道列表 by IMCId 和projectId
   */
  getChannel_IMC_Project(imcId, projectId) {
    return this.http.get('commChannels/list/' + imcId + '/channelListByIMCPro?projectId=' + projectId);
  }

  /***
   * 获取传感器采集状态
   */
  getSensorStatus_IMC_Project(imcId, projectId) {
    return this.http.get('sensors/getSensorCollectState/' + imcId + '/' + projectId);
  }

  /**
   * 获取MCU列表 by IMCId 和 projectId
   * @param imcId
   * @param projectId
   */
  getMcu_IMC_Project(imcId, projectId) {
    return this.http.get('mcus/list/' + imcId + '/ListByIMCAndPro?projectId=' + projectId);
  }

  /***
   * 获取在线MCU(SCT)
   * @param imcId
   */
  getOnlineMcu_IMC(imcId) {
    return this.http.get('mcu/getOnlineTcpSctCollection/' + imcId);
  }

  /*传感器增改删 start*/
  sensorAdd(info) {
    return this.http.post('sensors/add', info);
  }

  sensorModify(info) {
    return this.http.post('sensors/put', info);
  }

  sensorDelete(ids) {
    return this.http.post('sensors/delete', ids);
  }

  // getWaterLevelParam() {
  //     return this.http.get('')
  // }

  // getPointListByProId(projectId) {
  //     return this.http.get('monitorPoint/' + projectId + '/list')
  // }

  // getSensorListByProId(projectId) {
  //     return this.http.get('projects/' + projectId + '/sensors/list');
  // }


  // getAllPointNameOfItem(iid) {
  //     return this.http.get('monitorItem/' + iid + '/relPointNames');
  // }

  // getAllMonitorTypePage() {
  //     return this.http.get('monitorType/selectAll');
  // }

  getDataByPoint_R(variety, pointName, projectId, config) {
    return this.http.post(variety + '/getPageByPointName?pointName=' + pointName + '&projectId=' + projectId, config);
  }

  //
  // getDataByPointAndTime_R(variety, projectId, pointName, startTime, endTime, config) {
  //   return this.http.post(variety + '/getPageByPointsAndTime?projectId=' + projectId + '&pointNames=' + pointName + '&startTime=' + startTime + '&endTime=' + endTime, config);
  // }

  getDataByPointAndTime_R(variety, mark, monitorItemId, projectId, pointName, startTime, endTime, config, itemType) {
    if (mark === 1 || mark === 3) {
      if (itemType === 20) {
        const calculatingType = 1;
        const pointType = 1;
        return this.http.post(variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
          '&projectId=' + projectId + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
          '&startTime=' + startTime + '&endTime=' + endTime, config)
      } else {
        return this.http.post(variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
          '&projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime, config);
      }
    } else {
      if (itemType === 20) {
        const calculatingType = 1;
        const pointType = 1;
        return this.http.post(variety + '/getPageByPointsAndTime?projectId=' + projectId +
          '&pointNames=' + pointName + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
          '&startTime=' + startTime + '&endTime=' + endTime, config);
      } else {
        return this.http.post(variety + '/getPageByPointsAndTime?projectId=' + projectId +
          '&pointNames=' + pointName + '&startTime=' + startTime + '&endTime=' + endTime, config);

      }
    }
  }

  // getRelPointOfItems(iid) {
  //   return this.http.post( +'/monitorPoint/monitorItem/' + iid + '/relMonitorPoint');
  // }

  getMonitorPointPage(pid) {
    return this.http.post(+'/monitorPoint/' + pid + '/list');
  }

  /*根据mark看是根据什么类型查看*/
  getMonitorItemData_R(variety, mark, monitorItemId, projectId, pointName, startTime, endTime, config, itemType) {
    if (mark === 1 || mark === 3) {
      if (itemType === 20) {
        const calculatingType = 1;
        const pointType = 1;
        return this.http.post(variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
          '&projectId=' + projectId + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
          '&startTime=' + startTime + '&endTime=' + endTime, config)
      } else {
        return this.http.post(variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
          '&projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime, config);
      }
    } else {
      if (itemType === 20) {
        const calculatingType = 1;
        const pointType = 1;
        return this.http.post(variety + '/getPageByPointsAndTime?projectId=' + projectId +
          '&pointNames=' + pointName + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
          '&startTime=' + startTime + '&endTime=' + endTime, config);
      } else {
        return this.http.post(variety + '/getPageByPointsAndTime?projectId=' + projectId +
          '&pointNames=' + pointName + '&startTime=' + startTime + '&endTime=' + endTime, config);

      }
    }
  }

  getMonitorItemShowConf(info) {
    return this.http.post('monitorItemShowConf/insertOrUpdate', info);
  }

  selectConfigNamesR(projectId, monitorItemId) {
    return this.http.get('monitorItemShowConf/select?projectId=' + projectId + '&monitorItemId=' + monitorItemId + '&random=' + Math.random());
  }

  //混凝土根据点组查询
  getMonitorItemDataC_R(variety, mark, monitorItemId, projectId, pointGroupNames, startTime, endTime, config) {
    if (mark === 1 || mark === 3) {
      return this.http.post(variety + '/getPageByAllPointGroupsIdAndTime?monitorItemId=' + monitorItemId +
        '&projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime, config);
    } else {
      return this.http.post(variety + '/getPageByPointGroupsAndTime?projectId=' + projectId +
        '&pointGroupNames=' + pointGroupNames + '&startTime=' + startTime + '&endTime=' + endTime, config);
    }
  }

  /*根据点组Id获取测斜数据*/
  getMonitorGroupIdData_R(variety, mark, monitorGroupId, projectId, startTime, endTime, config) {
    if (mark >= 5) {
      return this.http.post(variety + '/getPageByMonitorGroupIdAndTime?monitorGroupId=' + monitorGroupId +
        '&projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime, config);
    }

  }

  /**
   * 根据监测项查询其下所有测点的传感器数据
   */
  getPageByMonitorItemIdAndTime(monitorItemId, projectId, startTime, endTime) {
    return this.http.post('dataSensor/getPageByMonitorItemIdAndTime', monitorItemId, projectId, startTime, endTime);
  }

  /***
   * 全站仪数据
   */
  getMeasureData(variety, mark, projectId, monitorItemId, pointName, calculatingType, pointType, startTime, endTime, config) {
    if (mark === 1 || mark === 3) {
      return this.http.post(variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
        '&projectId=' + projectId + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
        '&startTime=' + startTime + '&endTime=' + endTime, config)
    } else {
      return this.http.post(variety + '/getPageByPointsAndTime?projectId=' + projectId +
        '&pointNames=' + pointName + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
        '&startTime=' + startTime + '&endTime=' + endTime, config);
    }
  }

  /***
   * 获取报表数据(全站仪模板)
   */
  getReportDataList(projectId, monitorItemId, monitorType, startTime, endTime, controlValueAcc, controlValueRate, alarmClass, type, config) {
    return this.http.post('reportData/list?projectId=' + projectId + '&monitorItemId=' + monitorItemId + '&monitorType=' + monitorType +
      '&startTime=' + startTime + '&endTime=' + endTime + '&controlValueAcc=' + controlValueAcc + '&controlValueRate=' + controlValueRate +
      '&alarmClass=' + alarmClass + '&type=' + type, config)
  }

  /*数据人工上传*/
  uploadByHand(request, projectId, monitorItemId) {
    return this.http.post('uploadDataByHand?projectId=' + projectId + '&monitorItemId=' + monitorItemId, request);
  }

  createReportData(reportFormType, projectId, projectName, startTime, endTime, totalStationPeriodNo, referencePeriodNo) {
    return this.http.post('reportForms/createReport?reportFormType=' + reportFormType +
      '&projectId=' + projectId + '&projectName=' + projectName + '&startTime=' + startTime +
      '&endTime=' + endTime + '&totalStationPeriodNo=' + totalStationPeriodNo + '&referencePeriodNo=' + referencePeriodNo);
  }

  /**
   * 根据项目id 起始时间 获取周期号（当前测量周期）
   */
  getThisPeriodNo(projectId, startTime, endTime) {
    return this.http.get('measureData/getPeriodNoByProjectIdAndTime?projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime);
  }

  /**
   * 根据项目id 起始时间（后台将起始时间减一周） 获取周期号（上一测量周期）
   */
  getLastPeriodNo(projectId, startTime, endTime) {
    return this.http.get('measureData/getLastPeriodNoByProjectIdAndTime?projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime);
  }

}
const Factory = {
  getAxiosManager(baseUrl){
    return new AxiosManager(baseUrl);
  }
}
export default Factory;
// var http = axios.create({
//   // baseURL: 'http://112.74.205.248:8400/api/',
//   baseURL: CONFIG.baseUrl + '/',
//   // timeout: 5000,
// });
// // http.default.timeout = 5000;
// // http.default.baseURL = 'http://112.74.205.248:8400/api';//'http://localhost:8201/'
// // http.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//
// // http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//
// http.interceptors.request.use((config) => {
//   // if (config.method === 'post') {
//   //   config.data = qs.stringify(config.data);
//   //   console.log(config);
//   // }
//   return config;
// }, (error) => {
//   _.toast("错误的参数", "fail");
// });
// http.interceptors.response.use((res) => {
//   if (!res.data) {
//     return Promise.reject(res);
//   }
//   return res;
// }, (error) => {
//   return Promise.reject(error);
// });
// export function fetch(type, url, data) {
//   return new Promise((resolve, reject) => {
//     http({
//       method: type,
//       url: url,
//       data: data
//     }).then(function (response) {
//       resolve(response);
//     }, (error) => {
//       reject(error);
//     }).catch((error) => {
//       reject(error);
//     });
//     // if (type = 'get') {
//     //   http.get(url, data).then(response => {
//     //     resolve(response);
//     //   }, err => {
//     //     reject(err);
//     //   }).catch((error) => {
//     //     reject(error);
//     //   })
//     // }
//     // else {
//     //   http.post(url, data).then(response => {
//     //     resolve(response);
//     //   }, err => {
//     //     reject(err);
//     //   }).catch((error) => {
//     //     reject(error);
//     //   })
//     // }
//   })
// }
// export default {
//   getValidation() {
//     return fetch('get', 'getValidationCode');
//   },
//   getEncryption(account) {
//     return fetch('get', 'getCode?account=' + account);
//   },
//   login(info){
//     return fetch('post', 'login', info);
//   }
// }
