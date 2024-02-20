// 公共方法
const common = {};
// 在数组中查找某个值
common.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};
let nodelist = [];
// 获取target的width, height 和 offset
common.getTargetOffset = function (target) {
    var body = document.body, doc = document.documentElement;
    var target = target || event.target;
    var targetWidth = target.clientWidth,
        targetHeight = target.clientHeight;
    var scrollTop = body.scrollTop || doc.scrollTop,
        scrollLeft = body.scrollLeft || doc.scrollLeft
    var top = target.getBoundingClientRect().top,
        left = target.getBoundingClientRect().left;
    var offsetTop = top + scrollTop,
        offsetLeft = left + scrollLeft;
    return {
        width: targetWidth,
        height: targetHeight,
        offsetTop: offsetTop,
        offsetLeft: offsetLeft,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        top: top,
        left: left
    }
}

//展开搜索到的节点（是否展开节点、节点数组、ztree对象）
common.updateNodes = function (highlight, nodelist, ztreeObj) {
    // console.log('执行了updateNodes-------------')
    for (var i = 0, l = nodelist.length; i < l; i++) {
        nodelist[i].hightLight = highlight;
        if (highlight) {
            var pnode = nodelist[i].getParentNode();
            ztreeObj.expandNode(pnode, true, false, false); //将搜索到的节点的父节点展开
        } else {
            ztreeObj.setting.view.expandSpeed = "";
            ztreeObj.expandAll(false);
        }
        ztreeObj.updateNode(nodelist[i]);
    }
}
//标题检索(检索值、ztree对象)
common.titleSearch = function (value, ztreeObj) {
    console.log('执行了titleSearch-------------')
    // 关掉之前所有的节点
    common.updateNodes(false, nodelist, ztreeObj);
    if (value === "" || value == undefined || value == null) return;
    // ztree执行代码有执行先后顺序问题，有异步解决；
    // setTimeout(function(){
    // 查找高亮节点并打开
    nodelist = ztreeObj.getNodesByParamFuzzy("name", value);
    common.updateNodes(true, nodelist, ztreeObj);
    // }, 200)

}
//根据某个属性值检索 进行展开
common.keySearch = function (value, ztreeObj) {
    console.log('执行了keySearch-------------')
    console.log('---2---')
    // 关掉之前所有的节点
    common.updateNodes(false, nodelist, ztreeObj);
    if (value === "" || value == undefined || value == null) return;
    // ztree执行代码有执行先后顺序问题，有异步解决；
    // setTimeout(function(){
    // 查找高亮节点并打开
    nodelist = ztreeObj.getNodesByParam("id", value);
    common.updateNodes(true, nodelist, ztreeObj);
    // }, 200)

}


// 将路由/project/bid, 解析为 {paths:[project,bid], lastrouter:bid}
common.parsePath = function (path) {
    var paths = path.split('/');
    var len = paths.length;
    var last = paths[len - 1];
    return {
        paths: paths,
        last: last
    }
}

/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** 用法  randomWord(false,6);规定位数 flash
 *      randomWord(true,3，6);长度不定，true
 * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
 */
function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

function hashCode(str) {
    var h = 0;
    var len = str.length;
    var t = 2147483648;
    for (var i = 0; i < len; i++) {
        h = 31 * h + str.charCodeAt(i);
        if (h > 2147483647) h %= t; //java int溢出则取模
    }
    /*var t = -2147483648 * 2;
     while (h > 2147483647) {
     h += t
     }*/
    return h;
}


common.gethashcode = function () {
    //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
    var timestamp = (new Date()).valueOf();
    var myRandom = randomWord(false, 6);
    var hashcode = hashCode(myRandom + timestamp.toString());
    return hashcode;
}
// 递归节点，调用函数
common.Recursive = function Rec(data, callback) {
    if (data instanceof Array) {
        data.forEach(value => Rec(value))
    } else if (typeof data === "object" && data.children && data.children.length > 0) {
        callback(data);
        Rec(data.children);
    }

}

