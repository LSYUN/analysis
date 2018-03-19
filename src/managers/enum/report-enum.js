/**
 * Created by Administrator on 2017/12/19.
 */
/**
 * Created by Administrator on 2017/11/2.
 */
class Enum {
  static getReportConfig(itemType, prop) {
    // console.log(itemType, prop);
    let options = {};
    let waterLevel = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueLevel', '水位值(m)', [1, 1]],
          ['changeLevel', '变化值(m)', [1, 1]],
          ['dtime', '测量时间', [1, 1]]],
        tableDesc: [null, [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '水位', en: 'waterLevel'}]
      },
      inDisplacement = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueOffsetX', '本次位移(mm)', [1, 1]],
          ['accumulationOffsetX', '累计位移(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '内部位移', en: 'inDisplacement'}]
      },
      brace = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueBrace', '实测轴力值', [1, 1]],
          ['changeBrace', '轴力单次变化', [1, 1]],
          ['accumulationBrace', '轴力累积变化', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '轴力', en: 'brace'}]
      },
      ombrometer = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueHour', '小时内累计雨量(mm)', [1, 1]],
          ['valueDay', '当天累计雨量(mm)', [1, 1]],
          ['valueMonth', '月内累计雨量(mm)', [1, 1]],
          ['valueYear', '年内累计雨量(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '降雨量', en: 'ombrometer'}]
      },
      joint = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueOffset', '测量值(mm)', [1, 1]],
          ['changeOffset', '单次变化量(mm)', [1, 1]],
          ['accumulationOffset', '累计变化量(mm)', [1, 1]],
          ['baseValue', '初始位移(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '裂缝', en: 'joint'}]
      },
      Gps = {
        tableHead: [
          ['pointName', '测点', [1, 1]],
          ['smoothRoverX', '坐标X(m)', [1, 1]],
          ['smoothRoverY', '坐标Y(m)', [1, 1]],
          ['smoothRoverZ', '坐标Z(m)', [1, 1]],
          ['smoothGapX', '∆X(mm)', [1, 1]],
          ['smoothGapY', '∆Y(mm)', [1, 1]],
          ['smoothGapZ', '∆Z(mm)', [1, 1]],
          ['smoothX', '∑X(mm)', [1, 1]],
          ['smoothY', '∑X(mm)', [1, 1]],
          ['smoothZ', '∑Z(mm)', [1, 1]],
          ['dtime', '测量时间', [1, 1]],],
        chart: [],
        tableDesc: [null, [4], [4], [4], [2], [2], [2], [2], [2], [2], null],
        sheetName: [{ch: 'GPS', en: 'Gps'}]
      },
      dryShoal = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['shoalLength', '干滩长度(m)', [1, 1]],
          ['waterLevelValue', '水位(m)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '干滩', en: 'dryShoal'}]
      },
      saturationLine = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['waterLevelValue', '水位(m)', [1, 1]],
          ['pressureValue', '压强(KPa)', [1, 1]],
          ['satLineDepth', '空管距离(m)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [4], [4], [4], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '浸润线', en: 'saturationLine'}]
      },
      turbidity = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['turbidityValue', '测量值(NTU)', [1, 1]],
          ['changeValue', '单次变化量(NTU)', [1, 1]],
          ['addChangeValue', '累计变化量(NTU)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '浊度', en: 'turbidity'}]
      },
      seepage = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueSeepage', '渗流量(m³/h)', [1, 1]],
          ['changeVal', '本次变化量', [1, 1]],
          ['addChangeVal', '累计变化量', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [4], [4], [4], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '渗流量', en: 'seepage'}]
      },
      stress = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['groupName', '所属组编号', [1, 1]],
          ['valueStress', '压力计算值', [1, 1]],
          ['changStress', '单次变化量', [1, 1]],
          ['accumulationStress', '累计变化量', [1, 1]],
          ['originalModule', '初始模数值', [1, 1]],
          ['prmK', '参数K', [1, 1]],
          ['baseModule', '首测模数', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, null, null, [2], [2], null, null, null, null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '压力', en: 'stress'}]
      },
      strain = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueOffset', '测量值(mm)', [1, 1]],
          ['changeOffset', '单次变化量(mm)', [1, 1]],
          ['accumulationOffset', '累计变化量(mm)', [1, 1]],
          ['baseValue', '初始位移(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '应力', en: 'strain'}]
      },
      soilMoisture = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueOffset', '测量值(mm)', [1, 1]],
          ['changeOffset', '单次变化量(mm)', [1, 1]],
          ['accumulationOffset', '累计变化量(mm)', [1, 1]],
          ['baseValue', '初始位移(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '土壤水分', en: 'soilMoisture'}]
      },
      waterElevation = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['baseVal', '基准值(m)', [1, 1]],
          ['realVal', '实测值(m)', [1, 1]],
          ['changeVal', '单次变化(mm)', [1, 1]],
          ['relativeChangeVal', '单次变化(相对基准点)(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [4], [5], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '高程水准', en: 'waterElevation'}]
      },
      concreteBrace = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueBrace', '实测轴力值(MPa)', [1, 1]],
          ['changeBrace', '单次变化(KN)', [1, 1]],
          ['accumulationBrace', '累积变化(KN)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '压强', en: 'concreteBrace'}]
      },
      pressure = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['realVal', '实测值(Pa)', [1, 1]],
          ['pressureValue', '计算值(Pa)', [1, 1]],
          ['changeValue', '单次变化量(Pa)', [1, 1]],
          ['accumulationValue', '累计变化量(Pa)', [1, 1]],
          ['originalPressure', '初始读数(Pa)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [4], [4], [4], [4], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '压力', en: 'pressure'}]
      },
      ph = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['phValue', 'PH值', [1, 1]],
          ['changeValue', '单次变化量', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [4], [4], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: 'ph', en: 'ph'}]
      },
      inSettlement = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['valueOffset', '本次位移(mm)', [1, 1]],
          ['accumulationOffset', '累计位移(mm)', [1, 1]],
          ['changeOffset', '单次变化量(mm)', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, [2], [2], [2], null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '内部沉降', en: 'inSettlement'}]
      },
      totalStation = {
        tableHead: [
          ['pointName', '测点', [2, 1]],//第三个元素(数组)用于table head的col ,row 的渲染
          ['initValue', '初始值(mm)', [2, 1]],
          ['lastAccChange', '上次累计变化量(mm)', [2, 1]],
          ['thisAccChange', '本次累计变化量(mm)', [2, 1]],
          ['changeDif', '本次变化量(mm)', [2, 1]],
          ['changeRate', '变化速率(mm/d)', [2, 1]],
          ['controlValueAcc', '预警累计变化值(mm)', [1, 1]],
          ['controlValueRate', '预警变化速率值(mm/d)', [1, 1]],
          // [null, '预警值', [1, 2], [
          //   ['controlValueAcc', '累计变化值(mm)', [1, 1]],
          //   ['controlValueRate', '变化速率值(mm/d)', [1, 1]]]],
          ['alarmClass', '预警等级', [2, 1]],
          ['remark', '备注', [2, 1]]
        ],
        chart: [],
        sheetName: [{ch: '水平位移', en: 'plane'}, {ch: '竖直位移', en: 'height'}],
        tableDesc: [null, null, null, null, null, null, null, null, null, null],
      },
      dataSensor = {
        tableHead: [
          ['pointName', '点名', [1, 1]],
          ['deviceNo', '传感器编号', [1, 1]],
          ['valueT', '温度', [1, 1]],
          ['valueA', '测量值', [1, 1]],
          ['valueB', '偏差值', [1, 1]],
          ['valueC', '应变频率', [1, 1]],
          ['valueD', '补偿频率', [1, 1]],
          ['dtime', '采集时间', [1, 1]]],
        tableDesc: [null, null, null, [2], [2], null, null, null],
        // chart: [['dtime', '时间']],
        chart: [],
        sheetName: [{ch: '内部位移', en: 'dataSensor'}]
      };
    switch (parseInt(itemType)) {
      case 1://水位
        options = waterLevel;
        break;
      case 2://侧斜孔 注：（基坑-深层水平位移 尾矿-内部位移）
        // url = 'inDisplacementData';
        options = inDisplacement;
        break;
      case 3://支撑轴力
        options = brace;
        break;
      case 4://锚索
        options = null;
        break;
      case 5://降雨量
        options = ombrometer;
        break;
      case 6://裂缝
        options = joint;
        break;
      case 7://表面位移(GPS)
        options = Gps;
        break;
      case 8://干滩
        options = dryShoal;
        break;
      case 9://浸润线
        options = saturationLine;
        break;
      case 10://浊度
        options = turbidity;
        break;
      case 11://渗流量
        options = seepage;
        break;
      case 12://压力
        options = stress;
        break;
      case 13://应力
        options = strain;
        break;
      case 14://土壤水分
        options = soilMoisture;
        break;
      case 15://水准高程
        options = waterElevation;
        break;
      case 16://压强
        options = concreteBrace;
        break;
      case 17://压强
        options = pressure;
        break;
      case 18://PH
        options = ph;
        break;
      case 19://内部沉降
        options = inSettlement;
        break;
      case 20://全站仪位移
        options = totalStation;
        // options.tableHead = options.tableHead[prop];
        // options.chart = options.chart[prop];
        break;
      case 50://原始数据
        options = dataSensor;
        break;
      default:
        options = null;
    }
    // console.log(options);
    return options;
  }
}
export default Enum;
