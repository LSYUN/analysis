/**
 * Created by Administrator on 2017/11/23.
 */
class Enum {
  static getTableConfig(mark) {
    let waterLevel = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueLevel",
        "defaultTitle": "水位值(m)",
        "historyTitle": "水位值(m)",
        "visibility": true,
        "reportTitle": "水位值(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水位值(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeLevel",
        "defaultTitle": "水位变化值(m)",
        "historyTitle": "水位变化值(m)",
        "visibility": true,
        "reportTitle": "水位变化值(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水位变化值(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulateLevel",
        "defaultTitle": "水位累积变化量(m)",
        "historyTitle": "水位累积变化量(m)",
        "visibility": true,
        "reportTitle": "水位累积变化量(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水位累积变化量(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1
      },
      {
        "property": "originalTemp",
        "defaultTitle": "初始温度",
        "historyTitle": "初始温度",
        "visibility": true,
        "reportTitle": "初始温度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始温度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1
      },
      {
        "property": "prmK",
        "defaultTitle": "K参数",
        "historyTitle": "K参数",
        "visibility": true,
        "reportTitle": "K参数",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "K参数",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1
      },
      {
        "property": "prmA",
        "defaultTitle": "A参数",
        "historyTitle": "A参数",
        "visibility": true,
        "reportTitle": "A参数",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "A参数",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1
      },
      {
        "property": "originalModule",
        "defaultTitle": "基准模数值/基准频率值",
        "historyTitle": "基准模数值/基准频率值",
        "visibility": true,
        "reportTitle": "基准模数值/基准频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "基准模数值/基准频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1
      },
      {
        "property": "originalLevel",
        "defaultTitle": "初始水位（探头高度）",
        "historyTitle": "初始水位（探头高度）",
        "visibility": true,
        "reportTitle": "初始水位（探头高度）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始水位（探头高度）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报)
        "keepDec": 2,//需要保留几位小数
        "conversion":1
      },
      {
        "property": "measureDistance",
        "defaultTitle": "液面高度",
        "historyTitle": "液面高度",
        "visibility": true,
        "reportTitle": "液面高度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "液面高度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeMeasureDistance",
        "defaultTitle": "液面高度变化量",
        "historyTitle": "液面高度变化量",
        "visibility": true,
        "reportTitle": "液面高度变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "液面高度变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": true,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": true,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let inDisplacement = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueOffsetX',
        "defaultTitle": '本次位移(mm)',
        "historyTitle": '本次位移(mm)',
        "visibility": true,
        "reportTitle": "本次位移(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次位移(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'accumulationOffsetX',
        "defaultTitle": '累计位移(mm)',
        "historyTitle": '累计位移(mm)',
        "visibility": true,
        "reportTitle": "累计位移(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累计位移(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'valueOffsetX_',
        "defaultTitle": 'X-方向本次位移值(mm)',
        "historyTitle": 'X-方向本次位移值(mm)',
        "visibility": true,
        "reportTitle": "X-方向本次位移值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "X-方向本次位移值mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'accumulationOffsetX_',
        "defaultTitle": 'X-方向累计位移值(mm)',
        "historyTitle": 'X-方向累计位移值(mm)',
        "visibility": true,
        "reportTitle": "X-方向累计位移值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "X-方向累计位移值(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'valueOffsetY',
        "defaultTitle": 'Y+向本次位移值(mm)',
        "historyTitle": 'Y+向本次位移值(mm)',
        "visibility": true,
        "reportTitle": "Y+向本次位移值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "Y+向本次位移值(mm))",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'accumulationOffsetY',
        "defaultTitle": 'Y+向累计位移值(mm)',
        "historyTitle": 'Y+向累计位移值(mm)',
        "visibility": true,
        "reportTitle": "Y+向累计位移值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "Y+向累计位移值(mm))",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'valueOffsetY_',
        "defaultTitle": 'Y-方向本次位移值(mm)',
        "historyTitle": 'Y-方向本次位移值(mm)',
        "visibility": true,
        "reportTitle": "Y-方向本次位移值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "Y-方向本次位移值(mm))",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'accumulationOffsetY_',
        "defaultTitle": ' Y-方向累计位移值(mm)',
        "historyTitle": ' Y-方向累计位移值(mm)',
        "visibility": true,
        "reportTitle": " Y-方向累计位移值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " Y-方向累计位移值(mm))",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'changeOffsetX',
        "defaultTitle": '位移单次变化量',
        "historyTitle": '位移单次变化量',
        "visibility": true,
        "reportTitle": "位移单次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "位移单次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'changeRate',
        "defaultTitle": '位移速率（mm/d）',
        "historyTitle": '位移速率（mm/d）',
        "visibility": true,
        "reportTitle": "位移速率（mm/d）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "位移速率（mm/d)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'angleX',
        "defaultTitle": ' X方向倾斜角度',
        "historyTitle": ' X方向倾斜角度',
        "visibility": true,
        "reportTitle": " X方向倾斜角度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " X方向倾斜角度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'angleY',
        "defaultTitle": ' Y方向倾斜角度',
        "historyTitle": ' Y方向倾斜角度',
        "visibility": true,
        "reportTitle": " Y方向倾斜角度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " Y方向倾斜角度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalModuleX',
        "defaultTitle": '基准模数',
        "historyTitle": '基准模数',
        "visibility": true,
        "reportTitle": "基准模数",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "基准模数",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'depth',
        "defaultTitle": '深度',
        "historyTitle": '深度',
        "visibility": true,
        "reportTitle": "深度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "深度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'gaugeLength',
        "defaultTitle": '标距(mm)',
        "historyTitle": '标距(mm)',
        "visibility": true,
        "reportTitle": "标距(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "标距(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'prmA',
        "defaultTitle": '计算系数A',
        "historyTitle": '计算系数A',
        "visibility": true,
        "reportTitle": "计算系数A",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "计算系数A",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'prmB',
        "defaultTitle": '计算系数B',
        "historyTitle": '计算系数B',
        "visibility": true,
        "reportTitle": "计算系数B",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "计算系数B",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'prmC',
        "defaultTitle": '计算系数C',
        "historyTitle": '计算系数C',
        "visibility": true,
        "reportTitle": "计算系数C",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "计算系数C",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'prmD',
        "defaultTitle": '计算系数D',
        "historyTitle": '计算系数D',
        "visibility": true,
        "reportTitle": "计算系数D",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "计算系数D",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": true,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": true,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
    ];
    let brace = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueBrace',
        "defaultTitle": '实测轴力值',
        "historyTitle": '实测轴力值',
        "visibility": true,
        "reportTitle": "实测轴力值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测轴力值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'changeBrace',
        "defaultTitle": '轴力单次变化',
        "historyTitle": '轴力单次变化',
        "visibility": true,
        "reportTitle": "轴力单次变化",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "轴力单次变化",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'accumulationBrace',
        "defaultTitle": '轴力累积变化',
        "historyTitle": '轴力累积变化',
        "visibility": true,
        "reportTitle": "轴力累积变化",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "轴力累积变化",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalFrequency',
        "defaultTitle": '在初始状态时的基准频率值',
        "historyTitle": '在初始状态时的基准频率值',
        "visibility": true, //默认为false
        "reportTitle": "在初始状态时的基准频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "在初始状态时的基准频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数 默认为0
        "conversion":1,
      },
      {
        "property": 'originalTemp',
        "defaultTitle": '参数K',
        "historyTitle": '参数K',
        "visibility": true, //默认为false
        "reportTitle": "参数K",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数K",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmK',
        "defaultTitle": '参数Kt,F',
        "historyTitle": '参数Kt,F',
        "visibility": true, //默认为false
        "reportTitle": "参数Kt,F",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数Kt,F",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmKt',
        "defaultTitle": '参数Kt',
        "historyTitle": '参数Kt',
        "visibility": true, //默认为false
        "reportTitle": "参数Kt,F",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数Kt,F",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmA',
        "defaultTitle": '参数A',
        "historyTitle": '参数A',
        "visibility": true, //默认为false
        "reportTitle": "参数A",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数A",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmB',
        "defaultTitle": '参数B',
        "historyTitle": '参数B',
        "visibility": true, //默认为false
        "reportTitle": "参数B",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数B",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'pointGroupName',
        "defaultTitle": '点组名',
        "historyTitle": '点组名',
        "visibility": true, //默认为false
        "reportTitle": "点组名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点组名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'pointGroupId',
        "defaultTitle": '点组ID',
        "historyTitle": '点组ID',
        "visibility": true, //默认为false
        "reportTitle": "点组ID",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点组ID",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'pointGroupType',
        "defaultTitle": '点组类型',
        "historyTitle": '点组类型',
        "visibility": true, //默认为false
        "reportTitle": "点组类型",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点组类型",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'pointGroupArray',
        "defaultTitle": '计算的点名集合',
        "historyTitle": '计算的点名集合',
        "visibility": true, //默认为false
        "reportTitle": "计算的点名集合",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "计算的点名集合",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": true,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": true,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let ombrometer = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueHour',
        "defaultTitle": '小时内累计雨量(mm)',
        "historyTitle": '小时内累计雨量(mm)',
        "visibility": true,
        "reportTitle": "小时内累计雨量(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "小时内累计雨量(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueDay',
        "defaultTitle": '当天累计雨量(mm)',
        "historyTitle": '当天累计雨量(mm)',
        "visibility": true,
        "reportTitle": "当天累计雨量(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "当天累计雨量(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueMonth',
        "defaultTitle": '月内累计雨量(mm)',
        "historyTitle": '月内累计雨量(mm)',
        "visibility": true,
        "reportTitle": "月内累计雨量(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "月内累计雨量(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueYear',
        "defaultTitle": '年内累计雨量(mm)',
        "historyTitle": '年内累计雨量(mm)',
        "visibility": true,
        "reportTitle": "年内累计雨量(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "年内累计雨量(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueRain',
        "defaultTitle": '单次雨量数据',
        "historyTitle": '单次雨量数据',
        "visibility": true,
        "reportTitle": "单次雨量数据",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "单次雨量数据",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": true,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": true,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
    ];
    let joint = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'valueOffset',
        "defaultTitle": '测量值(mm)',
        "historyTitle": '测量值(mm)',
        "visibility": true,
        "reportTitle": "测量值(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测量值(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'changeOffset',
        "defaultTitle": '单次变化量(mm)',
        "historyTitle": '单次变化量(mm)',
        "visibility": true,
        "reportTitle": "单次变化量(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "单次变化量(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'accumulationOffset',
        "defaultTitle": '累计变化量(mm)',
        "historyTitle": '累计变化量(mm)',
        "visibility": true,
        "reportTitle": "累计变化量(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累计变化量(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmG',
        "defaultTitle": '系数G',
        "historyTitle": '系数G',
        "visibility": true,
        "reportTitle": "系数G",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "系数G",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmA',
        "defaultTitle": '系数A',
        "historyTitle": '系数A',
        "visibility": true,
        "reportTitle": "系数A",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "系数A",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmB',
        "defaultTitle": '系数B',
        "historyTitle": '系数B',
        "visibility": true,
        "reportTitle": "系数B",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "系数B",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmC',
        "defaultTitle": '系数C',
        "historyTitle": '系数C',
        "visibility": true,
        "reportTitle": "系数C",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "系数C",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'parmK',
        "defaultTitle": '系数K',
        "historyTitle": '系数K',
        "visibility": true,
        "reportTitle": "系数K",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "系数K",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalModule',
        "defaultTitle": '初始模数值',
        "historyTitle": '初始模数值',
        "visibility": true,
        "reportTitle": "初始模数值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始模数值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalTemp',
        "defaultTitle": '初始温度值',
        "historyTitle": '初始温度值',
        "visibility": true,
        "reportTitle": "初始温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'baseValue',
        "defaultTitle": '初始位移',
        "historyTitle": '初始位移',
        "visibility": true,
        "reportTitle": "初始位移",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始位移",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },

      {
        "property": 'baseValue',
        "defaultTitle": '初始位移(mm)',
        "historyTitle": '初始位移(mm)',
        "visibility": true,
        "reportTitle": "初始位移(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始位移(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let Gps = [
      {
        "property": 'pointName',
        "defaultTitle": '测点',
        "historyTitle": '测点',
        "visibility": true,
        "reportTitle": "测点",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothRoverX',
        "defaultTitle": '坐标X(m)',
        "historyTitle": '坐标X(m)',
        "visibility": true,
        "reportTitle": "坐标X(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "坐标X(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothRoverY',
        "defaultTitle": '坐标Y(m)',
        "historyTitle": '坐标Y(m)',
        "visibility": true,
        "reportTitle": "坐标Y(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "坐标Y(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothRoverZ',
        "defaultTitle": '坐标Z(m)',
        "historyTitle": '坐标Z(m)',
        "visibility": true,
        "reportTitle": "坐标Z(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "坐标Z(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothGapX',
        "defaultTitle": '△X(mm)',
        "historyTitle": '△X(mm)',
        "visibility": true,
        "reportTitle": "△X(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "△X(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothGapY',
        "defaultTitle": '△Y(mm)',
        "historyTitle": '△Y(mm)',
        "visibility": true,
        "reportTitle": "△Y(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "△Y(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothGapZ',
        "defaultTitle": '△Z(mm)',
        "historyTitle": '△Z(mm)',
        "visibility": true,
        "reportTitle": "△Z(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "△Z(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothX',
        "defaultTitle": '∑X(mm)',
        "historyTitle": '∑X(mm)',
        "visibility": true,
        "reportTitle": "∑X(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑X(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothY',
        "defaultTitle": '∑Y(mm)',
        "historyTitle": '∑Y(mm)',
        "visibility": true,
        "reportTitle": "∑Y(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑Y(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）,
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'smoothZ',
        "defaultTitle": '∑Z(mm)',
        "historyTitle": '∑Z(mm)',
        "visibility": true,
        "reportTitle": "∑Z(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑Z(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'smoothGapX',
        "defaultTitle": '本次变化量X(mm)',
        "historyTitle": '本次变化量X(mm)',
        "visibility": true,
        "reportTitle": "本次变化量X(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量X(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'smoothGapY',
        "defaultTitle": '本次变化量Y(mm)',
        "historyTitle": '本次变化量Y(mm)',
        "visibility": true,
        "reportTitle": "本次变化量Y(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量Y(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'smoothGapZ',
        "defaultTitle": '本次变化量Z(mm)',
        "historyTitle": '本次变化量Z(mm)',
        "visibility": true,
        "reportTitle": "本次变化量Z(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量Z(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },

      {
        "property": 'deltaX',
        "defaultTitle": '坐标平移量X',
        "historyTitle": '坐标平移量X',
        "visibility": false,
        "reportTitle": "坐标平移量X",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "坐标平移量X",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'deltaY',
        "defaultTitle": '坐标平移量Y',
        "historyTitle": '坐标平移量Y',
        "visibility": false,
        "reportTitle": "坐标平移量Y",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "坐标平移量Y",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'deltaZ',
        "defaultTitle": '坐标平移量Z',
        "historyTitle": '坐标平移量Z',
        "visibility": false,
        "reportTitle": "坐标平移量Z",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "坐标平移量Z",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'rotateAngleA',
        "defaultTitle": '旋转角度A',
        "historyTitle": '旋转角度A',
        "visibility": false,
        "reportTitle": "旋转角度A",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "旋转角度A",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'rotateAngleB',
        "defaultTitle": '旋转角度B',
        "historyTitle": '旋转角度B',
        "visibility": false,
        "reportTitle": "旋转角度B",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "旋转角度B",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'rotateAngleX',
        "defaultTitle": '旋转角度X',
        "historyTitle": '旋转角度X',
        "visibility": false,
        "reportTitle": "旋转角度X",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "旋转角度X",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'rotateAngleY',
        "defaultTitle": '旋转角度Y',
        "historyTitle": '旋转角度Y',
        "visibility": false,
        "reportTitle": "旋转角度Y",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "旋转角度Y",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'rotateAngleZ',
        "defaultTitle": '旋转角度Z',
        "historyTitle": '旋转角度Z',
        "visibility": false,
        "reportTitle": "旋转角度Z",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "旋转角度Z",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'rotateAngleX',
        "defaultTitle": '旋转角度X',
        "historyTitle": '旋转角度X',
        "visibility": false,
        "reportTitle": "旋转角度X",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "旋转角度X",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '测量时间',
        "historyTitle": '测量时间',
        "visibility": true,
        "reportTitle": "测量时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测量时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
    ];
    let dryShoal = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'shoalLength',
        "defaultTitle": '干滩长度(m)',
        "historyTitle": '干滩长度(m)',
        "visibility": true,
        "reportTitle": "干滩长度(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "干滩长度(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'waterLevelValue',
        "defaultTitle": '水位(m)',
        "historyTitle": '水位(m)',
        "visibility": true,
        "reportTitle": "水位(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水位(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'detectorHeight',
        "defaultTitle": '探头高度（单位：m）',
        "historyTitle": '探头高度（单位：m）',
        "visibility": true,
        "reportTitle": "探头高度（单位：m）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "探头高度（单位：m）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'shoalLength',
        "defaultTitle": '坝顶高程(单位：m)',
        "historyTitle": '坝顶高程(单位：m)',
        "visibility": true,
        "reportTitle": "坝顶高程(单位：m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "坝顶高程(单位：m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'height',
        "defaultTitle": '坝顶高程',
        "historyTitle": '坝顶高程',
        "visibility": false,
        "reportTitle": "坝顶高程",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "坝顶高程",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'slope',
        "defaultTitle": '干滩坡度',
        "historyTitle": '干滩坡度',
        "visibility": false,
        "reportTitle": "干滩坡度",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "干滩坡度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }
    ];
    let saturationLine = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'waterLevelValue',
        "defaultTitle": '水位(m)',
        "historyTitle": '水位(m)',
        "visibility": true,
        "reportTitle": "水位(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水位(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'levelChangeValue',
        "defaultTitle": '水位单次变化量',
        "historyTitle": '水位单次变化量',
        "visibility": true,
        "reportTitle": "水位单次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水位单次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalTemp',
        "defaultTitle": '初始温度',
        "historyTitle": '初始温度',
        "visibility": true,
        "reportTitle": "初始温度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始温度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalModule',
        "defaultTitle": '基准模数值',
        "historyTitle": '基准模数值',
        "visibility": true,
        "reportTitle": "基准模数值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "基准模数值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'originalLevel',
        "defaultTitle": '初始水位高程（单位：m）',
        "historyTitle": '初始水位高程（单位：m）',
        "visibility": true,
        "reportTitle": "初始水位高程（单位：m）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始水位高程（单位：m）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'pipeElevation',
        "defaultTitle": '管口高程（单位：m）',
        "historyTitle": '管口高程（单位：m）',
        "visibility": true,
        "reportTitle": "管口高程（单位：m）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "管口高程（单位：m）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'depth',
        "defaultTitle": '深度（传感器埋设高程，单位：m）',
        "historyTitle": '深度（传感器埋设高程，单位：m）',
        "visibility": true,
        "reportTitle": "深度（传感器埋设高程，单位：m）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "深度（传感器埋设高程，单位：m）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'prmK',
        "defaultTitle": '参数K',
        "historyTitle": '参数K',
        "visibility": true,
        "reportTitle": "参数K",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数K",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'prmB',
        "defaultTitle": '参数B',
        "historyTitle": '参数B',
        "visibility": true,
        "reportTitle": "参数B",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参数B",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'satLineDepth',
        "defaultTitle": '浸润线埋深(水面到管口的距离，单位：m)',
        "historyTitle": '浸润线埋深(水面到管口的距离，单位：m)',
        "visibility": true,
        "reportTitle": "浸润线埋深(水面到管口的距离，单位：m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "浸润线埋深(水面到管口的距离，单位：m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'pressureValue',
        "defaultTitle": '压强(KPa)',
        "historyTitle": '压强(KPa)',
        "visibility": true,
        "reportTitle": "压强(KPa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "压强(KPa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'satLineDepth',
        "defaultTitle": '空管距离(m)',
        "historyTitle": '空管距离(m)',
        "visibility": false,
        "reportTitle": "空管距离(m)",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "空管距离(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'satLineDepth',
        "defaultTitle": '浸润线埋深(m)',
        "historyTitle": '浸润线埋深(m)',
        "visibility": false,
        "reportTitle": "浸润线埋深(m)",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "浸润线埋深(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let turbidity = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'turbidityValue',
        "defaultTitle": '测量值(NTU)',
        "historyTitle": '测量值(NTU)',
        "visibility": true,
        "reportTitle": "测量值(NTU)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测量值(NTU)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'changeValue',
        "defaultTitle": '单次变化量(NTU)',
        "historyTitle": '单次变化量(NTU)',
        "visibility": true,
        "reportTitle": "单次变化量(NTU)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "单次变化量(NTU)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": 'addChangeValue',
        "defaultTitle": '累计变化量(NTU)',
        "historyTitle": '累计变化量(NTU)',
        "visibility": true,
        "reportTitle": "累计变化量(NTU)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累计变化量(NTU)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let seepage = [
      {
        "property": 'pointName',
        "defaultTitle": '点名',
        "historyTitle": '点名',
        "visibility": true,
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'valueSeepage',
        "defaultTitle": '渗流量(m³/h)',
        "historyTitle": '渗流量(m³/h)',
        "visibility": true,
        "reportTitle": "渗流量(m³/h)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "渗流量(m³/h)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'statisticsval',
        "defaultTitle": '日渗流量(m³)',
        "historyTitle": '日渗流量(m³)',
        "visibility": true,
        "reportTitle": "日渗流量(m³)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "日渗流量(m³)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'changeVal',
        "defaultTitle": '本次变化量',
        "historyTitle": '本次变化量',
        "visibility": true,
        "reportTitle": "本次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'addChangeVal',
        "defaultTitle": '累积变化量',
        "historyTitle": '累积变化量',
        "visibility": true,
        "reportTitle": "累积变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      // {
      //   "property": 'cumulativeValue',
      //   "defaultTitle": '累计流量值',
      //   "historyTitle": '累计流量值',
      //   "visibility": true,
      //   "reportTitle": "累计流量值",//报表自定义名称
      //   "export": true,////默认导出就设为true（报表）
      //   "infoTitle": "累计流量值",//简报自定义名称
      //   "send": false,//简报发送该字段统计信息就设为true（简报）
      //   "keepDec": 4,//需要保留几位小数
      //   "conversion":1,
      // },
      {
        "property": 'deviceName',
        "defaultTitle": '设备名称',
        "historyTitle": '设备名称',
        "visibility": true,
        "reportTitle": "设备名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "设备名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion": 1,
      },
      {
        "property": 'deviceNo',
        "defaultTitle": '设备编号',
        "historyTitle": '设备编号',
        "visibility": true,
        "reportTitle": "设备编号",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "设备编号",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": 'dtime',
        "defaultTitle": '采集时间',
        "historyTitle": '采集时间',
        "visibility": true,
        "reportTitle": "采集时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let stress = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "stressValue",
        "defaultTitle": "压力值",//系统定义的名称
        "historyTitle": "压力值",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "压力值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "压力值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeValue",
        "defaultTitle": "压力值单次变化量",
        "historyTitle": "压力值单次变化量",
        "visibility": true,
        "reportTitle": "压力值单次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "压力值单次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "originalModule",
        "defaultTitle": "初始模数（零点应变（单位：µε））",
        "historyTitle": "初始模数（零点应变（单位：µε））",
        "visibility": true,
        "reportTitle": "初始模数（零点应变（单位：µε））",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始模数（零点应变（单位：µε））",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "originalTemp",
        "defaultTitle": "初始温度（零点温度）",
        "historyTitle": "初始温度（零点温度）",
        "visibility": false,
        "reportTitle": "初始温度（零点温度）",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始温度（零点温度）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "prmK",
        "defaultTitle": "标定系数K",
        "historyTitle": "标定系数K",
        "visibility": false,
        "reportTitle": "标定系数K",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "标定系数K",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "productType",
        "defaultTitle": "产品类型",
        "historyTitle": "产品类型",
        "visibility": false,
        "reportTitle": "产品类型",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "产品类型",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "customNo",
        "defaultTitle": "自定义编号(预留字段)",
        "historyTitle": "自定义编号(预留字段)",
        "visibility": false,
        "reportTitle": "自定义编号(预留字段)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "自定义编号(预留字段)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let strain = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueStrain",
        "defaultTitle": "应力值(MPa)",
        "historyTitle": "应力值(MPa)",
        "visibility": true,
        "reportTitle": "应力值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "应力值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeStrain",
        "defaultTitle": "本次变化量(MPa)",
        "historyTitle": "本次变化量(MPa)",
        "visibility": true,
        "reportTitle": "本次变化量(MPa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量(MPa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "originalFrequency",
        "defaultTitle": "初始模数值",
        "historyTitle": "初始模数值",
        "visibility": true,
        "reportTitle": "初始模数值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始模数值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "originalTemp",
        "defaultTitle": "初始温度值",
        "historyTitle": "初始温度值",
        "visibility": true,
        "reportTitle": "初始温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "初始温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeStrain",
        "defaultTitle": "单次变化量",
        "historyTitle": "单次变化量",
        "visibility": true,
        "reportTitle": "单次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "单次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationStrain",
        "defaultTitle": "累积变化量(MPa)",
        "historyTitle": "累积变化量(MPa)",
        "visibility": true,
        "reportTitle": "累积变化量(MPa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积变化量(MPa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueA",
        "defaultTitle": "A值",
        "historyTitle": "A值",
        "visibility": true,
        "reportTitle": "A值",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "A值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueB",
        "defaultTitle": "B值",
        "historyTitle": "B值",
        "visibility": true,
        "reportTitle": "B值",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "B值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueC",
        "defaultTitle": "C值",
        "historyTitle": "C值",
        "visibility": true,
        "reportTitle": "C值",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "C值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueD",
        "defaultTitle": "D值",
        "historyTitle": "D值",
        "visibility": false,
        "reportTitle": "D值",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "D值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueE",
        "defaultTitle": "E值",
        "historyTitle": "E值",
        "visibility": true,
        "reportTitle": "E值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "E值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueF",
        "defaultTitle": "F值",
        "historyTitle": "F值",
        "visibility": true,
        "reportTitle": "F值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "F值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      // {
      //   "property": "productType",
      //   "defaultTitle": "产品类型",
      //   "historyTitle": "产品类型",
      //   "visibility": true,
      //   "reportTitle": "产品类型",//报表自定义名称
      //   "export": true,////默认导出就设为true（报表）
      //   "infoTitle": "产品类型",//简报自定义名称
      //   "send": false,//简报发送该字段统计信息就设为true（简报）
      //   "keepDec": 2,//需要保留几位小数
      //   "conversion":1,
      // },
      // {
      //   "property": "customNo",
      //   "defaultTitle": "自定义编号(预留字段)",
      //   "historyTitle": "自定义编号(预留字段)",
      //   "visibility": true,
      //   "reportTitle": "自定义编号(预留字段)",//报表自定义名称
      //   "export": true,////默认导出就设为true（报表）
      //   "infoTitle": "自定义编号(预留字段)",//简报自定义名称
      //   "send": false,//简报发送该字段统计信息就设为true（简报）
      //   "keepDec": 2,//需要保留几位小数
      //   "conversion":1,
      // },
      // {
      //   "property": "minitorDataType",
      //   "defaultTitle": "监测项数据类型（用以判断是否进行多余周期监测）",
      //   "historyTitle": "监测项数据类型（用以判断是否进行多余周期监测）",
      //   "visibility": true,
      //   "reportTitle": "监测项数据类型（用以判断是否进行多余周期监测）",//报表自定义名称
      //   "export": true,////默认导出就设为true（报表）
      //   "infoTitle": "监测项数据类型（用以判断是否进行多余周期监测）",//简报自定义名称
      //   "send": false,//简报发送该字段统计信息就设为true（简报）
      //   "keepDec": 2,//需要保留几位小数
      //   "conversion":1,
      // },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": true,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": true,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let soilMoisture = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueA",
        "defaultTitle": "测量值",
        "historyTitle": "测量值",
        "visibility": true,
        "reportTitle": "测量值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测量值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueB",
        "defaultTitle": "本次变化量",
        "historyTitle": "本次变化量",
        "visibility": true,
        "reportTitle": "本次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueC",
        "defaultTitle": "累积变化量",
        "historyTitle": "累积变化量",
        "visibility": true,
        "reportTitle": "累积变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let inSettlement = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueOffset",
        "defaultTitle": "位移单次变化量",
        "historyTitle": "位移单次变化量",
        "visibility": true,
        "reportTitle": "位移单次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "位移单次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationOffset",
        "defaultTitle": "累计位移",
        "historyTitle": "累计位移",
        "visibility": false,
        "reportTitle": "累计位移",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "累计位移",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeRate",
        "defaultTitle": "位移速率（mm/d）",
        "historyTitle": "位移速率（mm/d）",
        "visibility": false,
        "reportTitle": "位移速率（mm/d）",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "位移速率（mm/d）",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "originalModule",
        "defaultTitle": "基准模数值",
        "historyTitle": "基准模数值",
        "visibility": false,
        "reportTitle": "基准模数值",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "基准模数值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "prmK",
        "defaultTitle": "参数K",
        "historyTitle": "参数K",
        "visibility": false,
        "reportTitle": "参数K",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "参数K",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },

      {
        "property": "changeOffset",
        "defaultTitle": "本次变化量",
        "historyTitle": "本次变化量",
        "visibility": true,
        "reportTitle": "本次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationOffset",
        "defaultTitle": "累计位移",
        "historyTitle": "累计位移",
        "visibility": true,
        "reportTitle": "累计位移",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累计位移",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "elevationValue",
        "defaultTitle": "本次高程值(m)",//系统定义的名称
        "historyTitle": "本次高程值(m)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "本次高程值(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "本次高程值(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let waterElevation = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "baseVal",
        "defaultTitle": "基准值",
        "historyTitle": "基准值",
        "visibility": true,
        "reportTitle": "基准值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "基准值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "realVal",
        "defaultTitle": " 实时测量值",
        "historyTitle": " 实时测量值",
        "visibility": true,
        "reportTitle": " 实时测量值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 实时测量值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeVal",
        "defaultTitle": "沉降变化量",
        "historyTitle": "沉降变化量",
        "visibility": true,
        "reportTitle": "沉降变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "沉降变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "relativeChangeVal",
        "defaultTitle": "相对基准点的沉降变化量",
        "historyTitle": "相对基准点的沉降变化量",
        "visibility": true,
        "reportTitle": "相对基准点的沉降变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "相对基准点的沉降变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let concreteBrace = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueBracel",
        "defaultTitle": "实测轴力值(MPa)",
        "historyTitle": "实测轴力值(MPa)",
        "visibility": true,
        "reportTitle": "实测轴力值(MPa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测轴力值(MPa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeBrace",
        "defaultTitle": "单次变化(MPa)",
        "historyTitle": "单次变化(MPa)",
        "visibility": true,
        "reportTitle": " 单次变化(MPa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 单次变化(MPa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationBrace",
        "defaultTitle": "累积变化(MPa)",
        "historyTitle": "累积变化(MPa)",
        "visibility": true,
        "reportTitle": "累积变化(MPa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积变化(MPa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let pressure = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "realVal",
        "defaultTitle": "实测值(Pa)",
        "historyTitle": "实测值(Pa)",
        "visibility": true,
        "reportTitle": "实测值(Pa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测值(Pa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "pressureValue",
        "defaultTitle": "计算值(Pa)",
        "historyTitle": "计算值(Pa)",
        "visibility": true,
        "reportTitle": "计算值(Pa)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "计算值(Pa)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeValue",
        "defaultTitle": "单次变化量",
        "historyTitle": "单次变化量",
        "visibility": true,
        "reportTitle": " 实时测量值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 实时测量值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationBrace",
        "defaultTitle": "累积变化量",
        "historyTitle": "累积变化量",
        "visibility": true,
        "reportTitle": "累积变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let ph = [
      {
        "property": "pointName",
        "defaultTitle": "测点名称",//系统定义的名称
        "historyTitle": "测点名称",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点名称",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点名称",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数'
        "conversion":1,
      },
      {
        "property": "phValue",
        "defaultTitle": "PH值",
        "historyTitle": "PH值",
        "visibility": true,
        "reportTitle": "PH值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "PH值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeValue",
        "defaultTitle": "单次变化量",
        "historyTitle": "单次变化量",
        "visibility": true,
        "reportTitle": " 实时测量值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 实时测量值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 4,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "addChangeValue",
        "defaultTitle": "累积变化量",
        "historyTitle": "累积变化量",
        "visibility": false,
        "reportTitle": "累积变化量",//报表自定义名称
        "export": false,////默认导出就设为true（报表）
        "infoTitle": "累积变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let totalStation = [
      {
        "property": "pointName",
        "defaultTitle": "测点",//系统定义的名称
        "historyTitle": "测点",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测点",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测点",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "periodNO",
        "defaultTitle": "周期",//系统定义的名称
        "historyTitle": "周期",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "周期",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "周期",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "measureCount",
        "defaultTitle": "测回",//系统定义的名称
        "historyTitle": "测回",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "测回",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测回",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "east",
        "defaultTitle": "E(m)",//系统定义的名称
        "historyTitle": "E(m)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "E(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "E(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 5,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "north",
        "defaultTitle": "N(m)",//系统定义的名称
        "historyTitle": "N(m)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "N(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "N(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 5,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "height",
        "defaultTitle": "H(m)",//系统定义的名称
        "historyTitle": "H(m)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "H(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "H(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 5,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "hA",
        "defaultTitle": "水平角",//系统定义的名称
        "historyTitle": "水平角",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "水平角",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "水平角",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 5,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "vA",
        "defaultTitle": "竖直角",//系统定义的名称
        "historyTitle": "竖直角",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "竖直角",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "竖直角",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 5,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "sD",
        "defaultTitle": "斜距(m)",//系统定义的名称
        "historyTitle": "斜距(m)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "斜距(m)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "斜距(m)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 5,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "gapEast",
        "defaultTitle": "∆E(mm)",//系统定义的名称
        "historyTitle": "∆E(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∆E(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∆E(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "gapNorth",
        "defaultTitle": "∆N(mm)",//系统定义的名称
        "historyTitle": "∆N(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∆N(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∆N(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "gapHeight",
        "defaultTitle": "∆H(mm)",//系统定义的名称
        "historyTitle": "∆H(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∆H(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∆H(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "gapPlane",
        "defaultTitle": "∆P(mm)",//系统定义的名称
        "historyTitle": "∆P(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∆P(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∆P(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationEast",
        "defaultTitle": "∑∆E(mm)",//系统定义的名称
        "historyTitle": "∑∆E(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∑∆E(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑∆E(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationNorth",
        "defaultTitle": "∑∆N(mm)",//系统定义的名称
        "historyTitle": "∑∆N(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∑∆N(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑∆N(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationHeight",
        "defaultTitle": "∑∆H(mm)",//系统定义的名称
        "historyTitle": "∑∆H(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∑∆H(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑∆H(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationPlane",
        "defaultTitle": "∑∆P(mm)",//系统定义的名称
        "historyTitle": "∑∆P(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "∑∆P(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "∑∆P(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "rateOfChangeEast",
        "defaultTitle": "变化速率E(mm/d)",//系统定义的名称
        "historyTitle": "变化速率E(mm/d)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "变化速率E(mm/d)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "变化速率E(mm/d)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "rateOfChangeNorth",
        "defaultTitle": "变化速率N(mm/d)",//系统定义的名称
        "historyTitle": "变化速率N(mm/d)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "变化速率N(mm/d)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "变化速率N(mm/d)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "rateOfChangeHeight",
        "defaultTitle": "变化速率H(mm/d)",//系统定义的名称
        "historyTitle": "变化速率H(mm/d)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "变化速率H(mm/d)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "变化速率H(mm/d)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "rateOfChangePlane",
        "defaultTitle": "变化速率P(mm/d)",//系统定义的名称
        "historyTitle": "变化速率P(mm/d)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "变化速率P(mm/d)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "变化速率P(mm/d)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "sectionAzimuth",
        "defaultTitle": "断面方位角",//系统定义的名称
        "historyTitle": "断面方位角",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "断面方位角",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "断面方位角",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "gapEast",
        "defaultTitle": "垂直于断面本次位移(mm)",//系统定义的名称
        "historyTitle": "垂直于断面本次位移(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "垂直于断面本次位移(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "垂直于断面本次位移(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "accumulationEast",
        "defaultTitle": "垂直于断面累积位移(mm)",//系统定义的名称
        "historyTitle": "垂直于断面累积位移(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "垂直于断面累积位移(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "垂直于断面累积位移(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "rateOfChangeEast",
        "defaultTitle": "垂直于断面变化速率(mm/d)",//系统定义的名称
        "historyTitle": "垂直于断面变化速率(mm/d)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "垂直于断面变化速率(mm/d)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "垂直于断面变化速率(mm/d)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "eastAccInitVal",
        "defaultTitle": "累积初始位移E(mm)",//系统定义的名称
        "historyTitle": "累积初始位移E(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "累积初始位移E(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积初始位移E(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "northAccInitVal",
        "defaultTitle": "累积初始位移N(mm)",//系统定义的名称
        "historyTitle": "累积初始位移N(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "累积初始位移N(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积初始位移N(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "heightAccInitVal",
        "defaultTitle": "累积初始位移H(mm)",//系统定义的名称
        "historyTitle": "累积初始位移H(mm)",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "累积初始位移H(mm)",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积初始位移H(mm)",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      }, {
        "property": "referencePeriods",
        "defaultTitle": "参考周期",//系统定义的名称
        "historyTitle": "参考周期",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "参考周期",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "参考周期",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dateTime",
        "defaultTitle": "时间",//系统定义的名称T
        "historyTitle": "时间",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let strainDeformationData = [
      {
        "property": "pointName",
        "defaultTitle": "点名",//系统定义的名称
        "historyTitle": "点名",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueStrainDef",
        "defaultTitle": "应变值",
        "historyTitle": "应变值",
        "visibility": true,
        "reportTitle": "应变值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "应变值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "changeStrainDef",
        "defaultTitle": "单次变化量",
        "historyTitle": "单次变化量",
        "visibility": true,
        "reportTitle": " 单次变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 单次变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 1,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "accumulationStrainDef",
        "defaultTitle": "累积变化量",
        "historyTitle": "累积变化量",
        "visibility": true,
        "reportTitle": "累积变化量",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "累积变化量",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "采集频率值",
        "historyTitle": "采集频率值",
        "visibility": true,
        "reportTitle": "采集频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "采集温度值",
        "historyTitle": "采集温度值",
        "visibility": true,
        "reportTitle": "采集温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "采集温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    let dataSensor = [
      {
        "property": "pointName",
        "defaultTitle": "点名",//系统定义的名称
        "historyTitle": "点名",//历史数据表头自定义名称
        "visibility": true, //默认显示就设为true（历史数据表）
        "reportTitle": "点名",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "点名",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "deviceNo",
        "defaultTitle": "传感器编号",
        "historyTitle": "传感器编号",
        "visibility": true,
        "reportTitle": "PH值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "PH值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueT",
        "defaultTitle": "温度",
        "historyTitle": "温度",
        "visibility": true,
        "reportTitle": " 温度",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 温度",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 1,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueA",
        "defaultTitle": "测量值",
        "historyTitle": "测量值",
        "visibility": true,
        "reportTitle": "测量值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "测量值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueB",
        "defaultTitle": "偏差值",
        "historyTitle": "偏差值",
        "visibility": true,
        "reportTitle": "偏差值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "偏差值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueC",
        "defaultTitle": "应变频率",
        "historyTitle": "应变频率",
        "visibility": true,
        "reportTitle": "应变频率",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "应变频率",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "valueD",
        "defaultTitle": "补偿频率",
        "historyTitle": "补偿频率",
        "visibility": true,
        "reportTitle": "补偿频率",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "补偿频率",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "mValue",
        "defaultTitle": "实测频率值",
        "historyTitle": "实测频率值",
        "visibility": false,
        "reportTitle": "实测频率值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测频率值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "tValue",
        "defaultTitle": "实测温度值",
        "historyTitle": "实测温度值",
        "visibility": false,
        "reportTitle": "实测温度值",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "实测温度值",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 2,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "unit",
        "defaultTitle": "单位",
        "historyTitle": "单位",
        "visibility": true,
        "reportTitle": " 单位",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": " 单位",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      },
      {
        "property": "dtime",
        "defaultTitle": "时间",
        "historyTitle": "时间",
        "visibility": true,
        "reportTitle": "时间",//报表自定义名称
        "export": true,////默认导出就设为true（报表）
        "infoTitle": "时间",//简报自定义名称
        "send": false,//简报发送该字段统计信息就设为true（简报）
        "keepDec": 0,//需要保留几位小数
        "conversion":1,
      }
    ];
    switch (mark) {
      case 1://水位
        return waterLevel;
        break;
      case 2://侧斜孔 注：（基坑-深层水平位移 尾矿-内部位移）
        // url = 'inDisplacementData';
        return inDisplacement;
        break;
      case 3://支撑轴力
        return brace;
        break;
      case 4://锚索
        return null;
        break;
      case 5://降雨量
        return ombrometer;
        break;
      case 6://裂缝
        return joint;
        break;
      case 7://表面位移(GPS)
        return Gps;
        break;
      case 8://干滩
        return dryShoal;
        break;
      case 9://浸润线
        return saturationLine;
        break;
      case 10://浊度
        return turbidity;
        break;
      case 11://渗流量
        return seepage;
        break;
      case 12://压力
        return stress;
        break;
      case 13://应力
        return strain;
        break;
      case 14://土壤水分
        return soilMoisture;
        break;
      case 15://水准高程
        return waterElevation;
        break;
      case 16://混凝土支撑
        return concreteBrace;
        break;
      case 17://压强
        return pressure;
        break;
      case 18://PH
        return ph;
        break;
      case 19://内部沉降
        return inSettlement;
        break;
      case 20://全站仪位移
      return totalStation;
      break;
      case 21://应变
        return strainDeformationData;
        break;
      case 50://原始数据
        return dataSensor;
        break;
      default:
    }
  }
}
export default Enum
