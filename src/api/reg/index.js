import request from '@/utils/request'


// 用户注册
export const regUserApi = (data) => {
    return request({
        url: '/reg',
        method: 'post',
        data,
    })
}
// 判断用户名是否存在
export const isUserNameApi = (username) => {
    return request({
        url: `/rename?username=${username}`,
        method: 'get',
    })
}
// 用户登陆
export const userLoginApi= (username,pwd) => {
    return request({
        url: `/login?username=${username}&pwd=${pwd}`,
        method: 'get',
    })
}