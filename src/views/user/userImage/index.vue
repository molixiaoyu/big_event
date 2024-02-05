<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>修改用户信息</span>
        </div>
        <div class="box">
            <div class="left">
                <img :src='userImage' alt="" class="w350">
            </div>
            <div class="right">
                <div class="top">
                    <img :src="userImage" alt="" class="w100">
                    <span>100 x 100</span>
                </div>
                <div class="bottom">
                    <img :src="userImage" alt="" class="w50">
                    <span>50 x 50</span>
                </div>
            </div>
        </div>

        <input type="file" style="display: none;" ref="userImage" @change="changeImg">
        <div class="btn">
            <el-button type="success" class="topBtn" @click="clickFile">上传</el-button>

            <el-button type="danger" @click="queding">确定</el-button>
        </div>

    </el-card>
</template>


<script>
import { uploadApi } from '@/api/list'
import { editUserInforApi } from '@/api/information'
export default {
    name: 'userImage',
    data() {
        return {
            userImage: null
        }
    },
    mounted() {
        this.getUserInfor()
    },
    methods: {
        // 获取用户头像
        getUserInfor() {
            this.userImage = JSON.parse(localStorage.getItem('userInfor')).user_pic
        },
        // 点击上传文件
        clickFile() {
            this.$refs.userImage.click()
        },
        // 确定上传
        changeImg(event) {
            let file = event.target.files[0];
            if (!file) {
                return this.$message.error("请选择图片");
            }
            // 判断文件大小，大于60M提醒用户图片太大
            if (file.size > 600000) {
                return this.$message.error("图片太大，请重新上传");
            }
            // 判断文件类型
            if (file.type.substr(0, 5) !== "image") {
                return this.$message.error("请上传图片类型的文件");
            }

            let formData = new FormData();
            formData.append("attrName", file);

            uploadApi(formData)
                .then(res => {
                    this.userImage = "http://127.0.0.1:5932" + res.path; // 假设需要在页面上展示图片，则将返回的路径设置到 data 中的 imageUrl 变量
                })
        },
        async queding() {
            let username = JSON.parse(localStorage.getItem('userInfor')).username

            let res = await editUserInforApi({
                username,
                user_pic: this.userImage
            })

            this.$emit('editUserImage', res.data.user_pic)


            // 重新设置图片
            let userInfor = JSON.parse(localStorage.getItem('userInfor'))
            userInfor.user_pic = res.data.user_pic
            localStorage.setItem('userInfor', JSON.stringify(userInfor))

            this.$message.success('修改头像成功')
        }
    }
}
</script>


<style scoped>
.w350 {
    width: 350px;
    height: 350px;
}

.w100 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.w50 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.bottom {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

span {
    display: inline-block;
    width: 100px;
    text-align: center;
}

.box {
    display: flex;
}

.left {
    margin-right: 30px;
}

.btn {
    margin-top: 20px;
}

.topBtn {
    margin-left: 100px;
}
</style>