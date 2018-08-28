import Vue from 'vue'
import VeeValidate, {
    Validator
} from 'vee-validate';
/**
 * 验证配置
 */
const config = {
    aria: true,
    classNames: {},
    classes: false,
    delay: 0,
    dictionary: null,
    errorBagName: 'errors', // change if property conflicts
    events: 'input|blur',
    fieldsBagName: 'fields',
    i18n: null, // the vue-i18n plugin instance
    i18nRootKey: 'validations', // the nested key under which the validation messsages will be located
    inject: true,
    locale: 'zh_CN',
    strict: true,
    validity: false,
};
/** 
 * 表单验证
 */
export default {
    LoadValidator() {
        Vue.use(VeeValidate, config);
        Validator.localize({
            zh_CN: {
                messages: {
                    required: function(name) {
                        // return "*" + document.getElementsByName(name)[0].placeholder + "不能为空！";
                        return "*不能为空！"
                    },
                }
            }
        });
        Validator.extend('email', {
            getMessage: function() {
                return "*邮箱格式无效！"
            },
            validate: function(value) {
                return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
            }
        });
        Validator.extend('phone', {
            getMessage: function() {
                return "*手机格式无效！"
            },
            validate: function(value) {
                return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value);
            }
        });
        Validator.extend('username', {
            getMessage: function() {
                return "*用户名无效！"
            },
            validate: function(value) {
                return /^[a-zA-Z0-9]{6,16}$/.test(value);
            }
        });
        Validator.extend('zhname', {
            getMessage: function() {
                return "*中文名称无效！"
            },
            validate: function(value) {
                return /[\u4e00-\u9fa5]/.test(value);
            }
        });
        Validator.extend('password', {
            getMessage: function() {
                return "*密码6-16位！"
            },
            validate: function(value) {
                return /^[a-zA-Z0-9]{6,16}$/.test(value);
            }
        });
        Validator.extend('password2', {
            getMessage: function() {
                return "*密码输入不一致！"
            },
            validate: function(value) {
                return document.getElementsByName("userpwd")[0].value === value;
            }
        });
        Validator.extend('digital', {
            getMessage: function() {
                return "*只能是整数字符！"
            },
            validate: function(value) {
                return /^\d{1,100}$/.test(value);
            }
        });
        Validator.extend('idcard', {
            getMessage: function() {
                return "*身份证格式无效！"
            },
            validate: function(value) {
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value);
            }
        });
        Validator.extend('numberaftertwo', {
            getMessage: function() {
                return "*小数点后两位以内数字！例如：输入4.50或5.50"
            },
            validate: function(value) {
                return /^(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)$/.test(value);
            }
        });
    }
}