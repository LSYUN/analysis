/**
 * Created by Administrator on 2018/2/24.
 */


class LocalStorage {
  static set(key, value) {
    if (this.get(key)) {
      this.remove(key);
      window.localStorage.setItem(key, value);
    }
  }

  static get(key) {
    var val = window.localStorage.getItem(key);
    return val === undefined ? null : val;
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }

  static clear() {
    window.localStorage.clear();
  }

  static expires(before, after) {
    var over = false;
    if (before) before = new Date(before).getTime();
    if (after) after = new Date(after).getTime();
    if (before > after) {
      this.clear();
      over = true;
    }
    return over;
  }
}
export default new LocalStorage();
