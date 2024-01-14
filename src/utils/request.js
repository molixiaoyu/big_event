import axios from 'axios'

const instance = axios.create({
    // 基础请求地址
    baseURL: 'http://127.0.0.1:5932'
})


// 在创建axios实例时设置全局的响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做一些处理
        return response.data; // 直接返回data层的数据
    },
    error => {
        // 对响应错误做一些处理
        return Promise.reject(error);
    }
);
// 导出方法
export default instance