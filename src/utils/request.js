import axios from 'axios'

const instance = axios.create({
    // 基础请求地址
    baseURL:'http://127.0.0.1:5932'
})

// 导出方法
export default instance