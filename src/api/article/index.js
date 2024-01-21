import request from '@/utils/request'


// 获取分类列表
export const getarticleApi = () => {
    return request({
        url: `/getarticle`,
        method: 'get',
    })
}

// 新增分类数据

export const addTypeApi = (data) => {
    return request({
        url: `/addType`,
        method: 'post',
        data,
    })
}
// 删除分类数据
export const delTypeApi = (data) => {
    return request({
        url: `/delType`,
        method: 'post',
        data,
    })
}
// 获取当前编辑的数据
export const getTypeEditApi = (id) => {
    return request({
        url: `/getTypeById?id=${id}`,
    })
}
// 确认编辑修改分类数据
export const editTypeByIdApi = (data) => {
    return request({
        url: `/editTypeById`,
        method: 'post',
        data
    })
}
