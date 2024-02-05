<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>文章列表</span>
        </div>
        <el-form :inline="true" class="demo-form-inline">
            <!-- 条件查询 -->
            <el-form-item>
                <el-select v-model="typeid" placeholder="请选择文章类型">
                    <el-option :value=0 label="所有类型"></el-option>
                    <el-option v-for="item in typeList" :key="item.id" :label=item.name :value=item.id></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="state" placeholder="请选择文章状态">
                    <el-option label="所有状态" :value=0></el-option>
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="存草稿" value="存草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchArticle">查询</el-button>
            </el-form-item>
            <!-- 文章列表表格 -->

            <el-table :data="articleList" border style="width: 100%" class="table">
                <el-table-column prop="title" label="文章标题" width="700">
                </el-table-column>
                <el-table-column prop="typename" label="分类" width="180">
                </el-table-column>
                <el-table-column prop="date" label="发布时间" width="200">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="{row}">
                        <el-button type="primary" style="margin-right: 20px;" @click="onDialog(row.id)">编辑</el-button>
                        <el-popconfirm title="确定删除这篇文章吗?" @confirm="delArticle(row.id)">
                            <el-button slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :page-size="100" layout="sizes, prev, pager, next"
                    :total=total prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </el-form>


        <!-- 修改文章弹窗 -->
        <el-dialog title="编辑文章" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
            <div slot="header" class="clearfix">
                <span>写文章</span>
            </div>
            <el-form label-width="100px" :model="pubForm" :rules="pubFormRules" ref="pubFormRef">
                <el-form-item label=" 文章标题" prop="title">
                    <el-input v-model="pubForm.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="文章类别" prop="typeid">
                    <el-select v-model="pubForm.typeid" placeholder="请选择文章类别" style="width: 100%;" @change="editTypename">
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
                <el-button type="primary" style="margin-left: 150px;" @click="editArticle">保存</el-button>
                <el-button type="danger" @click="resetting">重置</el-button>
            </el-form>
        </el-dialog>
    </el-card>
</template>

<script>
import { getArticleApi, getSelectNewApi, delNewApi, uploadApi, getNewListApi, editNesApi } from '@/api/list'
export default {
    name: 'list',
    data() {
        return {
            // 控制修改文章弹窗
            dialogVisible: false,
            // 类型列表
            typeList: null,
            // 类型id
            typeid: 0,
            // 类型状态
            state: 0,
            // 每页显示多少条
            pagenum: 1,
            // 页码
            pagesize: 1,
            // 总条数
            total: 0,
            // 文章列表
            articleList: null,
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
        this.getSelectNew()
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
        handleClose(done) {
            this.$confirm('关闭可能导致更新信息丢失,确认关闭?')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        // 获取分类详情
        async getArticle() {
            let res = await getArticleApi()

            this.typeList = res.data
        },
        // 获取新闻详情
        async getSelectNew() {
            let { typeid,
                state,
                pagenum,
                pagesize } = this
            let res = await getSelectNewApi(
                pagenum,
                pagesize,
                typeid,
                state)


            this.total = res.total

            this.articleList = res.data
        },
        // 分页改变
        handleSizeChange(val) {
            this.pagesize = val
            this.getSelectNew()
        },
        handleCurrentChange(val) {
            this.pagenum = val
            this.getSelectNew()
        },
        // 查询文章
        searchArticle() {
            this.pagenum = 1
            this.getSelectNew()
        },
        // 删除文章
        async delArticle(id) {
            let res = await delNewApi(id)
            if (res.status == 200) {
                this.$message.success('删除成功')
                if (this.articleList.length == 0 && this.pagenum != 1) {
                    this.pagenum -= 1
                }
                this.getSelectNew()
            }
        },

        // 编辑文章部分
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
        // 打开选择文件
        addArticleImg() {
            this.$refs.inputRef.click()
        },
        // 打开修改弹窗并请求数据
        async onDialog(id) {
            this.dialogVisible = true

            let res = await getNewListApi(id)



            this.pubForm = res.data



            this.$refs.pubFormRef.clearValidate(); // 在打开对话框时清除验证信息
        },

        // 修改弹窗的分类名
        editTypename() {
            this.pubForm.typename = this.typeList.find(item => item.id == this.pubForm.typeid).name
        },
        // 确定修改文章
        async editArticle() {

            let flag = this.submitForm()
            if (!flag) return this.$message.error('请完整填写哦')


            let res = await editNesApi(this.pubForm)

            this.$message.success('修改成功')

            this.dialogVisible = false

            this.getSelectNew()
            console.log(res);
        },
        // 重置修改数据
        resetting() {
            this.pubForm = {}
            // 默认封面
            this.pubForm.pic = 'http://127.0.0.1:5932/upload/1.jpg'
        }
    }
}
</script>

<style scoped>
.table {
    margin-bottom: 20px;
}

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