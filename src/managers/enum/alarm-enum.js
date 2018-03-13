class Enum {
  static getItemMark(mark) {
    let DataType = [];
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
        DataType = waterLevel;
        break;
      case 2://侧斜孔 注：（基坑-深层水平位移 尾矿-内部位移）
        DataType = inDisplacement;
        break;
      case 3://支撑轴力
        DataType = brace;
        break;
      case 4://锚索
        DataType = null;
        break;
      case 5://降雨量
        DataType = ombrometer;
        break;
      case 6://裂缝
        DataType = joint;
        break;
      case 7://表面位移(GPS)
        DataType = Gps;
        break;
      case 8://干滩
        DataType = dryShoal;
        break;
      case 9://浸润线
        DataType = saturationLine;
        break;
      case 10://浊度
        DataType = turbidity;
        break;
      case 11://渗流量
        DataType = seepage;
        break;
      case 12://压力
        DataType = stress;
        break;
      case 13://应力
        DataType = strain;
        break;
      case 14://土壤水分
        DataType = soilMoisture;
        break;
      case 15://水准高程
        DataType = waterElevation;
        break;
      case 16://混凝土
        DataType = concreteBrace;
        break;
      case 17://压强
        DataType = pressure;
        break;
      case 18://PH
        DataType = ph;
        break;
      case 19://内部沉降
        DataType = inSettlement;
        break;
      case 20://全站仪位移
        DataType = totalStation;
        break;
      case 21://应变
        DataType = strainDeformationData;
        break;
      case 50://原始数据
        DataType = dataSensor;
        break;
      default:
        DataType = null;
    }
    return {DataType};
  }
}
export default Enum;