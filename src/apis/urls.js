/**
 * Created by Administrator on 2018/2/23.
 */
class UrlManager {
  constructor(baseUrl) {
    this.http = baseUrl;
  }

  getProjectPage_U(aid) {
    return this.http + '/projects/list/account/' + aid;
  }

  getOrganizationsPage() {
    return this.http + '/organizations/list';
  }

  getSuperOrganizationsPage(aid) {
    return this.http + '/organization/selectAllSuperOrganizationExceptOwn/' + aid;
  }

  getAccountOfOrganizationPage(aid) {
    return this.http + '/account/list/accountid/' + aid;
  }

  getProvincePage(rank) {
    return this.http + '/city/selectByRank/' + rank;
  }

  getCityOrCountryPage(parent) {
    return this.http + '/city/selectByParentCoding/' + parent;
  }

  getAddressByCoding(coding) {
    return this.http + '/city/list/' + coding;
  }

  /**
   * 根据项目id 起始时间 获取周期号（当前测量周期）
   */
  getPeriodNoByProjectIdAndTime(projectId, startTime, endTime) {
    return this.http + '/measureData/getPeriodNoByProjectIdAndTime?projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime;
  }

  /**
   * 根据项目id 起始时间（后台将起始时间减一周） 获取周期号（上一测量周期）
   */
  getLastPeriodNoByProjectIdAndTime(projectId, startTime, endTime) {
    return this.http + '/measureData/getLastPeriodNoByProjectIdAndTime?projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime;
  }

  getMonitorItemPage_U(pid) {
    return this.http + '/monitorItem/selectByProjectId/' + pid;
  }

  uploadDataByHand(pid) {
    return this.http + '/monitorItem/uploadDataByHand?projectId=' + pid;
  }

  getVdataByMonitorItemId(mid) {
    return this.http + '/itemParam/getVdata?monitorItemId=' + mid;
  }

  // getParamById(mid) {
  //   return this.http + '/itemParam/getParam?monitorItemId=' + mid;
  // }


  selectConfigNamesU(projectId, monitorItemId) {
    return this.http + '/monitorItemShowConf/select?projectId=' + projectId + '&monitorItemId=' + monitorItemId + '&random=' + Math.random();
  }


  /* //查询监测项下的所有预警信息
   // selectByProjectId(pid){ getMonitorItemShowConf(info){
   // return this.http +'/monitorItemShowConf/insertOrUpdate'+info;
   // }
   return this.http + '/alarmMessage/selectByProjectId/' + pid;
   }*/
  getDataReceiverPage(pid) {
    return this.http + '/dataReceiver/selectByProjectId/' + pid;
  }

  getMonitorItemAndMsgQueryPage(pid) {
    return this.http + '/monitorItem/dataQueryMonitorItemByProjectId/' + pid;
  }

  getMonitorTypePage() {
    return this.http + '/monitorType/selectAll';
  }

  getRelPointOfItems(iid) {
    return this.http + '/monitorPoint/monitorItem/' + iid + '/relMonitorPoint';
  }

  getIMCListByProject(projectId) {
    return this.http + '/imc/selIMClist/' + projectId;
  }

  getMcuPage(imcId, projectId) {
    return this.http + '/mcus/list/' + imcId + '/ListByIMCAndPro?projectId=' + projectId;
  }

  getListByIMCAndPro(imcId, projectId) {
    return this.http + '/mcus/list/' + imcId + '/ListByIMCAndPro?projectId=' + projectId;
  }

  getSensorPage(imcId, projectId) {
    return this.http + '/sensors/list/' + imcId + '/listByIMCAndPro?projectId=' + projectId;
  }

  getSensorCollectState(imcId, projectId) {
    return this.http + '/sensors/getSensorCollectState/' + imcId + '/' + projectId;
  }

  getChannelPage(imcId, projectId) {
    return this.http + '/commChannels/list/' + imcId + '/channelListByIMCPro?projectId=' + projectId;
  }

  /*
   * 根据监测项id查点组
   * */
  selectItemRelMonitorPointGroup(iid) {
    return this.http + '/monitorPointGroup/monitorItem/' + iid + '/relPointGroup'
  }

