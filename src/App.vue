<template>
    <el-button>456</el-button>
</template>

<script>
import { regUserApi } from '@/api/reg'
export default {
    async mounted() {
        let res = await regUserApi({
            username:'18073925932',
            pwd:'123456'
        })
        console.log(res);
    }
}
</script>

<style lang="scss" scoped></style>