import request from '@/utils/request'

export const regUserApi = (data) => {
    return request({
        url: '/reg',
        method: 'post',
        data,
    })
}