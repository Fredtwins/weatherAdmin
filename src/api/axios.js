import axios from 'axios'
import iView from 'iview'

iView.LoadingBar.config({
  height: 3,
  // color: '#47cb89'
  color: '#ff7f27'
})

let httpUrl = 'http://10.0.1.184:8080/'
// let httpUrl = 'http://192.168.1.174:8080/'

// 页面接口通用
export function ajaxGet (url = '', data = {}, option = {}) {
  url = `${httpUrl}${url}`
  return axios.get(url, {
    params: data,
    ...option
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(res => {
    return Promise.resolve(res.data)
  })
}

// post请求
export function ajaxPost (url = '', data = {}, option = {}) {
	url = `${httpUrl}${url}?`
	iView.LoadingBar.start()
	return axios.post(url, data, option).then(res => {
    iView.LoadingBar.finish()
    return Promise.resolve(res.data)
  }).catch(res => {
    iView.LoadingBar.error()
    return Promise.resolve(res.data)
  })
}
