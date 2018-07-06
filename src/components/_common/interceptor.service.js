import Vue from 'vue'
import axios from "axios";
/** 
 * http请求拦截器 axios版本
 * InterceptorService
 */
export default {
    LoadAxios() {
        /** 
         * `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
         * 如果请求话费了超过 `timeout` 的时间，请求将被中断
         * 
         * `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
         * 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
         */

        //是否执行请求超时后重新调用接口
        let isTimeout = false;

        //请求超时时限 我设置60000毫秒
        axios.defaults.timeout = 60000;

        //process.env.NODE_ENV="";
        axios.defaults.baseURL = "http://118.190.85.204:7002";
        //axios.defaults.baseURL = "http://localhost:7002";
        //请求次数
        axios.defaults.retry = 4;

        //请求的间隙
        axios.defaults.retryDelay = 1000;

        /** 
         * 请求拦截
         * http request 拦截器
         */
        axios.interceptors.request.use(
            config => {
                return config;
            },
            error => {
                console.log(error);
                Vue.tip("request:" + error);
                return Promise.reject(error);
            }
        );
        /** 
         * 响应拦截
         * http response 拦截器
         */
        axios.interceptors.response.use(
            response => {
                return {
                    data: response.data,
                    status: response.status
                };
            },
            error => {
                //请求超时
                if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
                    if (isTimeout) {
                        var config = error.config;
                        config.__retryCount = config.__retryCount || 0;

                        if (config.__retryCount >= config.retry) {
                            // Reject with the error
                            // window.location.reload();
                            return Promise.reject(error);
                        }

                        // Increase the retry count
                        config.__retryCount += 1;

                        // Create new promise to handle exponential backoff
                        var backoff = new Promise(function(resolve) {
                            setTimeout(function() {
                                // console.log('resolve');
                                resolve();
                            }, config.retryDelay || 1);
                        });

                        return backoff.then(function() {
                            return axios(config);
                        });
                    } else {
                        Vue.tip('请求超时，请重试！');
                        return Promise.reject(error);
                    }
                } else {
                    let message = "";
                    if (error.response) {
                        //对请求状态做处理
                        let status = error.response.status;
                        switch (status) {
                            case 400: //Bad Request：服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发送请求
                                message += "400";
                                break;
                            case 401: //Unauthorized：请求未授权
                                //清除token信息并跳转到登录页面
                                message += "401";
                                break;
                            case 403: //Forbidden：禁止访问
                                message += "403";
                                break;
                            case 404: //Not Found：找不到如何与URI相匹配的资源
                                message += "404";
                                break;
                            case 500: //Internal Server Error：最常见的服务器端错误
                                message += "500";
                                break;
                            case 503: //Service Unavailable：服务器端暂时无法处理请求（可能是过载或维护）
                                message += "503";
                                break;
                            case 504: //Gateway Time-out：nginx报出来的错误，一般是nginx做为反向代理服务器的时候，所连接的应用服务器譬如tomcat无相应导致的 
                                message += "504";
                                break;
                        }
                    }
                    message += ":" + error.response.data;
                    console.log(message);
                    Vue.tip("response:" + message);
                    return Promise.reject(error);
                }
            }
        );
        Vue.http = Vue.prototype.$http = axios;
    }
}