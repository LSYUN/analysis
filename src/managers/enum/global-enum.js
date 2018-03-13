/**
 * Created by Administrator on 2017/11/2.
 */
const GlobalEnum = {
  projectTypes: [
    {value: 0, text: '基坑施工'},
    {value: 1, text: '地铁运营监测'},
    {value: 2, text: '地铁隧道基坑监测'},
    {value: 3, text: '高支模监测'},
    {value: 4, text: '边坡工程'},
    {value: 5, text: '桥梁工程'},
    {value: 6, text: '滑坡地质灾害监测'},
    {value: 99, text: '其他'}
  ],
  workStates: [
    {value: 0, text: '监测中'},
    {value: 1, text: '禁止施工'},
    {value: 2, text: '竣工'}
  ],
  monitorTypes: [
    {value: 1, text: '水位'},
    {value: 2, text: '内部位移'},
    {value: 3, text: '支撑轴力'},
    {value: 4, text: '锚索'},
    {value: 5, text: '降雨量'},
    {value: 6, text: '裂缝'},
    {value: 7, text: '表面位移(GPS)'},
    {value: 8, text: '干滩'},
    {value: 9, text: '浸润线'},
    {value: 10, text: '浊度'},
    {value: 11, text: '渗流量'},
    {value: 12, text: '压力'},
    {value: 13, text: '应力'},
    {value: 14, text: '土壤水分'},
    {value: 15, text: '水准高程'},
    {value: 16, text: '混凝土支撑'},
    {value: 17, text: '压强'},
    {value: 18, text: 'PH'},
    {value: 19, text: '内部沉降'},
    {value: 20, text: '全站仪位移监测'},
    {value: 21, text: '应变'},
    {value: 50, text: '原始数据'},
  ],
};
export default GlobalEnum;