// 全局加载loading
common.showGlobalLodading = function (text) {
    this.$Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 18
                    }
                }),
                h('div', text)
            ])
        }
    });
}
common.hideGlobalLodading = function () {
    this.$Spin.hide();
}
// 获取当前日期
common.getTime = function (date) {
    var myDate = date;
    if (!(myDate instanceof Date)) {
        myDate = new Date()
    }
    var year = myDate.getFullYear(),   //获取完整的年份(4位,1970-????)
        month = myDate.getMonth(),       //获取当前月份(0-11,0代表1月)
        date = myDate.getDate(),        //获取当前日(1-31)
        hour = myDate.getHours(),     //获取当前小时数(0-23)
        minutes = myDate.getMinutes(),     //获取当前分钟数(0-59)
        seconds = myDate.getSeconds();
    return {
        year: year, month: month + 1, date: date,
        hour: hour, minutes: minutes, seconds: seconds
    };
}
// bas解析路由，生成面包屑列表；
common.getBreadCrumb = function getBreadCrumb(r, tree) {
    var paths = r.path.split('/');
    paths.shift();//去掉第一个“”
    var route;
    var breadcrumbs = [];
    // 将导航树所有的active属性设为false；
    common.mapList(tree, function (node) {
        node.active = false;
        node.on = false;
    })

    // 解析路由，生成面包屑列表；
    function findRoute(arr, path) {
        var route = arr.filter(value => {
            if ((value.path === path) || (value.path === '/' + path)) {
                value.active = true;
                return true;
            } else {
                value.active = false;
                return false;
            }
        })[0];
        return route;
    }

    paths.forEach(value => {
        route = route || tree;
        route = findRoute(route, value);
        if (route) {
            if (route.name && route.name !== '') breadcrumbs.push(route);
            route = route.children;
        }
    });
    return breadcrumbs;
}
// 遍历数组对象
common.mapList = function mapList(list, callback) {
    if (list instanceof Array) {
        list.forEach(item => {
            callback(item);
            if (item.children) {
                mapList(item.children, callback);
            }
        })
    }

}
common.statusColor = function statusColor(name) {
    if (name == '现行') {
        return 'now-class'
    } else if (name == '作废') {
        return 'void-class'
    } else if (name == '历史版本') {
        return 'history-class'
    } else if (name == '即将实施' || name == '即将作废') {
        return 'common-soon-class'
    } else {
        return 'default-class'
    }
}
common.statusColorMobile = function statusColorMobile(name) {
    if (name == '现行') {
        return 'now-class'
    } else if (name == '作废') {
        return 'void-class'
    } else if (name == '即将实施') {
        return 'will-common'
    } else if (name == '即将作废') {
        return 'will-void'
    } else {
        return 'default-class'
    }
}
common.listToTree = function listToTree(myId, pId, list) {
    function exists(list, parentId) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][myId] == parentId) {
                return true
            }
        }
        return false
    }

    var nodes = []
    // get the top level nodes
    for (var i = 0; i < list.length; i++) {
        var row = list[i]
        if (!exists(list, row[pId])) {
            nodes.push(row)
        }
    }

    var toDo = []
    for (let i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i])
    }
    while (toDo.length) {
        var node = toDo.shift() // the parent node
        // get the children nodes
        for (let i = 0; i < list.length; i++) {
            let row = list[i]
            if (row[pId] == node[myId]) {
                //var child = {id:row.id,text:row.name};
                if (node.children) {
                    node.children.push(row)
                } else {
                    node.children = [row]
                }
                toDo.push(row)
            }
        }
    }
    return nodes
}

common.getPermission = function (param) {
    let userFuncPermission = JSON.parse(localStorage.getItem("userFuncPermission")) || []
    if (userFuncPermission.length === 0) {
        return false;
    } else {
        if (userFuncPermission.indexOf(param) > -1) {
            return true;
        } else {
            return false;
        }
    }
}
// 深拷贝
common.deepCopy = function dC(data) {
    if (data instanceof Date) {
        return new Date(data.valueOf());
    } else if (data instanceof Array) {
        var arr = [];
        data.forEach(value => {
            arr.push(dC(value));
        })
        return arr;
    } else if (typeof data === "object" && data !== null) {
        var obj = {};
        for (let key in data) {
            obj[key] = dC(data[key]);
        }
        return obj;
    } else {
        return data;
    }
}

common.getDate = function (value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    return y + "-" + MM + "-" + d;
}
common.getCookie = function (name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};

common.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 设置token
common.setToken = function () {
    const prefix = localStorage.getItem("appName");
    if (!window.token) {
        var token = common.getQueryString('token') || common.getQueryString('access_token');
        if (token) {
            localStorage.setItem(prefix + "authToken", token);
            token = "bearer " + token
        }
        var localtoken = localStorage.getItem(prefix + 'authToken');
        if (localtoken) {
            localtoken = "bearer " + localtoken
        }

        let userInfo = JSON.parse(localStorage.getItem("userinfo"))

        window.token = token || localtoken;
        if (userInfo) {
            window.displayName = encodeURIComponent(userInfo.displayName) || ""
            document.cookie = 'displayName=' + window.displayName + ";path=/;"
        }

        document.cookie = 'Authorization=' + (localStorage.getItem(prefix + 'authToken') || "") + ";path=/;"

    }
};
// 判断浏览器类型
common.BrowserType = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("(Windows NT 6.1; WOW64; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) { return "IE7"; }
        else if (fIEVersion == 8) { return "IE8"; }
        else if (fIEVersion == 9) { return "IE9"; }
        else if (fIEVersion == 10) { return "IE10"; }
        else if (fIEVersion == 11) { return "IE11"; }
        else { return "0" }//IE版本过低
    }//isIE end

    if (isFF) { return "FF"; }
    if (isOpera) { return "Opera"; }
    if (isSafari) { return "Safari"; }
    if (isChrome) { return "Chrome"; }
    if (isEdge) { return "Edge"; }
};

//判断是否是IE浏览器
common.isIE = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    if (isIE) { return "1"; }
    else { return "-1"; }
};

//判断是否是IE浏览器，包括Edge浏览器
common.IEVersion = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("(Windows NT 6.1; WOW64; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) { return "IE7"; }
        else if (fIEVersion == 8) { return "IE8"; }
        else if (fIEVersion == 9) { return "IE9"; }
        else if (fIEVersion == 10) { return "IE10"; }
        else if (fIEVersion == 11) { return "IE11"; }
        else { return "0" }//IE版本过低
    }
    else if (isEdge) { return "Edge"; }
    else { return "-1"; }//非IE
};


export default common;


export const debounce = (func, wait) => { //函数防抖
    let timer;
    return function () {
        let context = this; // 注意 this 指向
        let args = arguments; // arguments中存着e
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
