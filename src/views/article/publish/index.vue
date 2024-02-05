<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>写文章</span>
        </div>
        <el-form label-width="100px" :model="pubForm" :rules="pubFormRules" ref="pubFormRef">
            <el-form-item label=" 文章标题" prop="title">
                <el-input v-model="pubForm.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章类别" prop="typeid">
                <el-select v-model="pubForm.typeid" placeholder="请选择文章类别" style="width: 100%;">
                    <el-option v-for="item in typeList" :key="item.id" :label=item.name :value=item.id></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <!-- 富文本 -->
                <quill-editor v-model="pubForm.content"> </quill-editor>
            </el-form-item>
            <el-form-item label="文章封面">
                <div class="box">
                    <img :src="pubForm.pic">
                    <input type="file" style="display: none;" ref="inputRef" @change="SelectImg">
                    <el-button icon="el-icon-plus" @click="addArticleImg" class="addBtn">上传封面</el-button>
                </div>
            </el-form-item>
            <el-button type="primary" style="margin-left: 150px;" @click="addArticle('已发布')">发布文章</el-button>
            <el-button type="danger" @click="addArticle('存草稿')">存草稿</el-button>
        </el-form>
    </el-card>
</template>

<script>
import { getArticleApi, uploadApi, addNewApi } from '@/api/list'
export default {
    name: 'publish',
    data() {
        return {
            // 类型列表
            typeList: null,
            pubForm: {
                // 文章标题
                title: null,
                // 类型id
                typeid: null,
                // 文章内容
                content: null,
                // 封面路径
                pic: 'http://127.0.0.1:5932/upload/1.jpg',
                // 发布还是存草稿
                state: null,
                // 分类名称
                typename: null
            },
            // 校验规则
            pubFormRules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 1, max: 30, message: '标题长度为1-30个字符', trigger: 'blur' },
                ],
                typeid: [
                    { required: true, message: '请选择分类', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入文章内容', trigger: 'blur' },
                ]
            }
        }
    },
    mounted() {
        this.getArticle()
    },
    methods: {
        // 验证表单是否通过
        submitForm() {
            let flag = null
            this.$refs.pubFormRef.validate((valid) => {
                if (valid) {
                    flag = true
                } else {
                    flag = false;
                }
            });
            return flag
        },
        // 获取分类详情
        async getArticle() {
            let res = await getArticleApi()

            this.typeList = res.data
        },
        // 打开选择文件
        addArticleImg() {
            this.$refs.inputRef.click()
        },
        // 用户选择了文件
        SelectImg(event) {
            let file = event.target.files[0];
            if (!file) {
                return this.$message.error("请选择图片");
            }

            // 判断文件类型
            if (file.type.substr(0, 5) !== "image") {
                return this.$message.error("请上传图片类型的文件");
            }

            // 判断文件大小，大于60M提醒用户图片太大
            if (file.size > 600000) {
                return this.$message.error("图片太大，请重新上传");
            }


            let formData = new FormData();
            formData.append("attrName", file);

            uploadApi(formData)
                .then(res => {
                    this.pubForm.pic = "http://127.0.0.1:5932" + res.path; // 假设需要在页面上展示图片，则将返回的路径设置到 data 中的 imageUrl 变量
                })
        },
        // 发布文章
        async addArticle(str) {
            let flag = this.submitForm()
            if (!flag) return this.$message.error('请完整填写哦')

            // str = '已发布' | '存草稿'
            this.pubForm.state = str

            this.pubForm.typename = this.typeList.find(item => item.id == this.pubForm.typeid).name
            let res = await addNewApi(this.pubForm)

            this.pubForm = {
                // 文章标题
                title: null,
                // 类型id
                typeid: null,
                // 文章内容
                content: null,
                // 封面路径
                pic: 'http://127.0.0.1:5932/upload/1.jpg',
                // 发布还是存草稿
                state: null,
                // 分类名称
                typename: null
            }

            this.$confirm('发布成功,是否跳转到文章列表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.$router.push('/list')
            }).catch(() => {

            });

        }
    }
}
</script>

<style scoped>
::v-deep .ql-editor {
    min-height: 300px;
}

.box img {
    width: 350px;
    height: 350px;
    object-fit: cover;
}

.addBtn:hover {
    color: skyblue;
    border: 0;
}

.addBtn {
    border: 0;
}
</style>