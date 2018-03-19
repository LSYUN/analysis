class Enum {
  static getItemMark(mark) {
    let dataType = [];
    let waterLevel = [
          // {text: '通用预警',value:0},
          {text:'变化量',value:0},
          {text: '水位值',value:1},
          // {text:'累积变化值'},
          // {text:'液面高度'},
          // {text:'液面高度变化量'},
        ],
        inDisplacement = [
          {text: '变化量',value:0},
        ],
        brace = [
          {text: '变化量',value:0},
        ],
        ombrometer=[
          {text: '变化量',value:0},
        ],
        joint = [
          {text: '变化量',value:0},
        ],
        Gps = [
          // {text: 'X',value:'xList'},
          // {text: 'Y',value:'yList'},
          // {text: 'Z',value:'zList'},
          // {text:'变化量',value:0},
          {text: 'X',value:1},
          {text: 'Y',value:2},
          {text: 'Z',value:3},
          // {text: '通用预警',value:0},
        ],
        dryShoal = [
          {text: '变化量',value:0},
        ],
        saturationLine = [
          {text: '变化量', value: 0},
          {text: '空管距离', value: 1},
          {text: '水位', value: 2}
        ],
        turbidity = [
          {text: '变化量',value:0},
        ],
        seepage = [
          {text: '变化量',value:0},
          {text: '流速',value:1},
          {text: '流量',value:2}
        ],
        stress = [
          {text: '变化量',value:0},
        ],
        strain = [
          {text: '变化量',value:0},
        ],
        soilMoisture = [
          {text: '变化量',value:0},
        ],
        inSettlement = [
          {text: '变化量',value:0},
        ],
        totalStation = [
          // {text: '变化量',value:0},
          {text:'∆E',value:1},
          {text:'∆N',value:2},
          {text:'∆H',value:3},
          {text:'∆P',value:4},
          {text:'∑∆E',value:5},
          {text:'∑∆N',value:6},
          {text:'∑∆H',value:7},
          {text:'∑∆P',value:8},
          {text:'变化速率E',value:9},
          {text:'变化速率N',value:10},
          {text:'变化速率H',value:11},
          {text:'变化速率P',value:12},
          // {text:'垂直于断面本次位移',value:13},
          // {text:'垂直于断面累积位移',value:14},
          // {text:'垂直于断面变化速率',value:15},
        ],
        strainDeformationData=[
          {text: '变化量',value:0},
        ],
        waterElevation=[
          {text: '变化量',value:0},
        ],
        concreteBrace = [
          {text: '变化量',value:0},
        ],
        pressure = [
          {text: '变化量',value:0},
        ],
        ph = [
          {text: '变化量',value:0},
        ],
        dataSensor = [
          // {text: '变化量',value:0},
          {text: '偏差值',value:1},
          {text: '测量值',value:2},
          {text: '温度值',value:3},
        ];
    switch (parseInt(mark)) {
      case 1://水位
        dataType = waterLevel;
        break;
      case 2://侧斜孔 注：（基坑-深层水平位移 尾矿-内部位移）
        dataType = inDisplacement;
        break;
      case 3://支撑轴力
        dataType = brace;
        break;
      case 4://锚索
        dataType = null;
        break;
      case 5://降雨量
        dataType = ombrometer;
        break;
      case 6://裂缝
        dataType = joint;
        break;
      case 7://表面位移(GPS)
        dataType = Gps;
        break;
      case 8://干滩
        dataType = dryShoal;
        break;
      case 9://浸润线
        dataType = saturationLine;
        break;
      case 10://浊度
        dataType = turbidity;
        break;
      case 11://渗流量
        dataType = seepage;
        break;
      case 12://压力
        dataType = stress;
        break;
      case 13://应力
        dataType = strain;
        break;
      case 14://土壤水分
        dataType = soilMoisture;
        break;
      case 15://水准高程
        dataType = waterElevation;
        break;
      case 16://混凝土
        dataType = concreteBrace;
        break;
      case 17://压强
        dataType = pressure;
        break;
      case 18://PH
        dataType = ph;
        break;
      case 19://内部沉降
        dataType = inSettlement;
        break;
      case 20://全站仪位移
        dataType = totalStation;
        break;
      case 21://应变
        dataType = strainDeformationData;
        break;
      case 50://原始数据
        dataType = dataSensor;
        break;
      default:
        dataType = null;
    }
    return {dataType};
  }
}
export default Enum;
