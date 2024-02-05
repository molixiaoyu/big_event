<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>修改用户信息</span>
        </div>
        <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="登录名称">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickName">
                <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
                <el-input v-model="ruleForm.email" type="email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>


<script>
import { editUserInforApi } from '@/api/information'
export default {
    name: 'information',
    data() {
        return {
            ruleForm: {
                email: null,
                id: null,
                nickname: null,
                pwd: null,
                user_pic: null,
                username: null
            },
        }
    },
    mounted() {
        this.getUserInforApi()
    },
    methods: {
        // 获取用户数据
        async getUserInforApi() {

            this.ruleForm = JSON.parse(localStorage.getItem('userInfor'))

        },
        // 重置表单
        resetForm() {
            this.ruleForm.email = ''
            this.ruleForm.nickname = ''
        },
        async submitForm() {
            // 验证邮箱
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (!emailRegex.test(this.ruleForm.email)) {
                return this.$message.error('邮箱不合法')
            }

            if (!this.ruleForm.nickname) {
                return this.$message.error('昵称不能为空')
            }

            // 修改信息
            let res = await editUserInforApi(this.ruleForm)

            // 重新获取
            let userIforRes = await editUserInforApi(this.ruleForm.username)

            // 修改本地存储的信息
            localStorage.setItem('userInfor',JSON.stringify(res.data))

            // 告诉父组件用户名改变
            this.$emit('editUserInfor', res.data);

            this.$message.success('修改个人信息成功')
        }
    }
}
</script>


<style scoped></style>