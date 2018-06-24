import EnumService from "./enum.service";
/**
 *  UtilService
 *  工具类
 */
export default {
    /**
     * 添加/修改本地存储
     * @param key 键
     * @param value 值
     */
    SetLocalStorage(key, value) {
        localStorage.setItem(key, value);
    },
    /**
     * 通过键读取本地存储
     * @param key 键
     */
    GetLocalStorage(key) {
        if (key === EnumService.CGT_ALI_USER) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return localStorage.getItem(key);
        }
    },
    /**
     * 通过键删除本地存储
     * @param key 键
     */
    RemoveLocalStorage(key) {
        localStorage.removeItem(key);
    },
    /**
     * 删除所有本地存储
     */
    ClearLocalStorage() {
        localStorage.clear();
    },
    /**
     * 通过键判断本地存储是否存在
     * @param key 键
     */
    IsExistLocalStorage(key) {
        let value = this.GetLocalStorage(key);
        return (value !== null && value !== '');
    },
    /**
     * base64转blob
     * @param {*} base64 base64字符串 
     * @return url地址
     */
    excelBase64ToBlob(base64) {
        let base = atob(base64);
        let length = base.length;
        let u8arr = new Uint8Array(length);
        while (length--) {
            u8arr[length] = base.charCodeAt(length);
        }
        let blob = new Blob([u8arr], {
            type: "application/vnd.ms-excel"
        });
        return URL.createObjectURL(blob);
    },
    /**
     * 生成交易号
     * @return url地址
     */
    GenerateOrderIdByTime() {
        let date = new Date();
        let orderId = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds()
        "";
        return orderId;
    }
}