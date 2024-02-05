import request from '@/utils/request'


// 查询用户信息
export const editUserInforApi = (data) => {
    return request({
        url: `/editUserInfor`,
        method: 'POST',
        data
    })
}