  /*根据点组id去查测点*/
  selectByGroupIdPoint(gid) {
    return this.http + '/monitorPoint/pointGroup/' + gid + '/relPoint'
  }

  getUnRelPointOfItems(iid) {
    return this.http + '/monitorPoint/monitorItem/' + iid + '/notRelMonitorPoint';
  }

  selectItemNotRelMonitorPointGroup(iid) {
    return this.http + '/monitorPointGroup/monitorItem/' + iid + '/notRelPointGroup';
  }

  getRelSensorByPointURL(pointId) {
    return this.http + '/monitorPoint/' + pointId + '/deviceSensorList';
  }

  getRealTimePageByItem(iid) {
    return this.http + '/realtimeData/list/' + iid;
  }

  getRealTimePageByProject(pid) {
    return this.http + '/realtimeData/info/' + pid;
  }

  getCheckRecordPage(projectId) {
    return this.http + '/checkRecords/selectByProjectId/' + projectId;
  }

  getNotRelAlarmTolerance(pointId, itemId) {
    return this.http + '/alarmTolerance/getNotRelTolerance/' + pointId + '?itemId=' + itemId;
  }

  getDataByPoint_U(variety, pointName, projectId) {
    return this.http + '/' + variety + '/getPageByPointName?pointName=' + pointName + '&projectId=' + projectId;
  }

  getDataByPointAndTime_U(variety, projectId, pointName, startTime, endTime) {
    return this.http + '/' + variety + '/getPageByPointsAndTime?projectId=' + projectId + '&pointNames=' + pointName + '&startTime=' + startTime + '&endTime=' + endTime;
  }

  getSensorCollectState(imcId, projectId) {
    return this.http + '/sensors/getSensorCollectState/' + imcId + '/' + projectId;
  }

  getMonitorItemData_U(variety, mark, monitorItemId, projectId, pointName, startTime, endTime) {
    if (mark === 1 || mark === 3 || mark === 5 || mark === 7) {
      return this.http + '/' + variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
        '&projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime;
    } else {
      return this.http + '/' + variety + '/getPageByPointsAndTime?projectId=' + projectId +
        '&pointNames=' + pointName + '&startTime=' + startTime + '&endTime=' + endTime;
    }
  }

  //混凝土支撑监测项
  getMonitorItemDataC_U(variety, mark, monitorItemId, projectId, pointGroupNames, startTime, endTime) {
    if (mark === 1 || mark === 3) {
      return this.http + '/' + variety + '/getPageByAllPointGroupsIdAndTime?monitorItemId=' + monitorItemId +
        '&projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime;
    } else {
      return this.http + '/' + variety + '/getPageByPointGroupsAndTime?projectId=' + projectId +
        '&pointGroupNames=' + pointGroupNames + '&startTime=' + startTime + '&endTime=' + endTime;
    }
  }

  //全站仪
  getMeasureDataByPointAndTime_U(variety, mark, monitorItemId, projectId, pointName, calculatingType, pointType, startTime, endTime) {
    if (mark === 1 || mark === 3) {
      return this.http + '/' + variety + '/getPageByMonitorItemIdAndTime?monitorItemId=' + monitorItemId +
        '&projectId=' + projectId + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
        '&startTime=' + startTime + '&endTime=' + endTime;
    } else {
      return this.http + '/' + variety + '/getPageByPointsAndTime?projectId=' + projectId +
        '&pointNames=' + pointName + '&calculatingType=' + calculatingType + '&pointType=' + pointType +
        '&startTime=' + startTime + '&endTime=' + endTime;
    }
  }

  getMessageByPointAndTime_U(variety, projectId, startTime, endTime) {
    return this.http + '/' + variety + '/getByProjectIdAndTime?projectId=' + projectId + '&startTime=' + startTime + '&endTime=' + endTime;
  }

  getStationCoordCheck(projectId) {
    return this.http + '/stationCoordCheck/list/projectId/' + projectId;
  }

