/**
 * Created by Administrator on 2017/10/20.
 */
class Enum {
  static getItemMark(mark) {
    let url = '', dataType = [];
    let waterLevel = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'm',},
          ],
        inDisplacement = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',},
          ],
        brace = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'kN'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'kN',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'kN',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'kN',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'kN',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'kN',},
          ],
        ombrometer = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',},
          ],
        joint = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',},
          ],
        Gps = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',},
        ],
        dryShoal = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'm',},
        ],
        saturationLine = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'm',},
        ],
        turbidity = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: ''},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: '',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: '',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: '',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: '',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: '',},],
        seepage = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'm³/h'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'm³/h',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'm³/h',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'm³/h',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'm³/h',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'm³/h',},
          ],
        stress = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'MP'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'MP',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'MP',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'MP',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'MP',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'MP',}],
        strain = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'MP'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'MP',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'MP',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'MP',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'MP',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'MP',},],
        soilMoisture = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: ''},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: '',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: '',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: '',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: '',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: '',},],
        inSettlement = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',},],
        totalStation = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',}],
        strainDeformationData=[
          {value: 'valueStrainDef', text: '应变值', unit: 'με', selected: true},
          {value: 'changeStrainDef', text: '单次变化量', unit: 'με'},
          {value: 'accumulationStrainDef', text: '累积变化量', unit: 'με'}
        ],
        waterElevation = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',}],
        concreteBrace = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'MPa'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'MPa',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'MPa',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'MPa',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'MPa',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'MPa',}],
        pressure = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'Pa'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'Pa',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'Pa',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'Pa',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'Pa',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'Pa',}],
        ph = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: ''},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: '',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: '',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: '',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: '',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: '',}],
        dataSensor = [
          {value: 'prewarningRate', text: '单次变化三级(黄色)预警值', unit: 'mm'},
          {value: 'warningRate', text: '单次变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlRate', text: '单次变化一级(红色)控制值(mm)', unit: 'mm',},
          {value: 'prewarningAccumulation', text: '累计变化三级(黄色)预警值', unit: 'mm',},
          {value: 'warningAccumulation', text: '累计变化二级(橙色)报警值', unit: 'mm',},
          {value: 'controlAccumulation', text: '累计变化一级(红色)控制值', unit: 'mm',}];
    switch (parseInt(mark)) {
      case 1://水位
        url = 'waterLevelData';
        dataType = waterLevel;
        break;
      case 2://侧斜孔 注：（基坑-深层水平位移 尾矿-内部位移）
        url = 'inDisplacementData';
        dataType = inDisplacement;
        break;
      case 3://支撑轴力
        url = 'braceAxialForceData';
        dataType = brace;
        break;
      case 4://锚索
        url = null;
        dataType = null;
        break;
      case 5://降雨量
        url = 'ombrometerData';
        dataType = ombrometer;
        break;
      case 6://裂缝
        url = 'jointMeterData';
        dataType = joint;
        break;
      case 7://表面位移(GPS)
        url = 'GpsData';
        dataType = Gps;
        break;
      case 8://干滩
        url = 'dryShoal';
        dataType = dryShoal;
        break;
      case 9://浸润线
        url = 'saturationLineData';
        dataType = saturationLine;
        break;
      case 10://浊度
        url = 'turbidityData';
        dataType = turbidity;
        break;
      case 11://渗流量
        url = 'seepageData';
        dataType = seepage;
        break;
      case 12://压力
        url = 'stressData';
        dataType = stress;
        break;
      case 13://应力
        url = 'strainData';
        dataType = strain;
        break;
      case 14://土壤水分
        url = 'soilMoisture';
        dataType = soilMoisture;
        break;
      case 15://水准高程
        url = 'waterElevationDatas';
        dataType = waterElevation;
        break;
      case 16://混凝土
        url = 'concretebraceData';
        dataType = concreteBrace;
        break;
      case 17://压强
        url = 'PressureData';
        dataType = pressure;
        break;
      case 18://PH
        url = 'phData';
        dataType = ph;
        break;
      case 19://内部沉降
        url = 'inSettlementData';
        dataType = inSettlement;
        break;
      case 20://全站仪位移
        url = 'measureData';
        dataType = totalStation;
        break;
      case 21://应力
        url = 'strainDeformationData';
        dataType = strainDeformationData;
        break;
      case 50://原始数据
        url = 'dataSensor';
        dataType = dataSensor;
        break;
      default:
        url = null;
        dataType = null;
    }
    return {url, dataType};
  }

  static getTableColumn(mark) {
    let column = {};
    switch (mark) {
      case 1:
        column = {}
    }
  }
}
export default Enum;
