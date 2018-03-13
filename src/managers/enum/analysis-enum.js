/**
 * Created by Administrator on 2017/10/20.
 */
class Enum {
  static getItemMark(mark) {
    let url = '', DataType = [];
    let waterLevel = [
        {value: 'valueLevel', text: '水位值', unit: 'm', selected: true},
        {value: 'changeLevel', text: '变化值', unit: 'm',},
        {value: 'accumulationLevel', text: '累计变化值', unit: 'm',},
        {value: 'measureDistance', text: '液面高度', unit: 'm',},
        {value: 'changeMeasureDistance', text: '液面高度变化量', unit: 'm',}],
      inDisplacement = [
        {value: 'valueOffsetX', text: 'X轴测量值', unit: 'mm', selected: true},
        {value: 'changeOffsetX', text: 'X单次变化量', unit: '',},
        {value: 'accumulationOffsetX', text: 'X累计变化量', unit: 'mm'},
        {value: 'valueOffsetY', text: 'Y轴测量值', unit: '',},
        {value: 'changeOffsetY', text: 'Y单次变化量', unit: '',},
        {value: 'accumulationOffsetY', text: 'Y累计变化量', unit: '',}],
      brace = [
        {value: 'valueBrace', text: '实测轴力值', unit: 'KN', selected: true},
        {value: 'changeBrace', text: '轴力单次变化', unit: 'KN',},
        {value: 'accumulationBrace', text: '轴力累积变化', unit: 'KN',},
        {value: 'valueStress', text: '实测应力值', unit: '',},
        {value: 'changStress', text: '应力单次变化量', unit: '',},
        {value: 'accumulationStress', text: '应力累计变化量', unit: '',}],
      ombrometer = [
        {value: 'valueRain', text: '本次读数', unit: 'mm', selected: true},
        {value: 'valueDay', text: '当天累计雨量', unit: 'mm'},
        {value: 'valueHour', text: '小时内累计雨量', unit: 'mm'}],
      joint = [
        {value: 'changeOffset', text: '单次变化量', unit: 'mm', selected: true},
        {value: 'accumulationOffset', text: '累计变化量', unit: 'mm'}],
      Gps = [
        {value: 'smoothGapX', text: '△X', unit: 'mm', selected: true},
        {value: 'smoothGapY', text: '△Y', unit: 'mm'},
        {value: 'smoothGapZ', text: '△Z', unit: 'mm',},
        {value: 'smoothX', text: '∑X', unit: 'mm',},
        {value: 'smoothY', text: '∑Y', unit: 'm'},
        {value: 'smoothZ', text: '∑Z', unit: '',},
        {value: 'deltaX', text: '坐标平移量X', unit: '',},
        {value: 'deltaY', text: '坐标平移量Y', unit: '',},
        {value: 'deltaZ', text: '坐标平移量Z', unit: '',}],
      dryShoal = [
        {value: 'shoalLength', text: '干滩长度', unit: 'm'},
        {value: 'waterLevelValue', text: '水位', unit: 'm'},
      ],
      saturationLine = [
        {value: 'pressureValue', text: '压强值', unit: 'KPa', selected: true},
        {value: 'waterLevelValue', text: '水位值', unit: 'm'},
        {value: 'satLineDepth', text: '空管距离', unit: 'm'},
      ],
      turbidity = [
        {value: 'turbidityValue', text: '测量值', unit: 'NTU', selected: true},
        {value: 'changeValue', text: '单次变化量', unit: 'NTU'},
        {value: 'addChangeValue', text: '累计变化量', unit: 'NTU'}],
      seepage = [
        {value: 'valueSeepage', text: '渗流量', unit: 'm³/h', selected: true},
        {value: 'changeVal', text: '本次变化量', unit: '',},
        {value: 'addChangeVal', text: '累积变化量', unit: '',},
        {value: 'statisticsval', text: '日渗流量', unit: 'm³',}],
      stress = [
        {value: 'valueStress', text: '压力计算值', unit: '', selected: true},
        {value: 'changStress', text: '单次变化量', unit: '',},
        {value: 'accumulationStress', text: '累计变化量', unit: '',}],
      strain = [
        {value: 'valueStrain', text: '应力值', unit: 'MPa', selected: true},
        {value: 'changeStrain', text: '单次变化量', unit: 'MPa'},
        {value: 'accumulationStrain', text: '累计变化量', unit: 'MPa'}],
      soilMoisture = [],
      inSettlement = [
        {value: 'valueOffset', text: '本次位移', unit: 'mm', selected: true},
        {value: 'accumulationOffset', text: '累计位移', unit: 'mm'},
        {value: 'changeOffset', text: '位移单次变化量', unit: 'mm'}],
      totalStation = [
        {value: 'gapEast', text: '∆E', unit: 'mm', selected: true},
        {value: 'gapNorth', text: '∆N', unit: 'mm'},
        {value: 'gapHeight', text: '∆H', unit: 'mm'},
        {value: 'gapPlane', text: '∆P', unit: 'mm'},
        {value: 'accumulationEast', text: '∑∆E', unit: 'mm'},
        {value: 'accumulationNorth', text: '∑∆N', unit: 'mm'},
        {value: 'accumulationHeight', text: '∑∆H', unit: 'mm'},
        {value: 'accumulationPlane', text: '∑∆P', unit: 'mm'}],
       strainDeformationData=[
          {value: 'valueStrainDef', text: '应变值', unit: 'με', selected: true},
          {value: 'changeStrainDef', text: '单次变化量', unit: 'με'},
          {value: 'accumulationStrainDef', text: '累积变化量', unit: 'με'}
        ],
      waterElevation = [
        {value: 'realVal', text: '实测值', unit: 'm', selected: true},
        {value: 'changeVal', text: '单次变化', unit: 'mm'},
        {value: 'relativeChangeVal', text: '单次变化(相对基准点)', unit: 'mm'}],
      concreteBrace = [
        {value: 'valueBrace', text: '实测轴力值', unit: 'MPa', selected: true},
        {value: 'changeBrace', text: '单次变化', unit: 'MPa',},
        {value: 'accumulationBrace', text: '累计变化', unit: 'MPa',}],
      pressure = [
        {value: 'realVal', text: '实测值', unit: 'Pa', selected: true},
        {value: 'pressureValue', text: '计算值', unit: 'Pa'},
        {value: 'changeValue', text: '单次变化量', unit: 'Pa'},
        {value: 'accumulationValue', text: '累计变化量', unit: 'Pa'},
        {value: 'originalPressure', text: '初始读数', unit: 'Pa'}],
      ph = [
        {value: 'phValue', text: 'PH值', unit: '', selected: true},
        {value: 'changeValue', text: '单次变化量', unit: ''}],
      dataSensor = [
        {value: 'valueT', text: '温度', unit: 'T', selected: true},
        {value: 'valueA', text: '测量值', unit: 'mm',},
        {value: 'valueB', text: '偏差值', unit: '',}];
    switch (parseInt(mark)) {
      case 1://水位
        url = 'waterLevelData';
        DataType = waterLevel;
        break;
      case 2://侧斜孔 注：（基坑-深层水平位移 尾矿-内部位移）
        url = 'inDisplacementData';
        DataType = inDisplacement;
        break;
      case 3://支撑轴力
        url = 'braceAxialForceData';
        DataType = brace;
        break;
      case 4://锚索
        url = null;
        DataType = null;
        break;
      case 5://降雨量
        url = 'ombrometerData';
        DataType = ombrometer;
        break;
      case 6://裂缝
        url = 'jointMeterData';
        DataType = joint;
        break;
      case 7://表面位移(GPS)
        url = 'GpsData';
        DataType = Gps;
        break;
      case 8://干滩
        url = 'dryShoal';
        DataType = dryShoal;
        break;
      case 9://浸润线
        url = 'saturationLineData';
        DataType = saturationLine;
        break;
      case 10://浊度
        url = 'turbidityData';
        DataType = turbidity;
        break;
      case 11://渗流量
        url = 'seepageData';
        DataType = seepage;
        break;
      case 12://压力
        url = 'stressData';
        DataType = stress;
        break;
      case 13://应力
        url = 'strainData';
        DataType = strain;
        break;
      case 14://土壤水分
        url = 'soilMoisture';
        DataType = soilMoisture;
        break;
      case 15://水准高程
        url = 'waterElevationDatas';
        DataType = waterElevation;
        break;
      case 16://混凝土
        url = 'concretebraceData';
        DataType = concreteBrace;
        break;
      case 17://压强
        url = 'PressureData';
        DataType = pressure;
        break;
      case 18://PH
        url = 'phData';
        DataType = ph;
        break;
      case 19://内部沉降
        url = 'inSettlementData';
        DataType = inSettlement;
        break;
      case 20://全站仪位移
        url = 'measureData';
        DataType = totalStation;
        break;
      case 21://应变
        url = 'strainDeformationData';
        DataType = strainDeformationData;
        break;
      case 50://原始数据
        url = 'dataSensor';
        DataType = dataSensor;
        break;
      default:
        url = null;
        DataType = null;
    }
    return {url, DataType};
  }
}
export default Enum;
