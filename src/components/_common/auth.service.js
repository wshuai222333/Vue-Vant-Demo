import EnumService from "./enum.service";
import UtilService from "./util.service";
import { Toast } from "vant";
import Service from "../_common/index";
/** 
 * AuthService
 * 验证服务
 */
export default {
    /**
     * AuthService
     * 路由守卫，守卫用户登录
     * @param to Router-即将要进入的目标
     * @param from Route-当前导航正要离开的路由
     * @param next Function-一定要调用该方法 resolve 这个钩子。执行效果依赖 next 方法的调用参数
     *        next():进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
     *        next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
     *        next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
     *        next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
     * 确保要调用 next 方法，否则钩子就不会被 resolved。
     */
    loginAuth: (router, routers) => {

        //let IsLogin = UtilService.IsExistLocalStorage(EnumService.CGT_ALI_USER);

        router.beforeEach((to, from, next) => {
            let nextRoute = [];

            //循环所有路由，加入到新的数组
            routers.forEach(element => {
                if (element.name == "/") {
                    element.children.forEach(elements => {
                        nextRoute.push(elements.name);
                    });
                }
                if (element.name != "login") {
                    nextRoute.push(element.name);
                }

            });

            let IsLogin = Service.Util.IsExistLocalStorage(Service.Enum.CGT_ALI_USER);
            //console.log(nextRoute);
            //判断当前路由是否在配置内
            if (nextRoute.indexOf(to.name) > -1) {
                // if (!IsLogin && to.name !== "home" && to.name !== "registered") {
                //     Toast("请先登录平台");
                //     router.push("Login");
                // }
                if (!IsLogin && to.name !== "registered") {
                    Toast("请先登录平台");
                    router.push("Login");
                }
            }
            //如果当前路由为logo则判断是否登录
            if (to.name === "login") {
                if (IsLogin) {
                    router.push("/");
                }
            }
            next();
        });
    }
};