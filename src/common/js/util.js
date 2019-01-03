import { likeSearchRule, gtSearchRule, ltSearchRule, betweenSearchRule, neSearchRule } from 'common/js/config'
import { getLocalStorage, removeLocalStorage } from 'common/js/dom'

// 用户信息本地存储变量
const userLocalName = 'info'

// 当前选中状态
const actionName = 'active'

// 获取当前用户本地存储信息
export function getUserIng () {
  // console.log(userLocalName)
  return getLocalStorage(userLocalName)
}

// 设置当前用户本地存储信息
export function setUserIng (obj) {
  return getLocalStorage(userLocalName, obj)
}

// 删除当前用户本地存储信息
export function removeUserIng () {
  return removeLocalStorage(userLocalName)
}

// 获取当前用户本地存储信息
export function getAction () {
  return getLocalStorage(actionName)
}

// 设置当前用户本地存储信息
export function setAction (obj) {
  return getLocalStorage(actionName, obj)
}

// 删除当前用户本地存储信息
export function removeAction () {
  return removeLocalStorage(actionName)
  console.log(actionName)
}

// 初始化时间
export function initTime (year, task) {
  var date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var mm = date.getMinutes()
  var ss = date.getSeconds()
  if (m.toString().length === 1) {
    m = '0' + m
  }
  if (d.toString().length === 1) {
    d = '0' + d
  }
  if (h.toString().length === 1) {
    h = '0' + h
  }
  if (mm.toString().length === 1) {
    mm = '0' + mm
  }
  if (ss.toString().length === 1) {
    ss = '0' + ss
  }
  if (year && year === 'ymr') {
    return y + '-' + m + '-' + d
  }
  if (year && !task) {
    return y + m + d
  }
  if (task) {
    return y + m + d + h + mm + ss
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss
}

// 模糊查询
export function likeSearch (obj) {
  let search = {}
  for (let key in obj) {
    search[key] = `${obj[key]}${likeSearchRule}`
  }
  return search
}

// 模糊查询
export function likeStrSearch (str) {
  return `${str}${likeSearchRule}`
}

// 大于查询
export function gtStrSearch (str) {
  return `${str}${gtSearchRule}`
}

// 小于查询
export function ltStrSearch (str) {
  return `${str}${ltSearchRule}`
}

// 区间查询
export function betweenStrSearch (small, big) {
  return `${small}${betweenSearchRule}${big}`
}

// 部门查询
export function neSearch (str) {
  return `${str}${neSearchRule}`
}

// 深拷贝一个Object
export function cloneObj (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  var s = {}
  if (obj.constructor === Array) {
    s = []
  }
  for (var i in obj) {
    s[i] = cloneObj(obj[i])
  }
  return s
}

// 判断一个对象是否为空对象
export function isNullObject (obj) {
  return JSON.stringify(obj) === '{}'
}

// 过滤时间格式
export function timeFilter (time, format) {
  var o = {
    'M+': time.getMonth() + 1, // month
    'd+': time.getDate(), // day
    'H+': time.getHours(), // hour
    'm+': time.getMinutes(), // minute
    's+': time.getSeconds(), // second
    'q+': Math.floor((time.getMonth() + 3) / 3), // quarter
    'S': time.getMilliseconds() // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function filterCoordinate (arr) {
  let filterArr = []
  arr.map(item => {
    filterArr.push([item.lng, item.lat])
  })

  return filterArr
}

// export function split_array (arr, len) {
//   var a_len = arr.length
//   var result = []
//   for (var i = 0; i < a_len; i += len) {
//     result.push(arr.slice(i, i + len))
//   }
//   return result
// }

// 分割数组
export function divisionArr (arr) {
  var allData = [] // 用来装处理完的数组
  var currData = [] // 子数组用来存分割完的数据
  // 循环需要处理的数组
  for (var i = 0; i < arr.length; i++) {
    // 将chartArr[i]添加到子数组
    currData.push(arr[i])
    // 在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
    if ((i !== 0 && (i + 1) % 10 === 0) || i === arr.length - 1) {
      // 把currData加到allData里
      allData.push(currData)
      // 在这里清空currData
      currData = []
    }
  };
  return allData
}

// 数组去重
export function unique (arr) {
  arr = arr.map(item => {
    return JSON.stringify(item)
  })
  let newArr = Array.from(new Set(arr))
  newArr = newArr.map(item => {
    return JSON.parse(item)
  })
  return newArr
}

// 去掉最后一个元素
export function truncate (arr) {
  return arr.slice(0, -1)
}

// 检测是否是中文
export function isChinese (str) {
  if (/^[\u3220-\uFA29]+$/.test(str)) {
    return true
  } else {
    return false
  }
}

// 过滤文件后缀名
export function getFileName (name) {
  var json = name.split('.')
  return json[0]
}

// 获取文件后缀名
export function getFileType (name) {
  var json = name.split('.')
  return json[1]
}



// 过滤时间格式
// export function timeFilter(time, format) {
//	var o = {
//		'M+': time.getMonth() + 1, //month
//		'd+': time.getDate(), //day
//		'H+': time.getHours(), //hour
//		'm+': time.getMinutes(), //minute
//		's+': time.getSeconds(), //second
//		'q+': Math.floor((time.getMonth() + 3) / 3), //quarter
//		'S': time.getMilliseconds() //millisecond
//	}
//
//	if(/(y+)/.test(format)) {
//		format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
//	}
//
//	for(var k in o) {
//		if(new RegExp('(' + k + ')').test(format)) {
//			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
//		}
//	}
//	return format;
// }
/* eslint-enable */
