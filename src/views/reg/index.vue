<template>
    <div class="reg-box">
        <div class="reg-login">
            <div class="titie-img"></div>
            <div class="reg" v-show="regFlag">
                <el-form status-icon class="demo-ruleForm">
                    <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="username" ref="username">
                    </el-input>
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-unlock" type="password" v-model="pwd">
                    </el-input>
                    <el-input placeholder="请再次输入密码" prefix-icon="el-icon-unlock" type="password" v-model="isPwd">
                    </el-input>
                    <el-button type="success" @click="regUser">注册</el-button>
                </el-form>
                <span @click="goLogin">去登录账号</span>
            </div>


            <div class="login" v-show="!regFlag">
                <el-form status-icon class="demo-ruleForm">
                    <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="username">
                    </el-input>
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-unlock" type="password" v-model="pwd">
                    </el-input>
                    <el-button type="success" @click="userLogin">登陆</el-button>
                </el-form>
                <span @click="goLogin">去注册账号</span>
            </div>
        </div>
    </div>
</template>

<script>
import { isUserNameApi, regUserApi, userLoginApi } from '@/api/reg'
export default {
    name: 'reg',
    data() {
        return {
            // 判断登陆还是注册(默认为显示登陆)
            regFlag: false,
            // 用户名
            username: '',
            // 密码
            pwd: '',
            // 确认密码
            isPwd: ''
        }
    },
    methods: {
        // 登陆注册跳转
        goLogin() {
            this.regFlag = !this.regFlag
            this.username = ''
            this.pwd = ''
            this.isPwd = ''
        },

        // 用户注册
        async regUser() {
            // 验证用户名
            let userNameReg = /^[a-zA-Z][a-zA-Z0-9]{4,}$/
            // 验证密码
            let passwordReg = /^.{6,}$/;

            if (!userNameReg.test(this.username)) {
                return this.$message.error('用户名以字母开头,最少不低于5位')
            }

            if (!passwordReg.test(this.pwd)) {
                return this.$message.error('密码不能少于6位')
            }

            if (this.pwd != this.isPwd) {
                return this.$message.error('请检查两次密码是否一致')
            }

            // 验证用户名是否重复
            let res = await isUserNameApi(this.username)
            if (res.status == 200) {
                this.$nextTick(() => {
                    this.$refs.username.focus()
                })
                return this.$message.error(res.msg)
            } else {
                // 设置用户默认头像
                localStorage.setItem('image', res.image)
            }

            // 如果未被注册 则请求注册接口
            let regRes = await regUserApi({
                username: this.username,
                pwd: this.pwd
            })
            if (regRes.status == 200) {
                // 存储用户名用户登陆成功信息查询
                localStorage.setItem('username', this.username)
                // 注册成功跳转到登陆
                this.regFlag = false
                // 清空表单
                this.pwd = ''
                this.username = ''
                this.isPwd = ''
                // 弹出提示
                return this.$message.success(regRes.msg)
            }
        },

        // 用户登陆
        async userLogin() {

            // 验证用户名
            let userNameReg = /^[a-zA-Z][a-zA-Z0-9]{4,}$/
            // 验证密码
            let passwordReg = /^.{6,}$/;

            if (!userNameReg.test(this.username)) {
                return this.$message.error('用户名以字母开头,最少不低于5位')
            }

            if (!passwordReg.test(this.pwd)) {
                return this.$message.error('密码不能少于6位')
            }


            let res = await userLoginApi(this.username, this.pwd)
            console.log(res);
            if (res.msg) {
                return this.$message.error(res.msg)
            }

            this.$message.success('登录成功')
            this.$router.replace({
                name: 'home'
            })
        }
    }
}
</script>

<style scoped>
.reg-box {
    height: 100%;
    background: url('@/assets/images/login_bg.jpg');
    background-size: cover;
}

.reg-login {
    width: 400px;
    height: 310px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.titie-img {
    width: 100%;
    height: 60px;
    background: url('@/assets/images/login_title.png') no-repeat center;
}

.el-input {
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px 0;
}

.el-button {
    width: 80%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

span {
    float: right;
    margin-right: 40px;
    font-size: 12px;
    line-height: 30px;
    cursor: pointer;
}

span:hover {
    color: #ccc;
}
</style>