import axios from 'axios';
import { Message } from 'element-ui';

const instance = axios.create({
    // 基础请求地址
    baseURL: 'http://127.0.0.1:5932',
    // 请求超时
    timeout: 3000,
});

// 在创建axios实例时设置全局的响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做一些处理
        return response.data; // 直接返回data层的数据
    },
    error => {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            // 处理超时错误
            Message.error('请求超时，请重试');
        } else {
            // 处理其他请求错误
            Message.error('请求错误，请检查');
        }
        console.log(error);
    }
);

// 导出方法
export default instance;