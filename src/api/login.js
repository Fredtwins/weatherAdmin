import { ajaxPost } from 'api/axios'

export function Login (obj) {
	let url = 'mpsp/sys/login'
	
	let data ={
		username: obj.username,
    password: obj.password
	}
	
	return ajaxPost(url, data)
}