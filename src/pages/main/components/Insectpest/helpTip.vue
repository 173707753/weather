<template>
    <div>
        <Dialog v-if="helpTipVisible" :title="`数据管理`">
            <template slot="container">
                <el-select size="small" v-model="value" placeholder="请选择">

                </el-select>
            </template>
            <template slot="bottombtn">
                <el-button @click="sure" size="small" type="primary">确定</el-button>
            </template>
        </Dialog>
    </div>
</template>
  
<script>
import Dialog from '@/components/dialog.vue'
export default {
    props: ["helpTipVisible"],
    components: {
        Dialog,
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {
        closeDialog() {
            this.helpTipVisible = false
        },
        sure() {
            this.helpTipVisible = false
        }
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
::v-deep .el-menu-item-group>ul {
    overflow: hidden;
}

/deep/ .el-input__inner {
    background-color: #fff0;
}
</style>