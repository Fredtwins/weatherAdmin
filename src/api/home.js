import { ajaxGet, ajaxPost } from 'api/axios'
import { options } from 'api/config'

export function Getuser () {
	let url = 'mpsp/sys/user/info'
  // console.log(url)
	let data ={}

	return ajaxGet(url, data, options())
}

export function GetNav () {
  let url = 'mpsp/sys/menu/nav'

  let data = {}

  return ajaxGet(url, data, options())
}

// 用户列表
export function Getuserlist(page = 1, obj) {
  let url = 'mpsp/sys/user/list'

  let data = {
    page: page,
    limit: 10,
    ...obj
  }

  return ajaxGet(url, data, options())
}

// 菜单列表
export function GetmenuList () {
  let url = 'mpsp/sys/menu/list'

  let data = {}

  return ajaxGet(url, data, options())
}

// 菜单列表新增
export function GetmenuAdd (obj) {
  let url = 'ipp/sys/permission/save'

  let data = {
    ...obj
  }

  return ajaxPost(url, data, options())
}
