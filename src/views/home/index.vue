<template>
    <h3>home</h3>
</template>

<script>
import { getUserInforApi } from '@/api/home'
export default {
    name: 'home',
    mounted() {
        this.getUserInfor()
    },
    methods: {
        async getUserInfor() {
            let username = localStorage.getItem('username')
            let res = await getUserInforApi(username)
            // 删除密码
            delete res.data.pwd
            // 存入本地存储作为登陆凭证
            localStorage.setItem('userInfor', JSON.stringify(res.data))
        }
    }
}
</script>

<style scoped></style>