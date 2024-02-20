import axios from 'axios';
import qs from 'qs';
import common from '@/assets/js/common.js'
// import { Modal } from 'view-design'

const env = process.env.NODE_ENV;
const hashtemp = common.gethashcode()
localStorage.getItem("hash") ? "" : localStorage.setItem("hash", hashtemp)
const hash = localStorage.getItem("hash");
let util = {};

let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
//中断请求
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url.split('?')[0] + '&' + config.method) {
            //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //数组移除当前请求
        }
    }
}

function doLogin() {
    // Modal.confirm({
    //     title: "提示",
    //     content: "请先登录!",
    //     onOk: () => {
    //         window.rootapp.$EventBus.$emit('open-login');
    //     }
    // });
}
const timeOut = 300000;
const ajaxUrl =
    env === 'development' ?
        '' //开发地址
        :
        env === 'production' ?
            '/' //发布地址
            :
            '/'; //debug地址
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: timeOut, //30000
    withCredentials: true,
    headers: {
        //请求头
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Headers': 'Authorization',
        // "Authorization":window.token
    },
});
util.ajax.interceptors.request.use(function (response) {
    //发送重复请求时，把上一个pending给取消，避免造成重复请求，时长不一样，导致数据不正确
    //异步事件触发了两次，就需要最快2s完成，假设第一次异步3s返回，第二次异步0.5秒返回；那出现的情况就是，第一次触发的3s异步，1s内没有返回，1s后第二次触发异步，第一次的异步还没有返回，第二次的异步就就开始了，0.5秒后第二次异步返回了，但是最终结果响应的是第一次的异步
    removePending(response); //在一个axios发送前执行一下取消操作
    response.cancelToken = new cancelToken((c) => {
        //需要中断哪个请求，就往里面添加
        if (response.url == "/api/bas/bid/bidCatalog") {
            // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法+"加参数"，目的是相同参数，相同url重复请求才终止上一个请求
            pending.push({ u: response.url.split('?')[0] + '&' + response.method, f: c }); //config.data为请求参数
        }
    });
    return response

})
util.ajax.interceptors.response.use(function (response) {
    const config = response.config
    const { code } = response.data
    const prefix = localStorage.getItem("appName");
    // 对响应数据做点什么
    if (code === 401) {
        if (!isRefreshing) {
            isRefreshing = true
            return refreshToken().then(res => {
                // 刷新token成功，将最新的token更新到header中，同时保存在localStorage中
                var access_token = res.access_token;
                var refresh_token = res.refresh_token;
                window.token = "bearer " + access_token;
                window.refreshtoken = refresh_token;
                localStorage.setItem(prefix + "authToken", access_token);
                localStorage.setItem(prefix + "refreshToken", refresh_token);
                document.cookie = 'Authorization=' + (localStorage.getItem(prefix + 'authToken') || "") + ";path=/;"

                // 重置一下配置
                config.headers['Authorization'] = window.token
                // config.baseURL = '' // url已经带上了/api，避免出现/api/api的情况
                setTimeout(() => {
                    // 已经刷新了token，将所有队列中的请求进行重试
                    requests.forEach(cb => cb(window.token))
                    // 重试完了别忘了清空这个队列
                    requests = []
                }, 2000)
                // 重试当前请求并返回promise
                return util.ajax(config)
            }).catch(res => {
                // console.error('refreshtoken error =>', res)
                //刷新token失败，跳转到首页重新登录

                if (prefix !== "wechat") {
                    window.token = "";
                    window.displayName = ""
                    window.refreshtoken = "";
                    localStorage.removeItem(prefix + "authToken");
                    localStorage.removeItem(prefix + "refreshToken");
                    localStorage.removeItem("userinfo");
                    if (prefix == "pes") {
                        window.rootapp.go({ pageId: localStorage.getItem("homepageid") });
                    } else {
                        window.rootapp.go({ url: '/login' })
                    }
                }
            }).finally(() => {
                isRefreshing = false
            })
        } else {
            // 正在刷新token，返回一个未执行resolve的promise
            return new Promise((resolve) => {

                requests.push((token) => {
                    config.headers['Authorization'] = token
                    resolve(util.ajax(config))
                })
            })
        }
    }
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

function refreshToken() {
    const prefix = localStorage.getItem("appName");
    return util.post('/proxy/oauth/token', {
        client_id: "client-app",
        client_secret: "123456",
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem(prefix + "refreshToken")
    }).then(res => res.entity)
}


util.post = function (url, data, options) {
    let param = common.deepCopy(data)
    const prefix = localStorage.getItem("appName");

    for (let key in param) {
        if (param[key] instanceof Object) {
            param[key] = JSON.stringify(param[key])
        }
    }
    param = qs.stringify(param, { indices: false });
    var auth = localStorage.getItem(prefix + 'authToken') || "";
    document.cookie = 'Authorization=' + auth + ";path=/;"
    document.cookie = 'displayName=' + window.displayName + ";path=/;"
    return util.ajax(Object.assign({
        url, //请求地址，会加上配置的前缀地址
        method: 'post', //请求类型
        dataType: 'json',
        data: param,
        headers: { //请求头
            "Authorization": window.token,
            "Signature": hash
        }
    }, options || {}))
        .then(response => { //成功
            var data = response.data;
            if (response && response.status === "4001") {
                window.location.href = response.url + "?callback=" + window.location.href;
            } else if (data.code === 100) {
                return data;
            } else if (data.code === 200) {
                // 请求错误
                return data;
            } else if (data.code === 300) {
                // console.log(url)
                // 页面跳转处理
                // ...
                // 无数据权限
                if (url === "/api/decoration/page/getPageInfo") {
                    return data;
                } else {
                    if (localStorage.getItem(prefix + 'authToken')) {
                        // Modal.confirm({
                        //     title: "提示",
                        //     content: "无权限，请联系管理员userservice@sunther.com",
                        //     onOk: () => {
                        //         // window.rootapp.$EventBus.$emit('open-login');
                        //     }
                        // });
                    } else {
                        doLogin();
                    }
                    return false;
                }
            } else if (data.code === 400) {
                if (prefix == "pes") {

                    util.get("/api/user_service/user/getHomePageId").then(res => {
                        if (res.code === 100) {
                            localStorage.setItem("homepageid", res.entity);
                            window.rootapp.go({ pageId: localStorage.getItem("homepageid") });
                        }
                    })
                } else if (prefix !== "wechat") {
                    window.token = "";
                    window.displayName = ""
                    window.refreshtoken = "";
                    localStorage.removeItem(prefix + "authToken");
                    localStorage.removeItem(prefix + "refreshToken");
                    localStorage.removeItem("userinfo");
                    //  window.location.href = configUrlObjectOut.loginInUrl
                    window.rootapp.go({ url: '/login' })
                }
                return false;
            } else {
                return data;
            }
        })
        .catch(error => { //失败
            return error;
        });
};

util.get = function (url) {
    const prefix = localStorage.getItem("appName");
    if (url.indexOf("?") !== -1) {
        url = url + '&' + Math.random();
    } else {
        url = url + "?" + Math.random();
    }
    document.cookie = 'Authorization=' + (window.token || "") + ";path=/;"
    document.cookie = 'displayName=' + window.displayName + ";path=/;"
    return util
        .ajax({
            url, //请求地址，会加上配置的前缀地址
            method: 'get', //请求类型
            headers: {
                //请求头
                Authorization: window.token,
                token: window.token,
                "Signature": hash
            }
        })
        .then((response) => {
            //成功
            var data = response.data;
            if (response && response.status === '4001') {
                window.location.href = response.url + '?callback=' + window.location.href;
            } else if (data.code === 100) {
                return data;
            } else if (data.code === 200) {
                // 请求错误
                return data;
            } else if (data.code === 300) {
                // 页面跳转处理
                // ...
                // 无权限
                // return false;
                if (url === "/api/decoration/page/getPageInfo") {
                    return data;
                } else {
                    if (localStorage.getItem(prefix + 'authToken')) {
                        // Modal.confirm({
                        //     title: "提示",
                        //     content: "无权限，请联系管理员userservice@sunther.com",
                        //     onOk: () => {
                        //         // window.rootapp.$EventBus.$emit('open-login');
                        //     }
                        // });
                    } else {
                        doLogin()
                    }
                    return false;
                }
            } else if (data.code === 400) {
                if (prefix == "pes") {

                    util.get("/api/user_service/user/getHomePageId").then(res => {
                        if (res.code === 100) {
                            localStorage.setItem("homepageid", res.entity);
                            window.rootapp.go({ pageId: localStorage.getItem("homepageid") });
                        }
                    })
                } else if (prefix !== "wechat") {
                    window.token = "";
                    window.displayName = ""
                    window.refreshtoken = "";
                    localStorage.removeItem(prefix + "authToken");
                    localStorage.removeItem(prefix + "refreshToken");
                    localStorage.removeItem("userinfo");
                    window.rootapp.go({ url: '/login' })
                }
                // window.location.href = configUrlObjectOut.loginInUrl
                return false;
            } else {
                return response;
            }
        })
        .catch((error) => {
            //失败
            console.log(error);
            return error;
        });
};
util.postjson = function (url, data) { //后台需要接json 格式的数据
    const prefix = localStorage.getItem("appName");

    return util.ajax({
        url, //请求地址，会加上配置的前缀地址
        method: 'post', //请求类型
        data: JSON.stringify(data),
        type: 'json',
        headers: {
            //请求头
            "Authorization": window.token,
            "Signature": hash,
            'Content-Type': "application/json"
        }
    })
        .then((response) => {
            //成功
            var data = response.data;
            if (response && response.status === '4001') {
                window.location.href = response.url + '?callback=' + window.location.href;
            } else if (data.code === 100) {
                return data;
            } else if (data.code === 200) {
                // 请求错误
                return data;
            } else if (data.code === 300) {
                // 页面跳转处理
                // ...
                // 无权限
                // return false;
                if (url === "/api/decoration/page/getPageInfo") {
                    return data;
                } else {
                    if (localStorage.getItem(prefix + 'authToken')) {
                        // Modal.confirm({
                        //     title: "提示",
                        //     content: "无权限，请联系管理员userservice@sunther.com",
                        //     onOk: () => {
                        //         // window.rootapp.$EventBus.$emit('open-login');
                        //     }
                        // });
                    } else {
                        doLogin();
                    }
                    return false;
                }
            } else if (data.code === 400) {
                if (prefix !== "wechat") {
                    window.token = "";
                    window.displayName = ""
                    window.refreshtoken = "";
                    localStorage.removeItem(prefix + "authToken");
                    localStorage.removeItem(prefix + "refreshToken");
                    localStorage.removeItem("userinfo");
                    window.rootapp.go({ url: '/login' })
                }
                // window.location.href = configUrlObjectOut.loginInUrl
                return false;
            }
        })
        .catch((error) => {
            return error;
        })
}
// 上传数据，包含图片，二进制流
util.postFormData = function (url, data) {
    const prefix = localStorage.getItem("appName");

    var formdata = new FormData();
    for (var key in data) {
        var v = data[key];
        if (key === 'file' && v.length) {
            v.forEach((value, i) => {
                formdata.append('file', value);
            })
        } else {
            formdata.append(key, v)
        }
    }
    const ajax = axios.create({
        baseURL: ajaxUrl,
        // 上传文件超时时间为5分钟
        timeout: 3000 * 60 * 5, //5分钟超时
        withCredentials: true,
        headers: {
            //请求头
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Access-Control-Allow-Headers': 'Authorization',
            // "Authorization":window.token
        },
    });
    return ajax({
        url, //请求地址，会加上配置的前缀地址
        method: 'post', //请求类型
        data: formdata,
        headers: {
            //请求头
            "Authorization": window.token,
            'Content-Type': 'multipart/form-data',
            "Signature": hash
        }
    }).then(response => {
        var data = response.data;
        if (response && response.status === "4001") {
            window.location.href = response.url + "?callback=" + window.location.href;
        } else if (data.code === 100) {
            return data;
        } else if (data.code === 200) {
            // 请求错误
            return data;
        } else if (data.code === 300) {
            // 页面跳转处理
            // ...
            // 无权限
            //   return false;
            if (url === "/api/decoration/page/getPageInfo") {
                return data;
            } else {
                if (localStorage.getItem(prefix + 'authToken')) {
                    // Modal.confirm({
                    //     title: "提示",
                    //     content: "无权限，请联系管理员userservice@sunther.com",
                    //     onOk: () => {
                    //         // window.rootapp.$EventBus.$emit('open-login');
                    //     }
                    // });
                } else {
                    doLogin();
                }
                return false;
            }
        } else if (data.code === 400) {
            // console.log(window.rootapp);
            if (prefix !== "wechat") {
                window.token = "";
                window.displayName = ""
                window.refreshtoken = "";
                localStorage.removeItem(prefix + "authToken");
                localStorage.removeItem(prefix + "refreshToken");
                localStorage.removeItem("userinfo");
                window.rootapp.go({ url: '/login' })
            }
            // window.location.href = configUrlObjectOut.loginInUrl
            return false;
        }
    })
}
// 零时，获取前台json文件用
util.getjson = function (url) {
    return util
        .ajax({
            url, //请求地址，会加上配置的前缀地址
            method: 'get', //请求类型
            headers: {
                //请求头
                Authorization: window.token,
                "Signature": hash
            }
        })
        .then((response) => {
            //成功
            var data = response.data;
            return data;
        })
        .catch((error) => {
            //失败
            console.log(error);
            return error;
        });
};
//用于接收解析二进制图
util.getimg = function (url, data) {
    const prefix = localStorage.getItem("appName");

    let param = common.deepCopy(data)
    for (let key in param) {
        if (param[key] instanceof Object) {
            param[key] = JSON.stringify(param[key])
        }
    }
    param = qs.stringify(param, { indices: false });
    document.cookie = 'Authorization=' + (localStorage.getItem(prefix + 'authToken') || "") + ";path=/"
    document.cookie = 'displayName=' + window.displayName + ";path=/;"
    return util.ajax({
        url, //请求地址，会加上配置的前缀地址
        method: 'get', //请求类型
        dataType: 'json',
        data: param,
        responseType: 'blob', //解析二进制图片
        headers: { //请求头
            "Authorization": window.token,
            "Signature": hash
        }
    })
        .then((response) => {
            //成功
            var data = response.data;

            if (response && response.status === '4001') {
                window.location.href = response.url + '?callback=' + window.location.href;
            } else if (data.code === 100) {
                return data;
            } else if (data.code === 200) {
                // 请求错误
                return false;
            } else if (data.code === 300) {
                // 页面跳转处理
                // ...
                // 无权限
                // return false;
                if (url === "/api/decoration/page/getPageInfo") {
                    return data;
                } else {
                    if (localStorage.getItem(prefix + 'authToken')) {
                        // Modal.confirm({
                        //     title: "提示",
                        //     content: "无权限，请联系管理员userservice@sunther.com",
                        //     onOk: () => {
                        //         // window.rootapp.$EventBus.$emit('open-login');
                        //     }
                        // });
                    } else {
                        doLogin();
                    }
                    return false;
                }
            } else if (data.code === 400) {
                if (prefix !== "wechat") {
                    window.token = "";
                    window.displayName = ""
                    window.refreshtoken = "";
                    localStorage.removeItem(prefix + "authToken");
                    localStorage.removeItem(prefix + "refreshToken");
                    localStorage.removeItem("userinfo");
                    window.rootapp.go({ url: '/login' })
                }
                // window.location.href = configUrlObjectOut.loginInUrl
                return false;
            } else {
                return response
            }
        })
        .catch((error) => {
            return error;
        })
}
// 用于下载文件,get
util.download = function (url) {
    let dom = document.createElement('a')
    dom.href = url
    dom.style.display = 'none'
    document.body.appendChild(dom);
    dom.click();
    dom.parentNode.removeChild(dom);
    window.URL.revokeObjectURL(url);
};

util.pesdownload = function (url, type, ids) {
    util.get('/api/user_service/user/validateToken')
        .then((response) => {
            if (response.code === 100) {
                window.location.href = url;
            }
        })
}
// 验证+下载
util.validDownload = function (url, type, ids) {
    util.get('/api/user_service/user/validateToken')
        .then((response) => {
            if (response.code === 100) {
                // localStorage.removeItem('isClickTabPesMobile')
                // const prefix = localStorage.getItem("appName");
                // if(prefix=='wechat'&&type=="下载") {
                //         let wechatUrl
                //         if(url.indexOf("?") > -1){
                //             wechatUrl = url+ "&access_token=" + localStorage.getItem(localStorage.getItem('appName')+'authToken');
                //         }else{
                //             wechatUrl = url+ "?access_token=" + localStorage.getItem(localStorage.getItem('appName')+'authToken');
                //         }
                //         let access_token =  localStorage.getItem(localStorage.getItem('appName')+'authToken');
                //         console.log(wechatUrl)
                //         wx.miniProgram.navigateTo({url: '/pages/downFile/downFile?wechatIds='+ids+"&access_token="+access_token}) // 跳转小程序的页面
                // }else{
                const prefix = localStorage.getItem("appName");
                if (prefix == 'wechat') {
                    //处理pdf预览，没有返回按钮，手机无法返回的问题
                    let u = navigator.userAgent;
                    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    let newUrl
                    let decodeUrl = decodeURIComponent(url)
                    let index = decodeUrl.indexOf("&fileDownNameOwnName=")
                    let stdNoUrl
                    if (index > -1) {
                        stdNoUrl = decodeUrl.substring(index)
                    }
                    let stdNo = stdNoUrl && stdNoUrl.split("=")[1]
                    if (isAndroid) {
                        //这个是安卓操作系统
                        if (url.indexOf("?") > -1) {
                            // window.open(url + "&access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken'));
                            newUrl = url + "&access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken');
                        } else {
                            // window.open(url + "?access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken'));
                            newUrl = url + "?access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken');
                        }
                    }
                    if (isIOS) {
                        //这个是ios操作系统
                        if (url.indexOf("?") > -1) {
                            // window.location.href = url + "&access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken');
                            newUrl = url + "&access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken');
                        } else {
                            // window.location.href = url + "?access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken');
                            newUrl = url + "?access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken');
                        }
                    }

                    $("body").append(`
							 <div id="pdfViewContainer">
								 <div>
									 <span id="closePDfview">
									 <i class="mintui mintui-back"></i>
									 </span>
									 <span id="pdfStdNoView">${stdNo}</span>
								 </div>
								<iframe   src='${newUrl}' />
							 </div>`);

                } else {
                    if (url.indexOf("?") > -1) {
                        window.open(url + "&access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken'));
                    } else {
                        window.open(url + "?access_token=" + localStorage.getItem(localStorage.getItem('appName') + 'authToken'));
                    }
                }

                // }

            }
            $("#closePDfview").click(() => {
                $("#pdfViewContainer").remove();
            })

        })

}
//导出文件
util.exportfile = function (url, params) {
    return axios({
        // 用axios发送post请求
        method: "post",
        url: url, // 请求地址
        data: params,
        headers: {
            //请求头
            Authorization: window.token,
            "Content-Type": "application/json",
        },
        responseType: "blob", // 表明返回服务器返回的数据类型
    }).then((res) => {
        if (res.data.type === 'application/json') {
            // console.log("导出失败")
            // Modal.error({
            //     title: "提示",
            //     content: "导出失败!",
            //     onOk: () => {}
            // });
        } else {

            // 处理返回的文件流
            const content = res.data;
            const blob = new Blob([content]);
            var fileName = res.headers //下载后文件名
            fileName = fileName["content-disposition"]
            fileName = fileName.split(";")[1].split("filename=")[1];
            fileName = fileName.substring(1, fileName.length - 1);
            fileName = decodeURI(fileName);
            if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
            return true;
        }

    })
}

export default util;