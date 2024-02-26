import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routes'
import pagesRouter from './pages'


const Router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [...pagesRouter],
})

Vue.use(VueRouter)
// 路由前置守卫
Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const now = Date.now();
    if (to.meta.auth) {
        if (token && now < tokenExpiration) {
            next();
        } else {
            // 令牌已过期，重定向到登录页面并清除令牌信息
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            next('/login');
        }
    } else {
        next()
    }
});

export default Router
