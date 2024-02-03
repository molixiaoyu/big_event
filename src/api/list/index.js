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