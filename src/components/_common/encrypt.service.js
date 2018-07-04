import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
/**
 * EncryptService
 * 加密服务
 */
export default {
    /**
     * 实体加密（RSA证书加密）
     * @param {*} model 请求实体
     * @param {*} falg true为coreApi加密  false为manageApi加密
     */
    DataRSAEncryption(model, falg = true) {
        let encryptionModel = {
            MerchantId: null,
            Data: null,
            EncryptKey: null
        };

        encryptionModel.MerchantId = process.env.MERCHANT_ID;

        let ran_aesKEY = this.GenerateAESKey();
        model.Ip = "167.0.12.31";
        model.Mac = "00-15-5D-7E-36-5B";
        model.IsValid = true;
        model.Version = "1.0.0";
        model.TimesTamp = this.GetTimesTamp();
        model.Sign = null;

        if (falg) {
            model.sign = this.GetSign(encryptionModel.MerchantId, model.TimesTamp, model.Ip, model.Mac);
        } else {
            model.sign = (CryptoJS.MD5(JSON.stringify(model) + process.env.USER_KEY) + "").toUpperCase();
        }

        encryptionModel.Data = this.AESEncrypt(JSON.stringify(model), rnd_aeskey);
        encryptionModel.EncryptKey = this.RSAEncrypt(rnd_aeskey);

        return encryptionModel;
    },
    /**
     * 明参实体加密
     * @param {*} model 请求实体
     * @param {*} falg true为coreApi加密  false为manageApi加密
     */
    DataEncryption(model, flag = true) {

        let rnd_aeskey = this.GenerateAESKey();

        model.MerchantId = process.env.MERCHANT_ID;
        model.Ip = "167.0.12.31";
        model.Mac = "00-15-5D-7E-36-5B";
        model.IsValid = true;
        model.Version = "1.0.0";
        model.TimesTamp = this.GetTimesTamp();
        model.Sign = null;
        if (flag) {
            model.Sign = this.GetSign(process.env.MERCHANT_ID, model.TimesTamp, model.Ip, model.Mac);
        } else {
            model.Sign = (CryptoJS.MD5(JSON.stringify(model) + process.env.USER_KEY) + "").toUpperCase();
        }

        return model;
    },
    /**
     * 获取Md5加密sign值
     * @param {*} MerchantId 商户编号
     * @param {*} TimesTamp 时间戳
     * @param {*} Ip IP地址
     * @param {*} Mac MAC
     */
    GetSign(MerchantId, TimesTamp, Ip, Mac) {
        let jsonData = 'MerchantId=' + MerchantId + "&TimesTamp=" + TimesTamp + "&Ip=" + Ip + "&Mac=" + Mac + process.env.USER_KEY;
        let sign = CryptoJS.MD5(jsonData) + "";
        return sign.toUpperCase();
    },
    /**
     * 获取时间戳
     */
    GetTimesTamp() {
        let date = new Date();
        let timesTamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return timesTamp;
    },
    /**
     * AES数据加密
     * @param {*} data 加密数据
     * @param {*} key 16位AES_KEY
     */
    AESEncrypt(data, key) {
        let k = CryptoJS.enc.Utf8.parse(key);
        let i = CryptoJS.enc.Utf8.parse(key);

        let encrypted = CryptoJS.AES.encrypt(data, k, {
            iv: i,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        let encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString());
        let encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

        return encryptedBase64Str;
    },
    /**
     * AES数据解密
     * @param {*} data 要解密的数据
     * @param {*} key 16位AES_KEY
     */
    AESDecrypt(data, key) {
        let k = CryptoJS.enc.Utf8.parse(key);
        let i = CryptoJS.enc.Utf8.parse(key);

        let decrypted = CryptoJS.AES.decrypt(data, k, {
            iv: i,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        let decryptedUtf8Str = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedUtf8Str;
    },
    /**
     * 生成16位AES - KEY
     */
    GenerateAESKey() {
        let KEY = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let keyLength = KEY.length;
        let m = 0;
        let n = keyLength - 1;
        let str = "";
        for (let index = 0; index < 16; index++) {
            let ran = Math.random() * (n - m) + m;
            str = str + KEY[parseInt(ran.toString())];
        }

        return str;
    },
    /**
     * RSA加密
     * @param {*} aesKey AES 加密数据
     */
    RSAEncrypt(aesKey) {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(process.env.PUBLIC_KEY);
        let aeskey = encrypt.encrypt(aesKey);
        return aeskey;
    },
    /**
     * URL 参数加密
     * @param {*} str 要加密的参数
     */
    UrlEncode(str) {
        return encodeURI(str);
    },
    /**
     * URL 参数解密
     * @param {*} str 要解密的参数
     */
    UrlDecode(str) {
        return decodeURI(str);
    },
    /**
     * 生成CheckValue
     * @param {*} str 要解密的参数
     */
    GetCheckValue(card) {
        debugger;
        return CryptoJS.MD5(card.version + card.cust_id + card.ord_id + card.sub_mer_id + card.subject + card.gate_id + Number(card.trans_amt).toFixed(2) + card.card_id + card.mobile_no + card.acct_name + card.acct_idcard + card.bank_num + card.acct_cardno + card.trade_rate + card.draw_fee + card.ret_url + card.bg_ret_url + card.mer_priv + card.extension + "2808618585792A6BE6C1DCDED39C3684") + "";
    }
}