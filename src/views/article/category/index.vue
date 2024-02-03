<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>文章类别管理</span>
            <el-button style="float: right;" type="primary" @click="onAdd">添加文章</el-button>
        </div>
        <div class="text item">
            <el-table :data="articleList" border style="width: 100%">
                <el-table-column prop="name" label="分类名称">
                </el-table-column>
                <el-table-column prop="bname" label="分类别名">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="{row}">
                        <el-button type="primary"
                            style="background-color: #16baaa;border-color: #16baaa;margin-right: 10px;"
                            @click="editType(row.id)">编辑</el-button>
                        <el-popconfirm title="确定删除这个分类吗?" @confirm="delType(row.id)">
                            <el-button slot="reference" type="success"
                                style="background-color: orangered;border-color: orangered;">删除</el-button>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </div>


        <!-- 添加文章弹框 -->
        <el-dialog title="添加文章类型" :visible.sync="dialogFormVisible" center width="30%">
            <el-form>
                <el-form-item label="分类名称" label-width="200px">
                    <el-input v-model="articleName" style="width: 200px;" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" label-width="200px">
                    <el-input v-model="articleBName" style="width: 200px;" placeholder="请输入分类别名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="!editFlag" type="primary" @click="addType">确定添加</el-button>
                <el-button v-else type="primary" @click="editTypeById">确定修改</el-button>
                <el-button @click="articleName = '', articleBName = ''">重置</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import { getarticleApi, addTypeApi, delTypeApi, getTypeEditApi, editTypeByIdApi } from '@/api/article'
export default {
    name: 'category',
    data() {
        return {
            articleList: [],
            // 添加文章显示隐藏
            dialogFormVisible: false,
            // 分类名称
            articleName: '',
            // 分类别名
            articleBName: '',
            // 分类id
            id: '',
            // 是否编辑
            editFlag: false,
        }
    },
    mounted() {
        this.getarticle()
    },
    methods: {
        // 打开添加弹层
        onAdd() {
            this.dialogFormVisible = true
            this.editFlag = false
            this.articleName = ''
            this.articleBName = ''
        },
        // 获取分类列表 
        async getarticle() {
            let res = await getarticleApi()
            this.articleList = res.data.reverse()
        },
        // 新增分类数据
        async addType() {
            if (!this.articleBName || !this.articleName) {
                return this.$message.error('请填写完整')
            }
            let res = await addTypeApi({ name: this.articleName, bname: this.articleBName })
            if (res.status == 200) {
                this.getarticle()
                this.dialogFormVisible = false
                this.$message.success('文章添加成功')
            }

        },
        // 删除分类数据
        async delType(id) {
            let res = await delTypeApi({ id })
            if (res.status == 200) {
                this.$message.success(res.msg)
            }
            this.getarticle()
        },

        // 编辑分类数据
        async editType(id) {
            this.editFlag = true
            this.dialogFormVisible = true
            let res = await getTypeEditApi(id)
            this.articleBName = res.data.bname
            this.articleName = res.data.name
            this.id = res.data.id

        },
        async editTypeById() {

            let res1 = await editTypeByIdApi({ name: this.articleName, bname: this.articleBName, id: this.id })
            this.$message.success(res1.msg)

            this.getarticle()
            this.dialogFormVisible = false
        }
    }
}
</script>

<style scoped></style>