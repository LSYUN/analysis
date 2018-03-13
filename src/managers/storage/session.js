/**
 * Created by a on 2016/9/22.
 */
class Session {

  static set(key, data) {
    sessionStorage.setItem(key, data);
  }

  static get(key) {
    return sessionStorage.getItem(key);
  }

  static setObj(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  static getObj(key) {
    try {
      const data = JSON.parse(sessionStorage.getItem(key));
      return data;
    } catch (e) {
      return null;
    }
  }
}

export default Session;
