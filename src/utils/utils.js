//表单序列化
export const serialize = (data) => {
	let list = []
	Object.keys(data).forEach((ele) => {
		list.push(`${ele}=${data[ele]}`)
	})
	return list.join('&')
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
	delete obj1.close

	var o1 = obj1 instanceof Object
	var o2 = obj2 instanceof Object
	if (!o1 || !o2) {
		/*  判断不是对象  */
		return obj1 === obj2
	}

	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false
		//Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
	}

	for (var attr in obj1) {
		var t1 = obj1[attr] instanceof Object
		var t2 = obj2[attr] instanceof Object
		if (t1 && t2) {
			return diff(obj1[attr], obj2[attr])
		} else if (obj1[attr] !== obj2[attr]) {
			return false
		}
	}

	return true
}
/**
 * 判断是否为空
 */
export function validatenull(val) {
	if (typeof val == 'boolean') {
		return false
	}
	if (typeof val == 'number') {
		return false
	}
	if (val instanceof Array) {
		if (val.length == 0) return true
	} else if (val instanceof Object) {
		if (JSON.stringify(val) === '{}') return true
	} else {
		if (
			val == 'null' ||
			val == null ||
			val == 'undefined' ||
			val == undefined ||
			val == ''
		)
			return true
		return false
	}
	return false
}

const formatJson = (keys, list) => {
	return list.map((v) => keys.map((j) => v[j]))
}

// export const exportJsonToExcel = (
// 	fileName = '',
// 	option = {
// 		headers: [], //excel 头部
// 		keys: [], //excel 需要筛选的 key
// 		list: [], //excel 需要打印的 list 数据
// 	}
// ) => {
// 	const { headers = [], keys = [], list = [] } = option
// 	const data = formatJson(keys, list)
// 	const { export_json_to_excel } = require('../assets/js/Export2Excel')
// 	export_json_to_excel(headers, data, fileName)
// }

export function setStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key) {
	return JSON.parse(localStorage.getItem(key))
}

export function removeStorage(key) {
	localStorage.removeItem(key)
}

function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new Blob([u8arr], { type: mime })
}

function downloadFile(url, name = "What's the fuvk") {
	var a = document.createElement('a')
	a.setAttribute('href', url)
	a.setAttribute('download', name)
	a.setAttribute('target', '_blank')
	let clickEvent = document.createEvent('MouseEvents')
	clickEvent.initEvent('click', true, true)
	a.dispatchEvent(clickEvent)
}

export function downloadFileByBase64(base64, name) {
	var myBlob = dataURLtoBlob(base64)
	var myUrl = URL.createObjectURL(myBlob)
	downloadFile(myUrl, name)
}

export function dateFormat(fmt, date) {
	let ret
	const opt = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	}
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt)
		if (ret) {
			fmt = fmt.replace(
				ret[1],
				ret[1].length == 1
					? opt[k]
					: opt[k].padStart(ret[1].length, '0')
			)
		}
	}
	return fmt
}

export function dateWeek(date) {
	let ret = []
	let date1 = new Date(date)
	let upDate = date1.getTime() - 24 * 60 * 60 * 1000 // 减一天
	let startDate = formatDate(upDate)
	ret.push(startDate)

	let downDate = date1.getTime() + 3600 * 1000 * 24 * 5 // 加六天
	let endDate = formatDate(downDate)
	ret.push(endDate)
	return ret
}

function formatDate(dates) {
	// 时间戳转换成年月日
	let date = new Date(dates)
	let YY = date.getFullYear() + '-'
	let MM =
		(date.getMonth() + 1 < 10
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1) + '-'
	let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	// let hh =
	// 	(date.getHours() < 10
	// 		? "0" + date.getHours()
	// 		: date.getHours()) + ":";
	// let mm =
	// 	(date.getMinutes() < 10
	// 		? "0" + date.getMinutes()
	// 		: date.getMinutes()) + ":";
	// let ss =
	// 	date.getSeconds() < 10
	// 		? "0" + date.getSeconds()
	// 		: date.getSeconds();
	return YY + MM + DD
}

// object转为url参数（？后面的参数）
export function objToUrlParamString(paramObj) {
	if (!paramObj) {
		return ''
	}
	let paramList = []
	Object.keys(paramObj) &&
		Object.keys(paramObj).forEach((key) => {
			let val = paramObj[key]
			if (val.constructor === Array) {
				val.forEach((_val) => {
					paramList.push(key + '=' + _val)
				})
			} else {
				paramList.push(key + '=' + val)
			}
		})

	return (paramList.length && '?' + paramList.join('&')) || ''
}
// 判断日期差
export function get_time_diff(time = '1611813357227') {
    var diff = '';
    var time_diff =time - new Date().getTime(); //时间差的毫秒数 

    //计算出相差天数 
    var days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
      diff += days + '天';
    }
    //计算出小时数 
    var leave1 = time_diff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours > 0) {
      diff += hours + '小时';
    } else {
      if (diff !== '') {
        diff += hours + '小时';
      }
    }
    //计算相差分钟数 
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes > 0) {
      diff += minutes + '分';
    } else {
      if (diff !== '') {
        diff += minutes + '分';
      }
    }
    //计算相差秒数 
     var leave3 = leave2 % (60 * 1000);
     var seconds = Math.round(leave3 / 1000);
     if (seconds > 0) {
       diff += seconds + '秒';
     } else {
       if (diff !== '') {
         diff += seconds + '秒';
       }
     }
    return diff;
  }