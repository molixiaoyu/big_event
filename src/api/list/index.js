import request from '@/utils/request'


// 获取分类列表
export const getArticleApi = (data) => {
    return request({
        url: '/getarticle',
    })
}
// 获取文章列表
export const getSelectNewApi = (pagenum, pagesize, typeid, state) => {
    return request({
        url: `/selectNew?pagenum=${pagenum}&pagesize=${pagesize}&typeid=${typeid}&state=${state}`,
    })
}
// 删除文章
export const delNewApi = (id) => {
    return request({
        url: `/delNew`,
        method: 'post',
        data: { id }
    })
}
// 删除文章
export const uploadApi = (fm) => {
    return request({
        url: `/upload`,
        method: 'POST',
        data: fm
    })
}
// 新增文章
export const addNewApi = (data) => {
    return request({
        url: `/addNew`,
        method: 'POST',
        data
    })
}
// 获取编辑文章数据
export const getNewListApi = (id) => {
    return request({
        url: `/getNewList?id=${id}`,
    })
}

// 确认编辑文章 

export const editNesApi = (data) => {
    return request({
        url: `/editNes`,
        method: 'POST',
        data
    })
}