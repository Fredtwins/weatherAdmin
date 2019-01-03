import { getUserIng } from 'common/js/util'

// 后台数据返回成功标识
export const ERR_OK = 200

// js访问 static 文件夹路径
export const Static = 'static/'

// 自定义错误标识
export const ERR_CUSTOM = '2000'

// 访问后台传的token值
export function options() {
  let user = getUserIng() || {}
	return {
		headers: {
			token: user
		}
	}
}
