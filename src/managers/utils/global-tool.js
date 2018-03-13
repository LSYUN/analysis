/**
 * Created by Administrator on 2017/8/17.
 */
class global {
  /***
   * 首字母转大写
   */
  static setUpperCase(str) {
    let strArr = str.split('');
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join('');
  }

  /***
   * unix time to yyyy-mm-dd hh:min:ss
   * @param timestamp
   * @param type
   * @returns {*}
   */
  static formatDate(date, type) {
    try {
      let d = new Date(date), //(date instanceof Number) ? new Date(date) : date,
        // let d = new Date(Number(date)),	// Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
        hh = ('0' + d.getHours()).slice(-2),
        min = ('0' + d.getMinutes()).slice(-2),
        ss = ('0' + d.getSeconds()).slice(-2),
        time;
      switch (parseInt(type)) {
        case 1:
          time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
          break;
        case 2:
          time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':00';
          break;
        case 3:
          time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':00:00';
          break;
        case 4:
          time = yyyy + '-' + mm + '-' + dd;
          break;
        default:
          time = yyyy + '-' + mm + '-' + dd;
      }
      return time;
    } catch (e) {
      console.log(e);
    }
  }

  static getAnotherDate(localTime, zone, type) {
    let local = '';
    try {
      let unix = new Date(localTime).getTime() + zone; //增减时间
      local = this.formatDate(unix, type);
    } catch (e) {
      console.log(e);
    }
    return local;
  }

  static daysOfWeek(){
    return 7;
  }

  static daysOfMonth(localTime, minus) {
    try {
      let days = null,
        year = new Date(localTime).getYear(),
        month = parseInt(new Date(localTime).getMonth()) + 1;
      month = minus ? month - 1 : month;
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          days = 31;
          break;
        case 2:
          days = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 29 : 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          days = 30;
          break;
      }
      return days;
    } catch (e) {
      console.log(e);
    }
  }

  static daysOfYear(localTime) {
    try {
      let year = new Date(localTime).getFullYear();
      return ((year % 4 === 0 && year % 100 !== 0 )|| (year % 400 === 0)) ? 366 : 365;
    } catch (e) {
      console.log(e);
    }
  }

  static toFixed(data, num = 2, unit) {
    if (data && data !== 0) {
      if (unit) {
        return parseFloat((data * unit).toFixed(num));
      }
      return parseFloat(data.toFixed(num));
    }
    return data;
  }
}
export default global;