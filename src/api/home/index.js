import request from '@/utils/request'


// 查询用户信息
export const getUserInforApi = (username) => {
    return request({
        url: `/getUserInfor?username=${username}`,
        method: 'get',
    })
}