  /***
   * 系统文件列表
   * @returns {string}
   */
  getSystemFileList() {
    return this.http + '/fileInfo/system/technicalDoc';
  }

  /***
   * 机构文件列表
   * @returns {string}
   */
  getOrganizationFileList(relId) {
    return this.http + '/fileInfo/organization/technicalDoc/' + relId;
  }

  /*
   * 上传报表模板列表
   * */
  getProjectReportTemplate(projectId) {
    return this.http + '/reportForms/getProjectReportTemplate/' + projectId;
  }

  downloadFiles(id, name, refId, fileExtensions, fileRank, fileClassification) {
    return this.http + '/fileInfo/downloadFile?id=' + id + '&name=' + name + '&refId=' + refId + '&fileExtensions=' + fileExtensions +
      '&fileRank=' + fileRank + '&fileClassification=' + fileClassification;
  }

  getCheckRecordPicture(id) {
    return this.http + '/checkRecords/picture/' + id;
  }

  /**
   * 测点点组与监测项的关联
   */
  getRelItemPointGroup(itemId) {
    return this.http + '/monitorPointGroup/monitorItem/' + itemId + '/relPointGroup';
  }

  getNotRelItemPointGroup(itemId) {
    return this.http + '/monitorPointGroup/monitorItem/' + itemId + '/notRelPointGroup';
  }

  /**
   * 获取预警信息
   * @param projectId
   * @returns {string}
   */

  getAlarmMessage(projectId) {
    return this.http + '/alarmMessage/selectByProjectId/' + projectId;
  }

  /**
   * 通过项目Id获取指定项目的项目图
   * @param projectId
   * @returns {string}
   */
  getProjectMap(projectId) {
    return this.http + '/projectMap/getMapByProjectId/' + projectId;
  }

  createReport(reportFormType, reportFormTemplate, projectId, projectName, startTime, endTime) {
    return this.http + '/reportForms/createReport?reportFormType=' + reportFormType +
      '&reportFormTemplate=' + reportFormTemplate + '&projectId=' + projectId + '&projectName=' + projectName +
      '&startTime=' + startTime + '&endTime=' + endTime;
  }

  // createReportData(reportFormType, projectId, projectName, startTime, endTime, totalStationPeriodNo,referencePeriodNo) {
  //   return this.http + '/reportForms/createReport?reportFormType=' + reportFormType +
  //       '&projectId=' + projectId + '&projectName=' + projectName + '&startTime=' + startTime +
  //       '&endTime=' + endTime + '&totalStationPeriodNo=' + totalStationPeriodNo+'&referencePeriodNo=' +referencePeriodNo;
  // }
  createReportData() {
    return this.http + '/reportForms/createReport';
  }

  /**
   * 根据用户ID获取报表列表
   * @param accountId
   * @returns {string}
   */
  reportFormList(accountId) {
    return this.http + '/fileInfo/reportFormList/' + accountId;
  }

  downloadProjectFiles(id, name, refId, fileExtensions, fileClassification) {
    return this.http + '/fileInfo/download/projectFiles?id=' + id +
      '&name=' + name + '&refId=' + refId + '&fileExtensions=' + fileExtensions + '&fileClassification=' + fileClassification;
  }

  /***
   * 下载报表(单个监测项)
   * @returns {string}
   */
  getReportExport() {
    return this.http + '/reportData/export/excel';
  }

  /**
   * 下载报表（整个项目）
   */
  getProjectReport() {
    return this.http + '/reportForms/createReport';
  }
}
class WsUrlManager {
  constructor(wsRoot) {
    this.wsRoot = wsRoot;
  }

  /***
   * 通过指定项目Id，获取该项目的实时数据和消息提示
   * @param projectId
   * @returns {string}
   */
  getRealDataWebSockPage(projectId) {
    // return this.wsRoot + '/project/' + projectId + '/message.do';
    return this.wsRoot + '/websockServer/@all/' + projectId + '/message.do';
  }
}
const Factory = {
  getUrlManager (http) {
    return new UrlManager(http);
  },
  getWsUrlManager(wsRoot){
    return new WsUrlManager(wsRoot)
  }
};
export default Factory;
