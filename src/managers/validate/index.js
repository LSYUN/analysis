/**
 * Created by Administrator on 2018/2/8.
 */
import "../../../static/plugins/Vee-Validate/bundle.css";
import VeeValidate, {Validator} from "vee-validate";
const dictionary = {
  zh_CN: {
    messages: {
      alpha: () => '只能输入字母',
      email: () => '邮箱格式不正确哦',
      numeric: () => '号码格式不正确哦',
      required: () => '这是必填的哦',
      alpha_num: () => ''
    }
  }
};

const config = {
  // errorBagName: 'errors',
  // fieldsBagName: 'fields',
  // delay: 100,
  // locale: 'zh_CN',
  // strict: true,
  enableAutoClasses: true,
  events: 'change',
  inject: true
};
const myRule = {
  getMessage(field, params, data) {
    return (data && data.message) || 'Something went wrong';
  },
  validate(value) {
    return new Promise(resolve => {
      resolve({
        valid: value === 'trigger' ? false : !!value,
        data: value !== 'trigger' ? undefined : {message: 'Not this value'}
      });
    });
  }
};
Validator.extend('truthy', {
  getMessage: field => 'The ' + field + ' value is not truthy.',
  validate: value => !!value
});
let instance = new Validator({trueField: 'truthy'});

// Also there is an instance 'extend' method for convience.
instance.extend('falsy', (value) => !value);

instance.attach({
  name: 'falseField',
  rules: 'falsy'
});
Validator.localize("zh", dictionary.zh_CN);
export default {VeeValidate, config};
