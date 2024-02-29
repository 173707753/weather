<template>
    <div class="contain">
        <el-tabs type="border-card" style="height: 100%;">
            <el-tab-pane label="故障分类">
                <el-table :data="tableData" border max-height="700">
                    <el-table-column prop="address" label="地点" width="200">
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="200">
                    </el-table-column>
                    <el-table-column prop="type" label="故障类型" width="250">
                    </el-table-column>
                    <el-table-column prop="name" label="故障设备">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="故障定位">
                故障定位
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '设备1',
                address: '武汉市',
                type: '故障类型1'
            },
            {
                date: '2016-05-02',
                name: '设备2',
                address: '武汉市',
                type: '故障类型2'
            },
            {
                date: '2016-05-02',
                name: '设备3',
                address: '武汉市',
                type: '故障类型3'
            },
            {
                date: '2016-05-02',
                name: '设备4',
                address: '武汉市',
                type: '故障类型4'
            },
            {
                date: '2016-05-02',
                name: '设备5',
                address: '武汉市',
                type: '故障类型5'
            },
            {
                date: '2016-05-02',
                name: '设备6',
                address: '武汉市',
                type: '故障类型6'
            },
            {
                date: '2016-05-02',
                name: '设备7',
                address: '武汉市',
                type: '故障类型7'
            },
            {
                date: '2016-05-02',
                name: '设备1',
                address: '武汉市',
                type: '故障类型1'
            },
            {
                date: '2016-05-02',
                name: '设备2',
                address: '武汉市',
                type: '故障类型2'
            },
            {
                date: '2016-05-02',
                name: '设备3',
                address: '武汉市',
                type: '故障类型3'
            },
            {
                date: '2016-05-02',
                name: '设备4',
                address: '武汉市',
                type: '故障类型4'
            },
            {
                date: '2016-05-02',
                name: '设备1',
                address: '武汉市',
                type: '故障类型1'
            },
            {
                date: '2016-05-02',
                name: '设备2',
                address: '武汉市',
                type: '故障类型2'
            },
            {
                date: '2016-05-02',
                name: '设备3',
                address: '武汉市',
                type: '故障类型3'
            },
            {
                date: '2016-05-02',
                name: '设备2',
                address: '武汉市',
                type: '故障类型2'
            },
            {
                date: '2016-05-02',
                name: '设备3',
                address: '武汉市',
                type: '故障类型3'
            },
            {
                date: '2016-05-02',
                name: '设备2',
                address: '武汉市',
                type: '故障类型2'
            },
            {
                date: '2016-05-02',
                name: '设备3',
                address: '武汉市',
                type: '故障类型3'
            },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.contain {
    height: 100%;
}

/deep/.el-tabs__content {
    height: 88%;
    overflow: auto;
}

// 设置滚动条的宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 0vh;
}
</style>