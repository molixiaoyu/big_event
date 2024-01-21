<template>
    <el-container class="main-container">
        <!-- 头部区域 -->
        <el-header>
            <!-- 左侧的 logo -->
            <img style="margin-left: 40px;" src="@/assets/images/logo.png" alt="" />
            <!-- 右侧的菜单 -->
            <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff"
                active-text-color="#409EFF">
                <el-submenu index="1">
                    <template slot="title">
                        <!-- 头像 -->
                        <img :src="user_pic" alt="" class="avatar" />
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
                    <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
                    <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
                </el-submenu>
                <el-menu-item @click="loginOut" index="2" class="out"><i class="el-icon-switch-button"></i>退出</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <!-- 左侧边栏的用户信息 -->
            <el-aside width="200px">
                <div class="user-box">
                    <img :src="user_pic" alt="" />
                    <span>欢迎{{ nickName }}</span>
                </div>
                <!-- 左侧导航 -->
                <el-menu default-active="/echats" class="el-menu-vertical-demo" background-color="#23262E" text-color="#fff"
                    active-text-color="#409EFF" unique-opened router>
                    <template>
                        <!-- 不包含子项的一级 -->
                        <el-menu-item index="/echats">
                            <i class="el-icon-house"></i>首页
                        </el-menu-item>

                        <!-- 包含子项的一级 -->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-date"></i>
                                <span>文章管理</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item index="/category">
                                <i class="el-icon-notebook-2"></i>文章类别
                            </el-menu-item>
                            <el-menu-item index="/list">
                                <i class="el-icon-notebook-2"></i>文章列表
                            </el-menu-item>
                            <el-menu-item index="/publish">
                                <i class="el-icon-notebook-2"></i>发表文章
                            </el-menu-item>
                        </el-submenu>
                        <!-- 包含子项的一级 -->
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>个人中心</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item index="information">
                                <i class="el-icon-document-copy"></i>基本资料
                            </el-menu-item>
                            <el-menu-item index="userImage">
                                <i class="el-icon-document-copy"></i>更换头像
                            </el-menu-item>
                            <el-menu-item index="userPassword">
                                <i class="el-icon-document-copy"></i>重置密码
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-aside>

            <el-container>
                <!-- 页面主体区域 -->
                <!-- 二级路由 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- 底部 footer 区域 -->
                <el-footer>©mlxy 2024/1/10</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import { getUserInforApi } from '@/api/home'
export default {
    name: 'home',
    data() {
        return {
            user_pic: '',
            nickName: '',
        }
    },
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

            // 获取用户头像
            if (localStorage.getItem('image') == 'undefined') {
                this.user_pic = 'http://127.0.0.1:5932/upload/1.jpg'
            } else {
                this.user_pic = localStorage.getItem('image')
            }

            // 获取用户别名
            let userInfor = localStorage.getItem('userInfor')
            this.nickName = JSON.parse(userInfor).nickname
        },
        // 退出登录
        loginOut() {
            this.$confirm('确定退出登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                // 退出清空用户数据
                localStorage.removeItem('userInfor')
                localStorage.removeItem('username')
                this.$router.replace('/reg')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消退出'
                });
            });

        }
    }
}
</script>

<style scoped>
.main-container {
    height: 100%;
}

.main-container .el-header,
.main-container .el-aside {
    background-color: #23262e;
}

.main-container .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
}

.main-container .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
}

.main-container .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
}

/*  左侧边栏用户信息区域 */
.user-box {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    user-select: none;
}

.user-box img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
}

.user-box span {
    color: white;
    font-size: 12px;
}

/*  侧边栏菜单的样式 */
.el-submenu,
.el-menu-item {
    width: 200px;
    user-select: none;
}

::v-deep .el-menu--horizontal>.el-submenu .el-submenu__title {
    display: flex;
    align-items: center;
}
.out{
    width: 100px;
}
</style>