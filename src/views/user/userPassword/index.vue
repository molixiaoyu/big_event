<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>重置密码</span>
        </div>

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="pwd">
                <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入原密码" show-password
                    style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpwd">
                <el-input v-model="ruleForm.newpwd" type="password" placeholder="请输入新密码" show-password
                    style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="regpwd">
                <el-input v-model="ruleForm.regpwd" type="password" placeholder="请确认新密码" show-password
                    style="width: 300px;"></el-input>
            </el-form-item>
            <el-button type="primary" style="margin-left: 50px;" @click="submitPwd">提交修改</el-button>
            <el-button @click="ruleForm = {}">重置</el-button>
        </el-form>
    </el-card>
</template>


<script>

import { regpwdApi } from '@/api/userPassword'
export default {
    name: 'userPassword',
    data() {
        return {
            ruleForm: {
                pwd: null,
                newpwd: null,
                regpwd: null,
                username: null,
            },
            rules: {
                pwd: [
                    { required: true, message: '原密码不能为空', trigger: 'blur' }
                ],
                newpwd: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { min: 6, max: 12, message: '新密码6-12位', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {

        // 验证表单是否通过
        submitForm() {
            let flag = null
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    flag = true
                } else {
                    flag = false;
                }
            });
            return flag
        },
        // 提交修改密码
        async submitPwd() {
            if (this.ruleForm.newpwd != this.ruleForm.regpwd) return this.$message.error('两次密码不一致')

            if (this.ruleForm.pwd == this.ruleForm.newpwd) return this.$message.error('新密码不能和旧密码相同')


            let flag = this.submitForm()

            if(!flag) return this.$message.error('请按规则填写')

            this.ruleForm.username = JSON.parse(localStorage.getItem('userInfor')).username

            let res = await regpwdApi(this.ruleForm)

            if (res.msg == '密码修改成功') {
                localStorage.removeItem('userInfor')
                localStorage.removeItem('username')
                this.$router.push('/reg')
                return this.$message.success('密码修改成功,请重新登陆')
            }

            this.$message.error(res.msg)
        }
    }
}
</script>


<style scoped></style>