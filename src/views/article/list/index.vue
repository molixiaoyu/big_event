<template>
    <div>
        <el-card class="box-card">
            <div class="title">文章列表</div>
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
                            <el-button type="primary" style="margin-right: 20px;">编辑</el-button>
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
        </el-card>
    </div>
</template>

<script>
import { getArticleApi, getSelectNewApi, delNewApi } from '@/api/list'
export default {
    name: 'list',
    data() {
        return {
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
            articleList: null
        }
    },
    mounted() {
        this.getArticle()
        this.getSelectNew()
    },
    methods: {
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
        }
    }
}
</script>

<style scoped>
.title {
    margin: 10px 0 20px 0;
}

.table {
    margin-bottom: 20px;
}
</style>