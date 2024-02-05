import request from '@/utils/request'


// 修改用户信息
export const regpwdApi = (data) => {
    return request({
        url: `/regpwd`,
        method: 'POST',
        data
    })
}