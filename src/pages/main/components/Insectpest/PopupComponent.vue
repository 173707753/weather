<template>
    <div class="popup" ref="popup" @mouseleave="closePopup">
        <div style="text-align: center;font-size: 24px;font-weight: bold;color: #fff;">{{ this.tableName }}</div>
        <div v-if="tableData.length === 0" style="text-align: center; margin-top: 20%;color: #fff;font-size: 24px;">
            数据正在接收请稍后...
        </div>
        <el-table height="22.5vw" v-else :header-cell-style="{ background: 'rgba(0,25,47,0.7)', color: '#fff' }"
            :data="tableData" style="width: 100%;margin-top: 2%;" border max-height="400">
            <el-table-column prop="datetimes" label="日期" width="120px" align="center"
                v-if="tableData.some(item => item.datetimes ? item.datetimes : item.datetimes === 0 ? true : false)"></el-table-column>
            <el-table-column prop="datetiming" label="时间" align="center"
                v-if="tableData.some(item => item.datetiming ? item.datetiming : item.datetiming === 0 ? true : false)"></el-table-column>
            <el-table-column prop="power" label="晴天发电功率(MW)" align="center"
                v-if="tableData.some(item => item.weather === 'sunny' ? true : false)"></el-table-column>
            <el-table-column prop="power" label="多云发电功率(MW)" align="center"
                v-if="tableData.some(item => item.weather === 'cloudy' ? true : false)"></el-table-column>
            <el-table-column prop="power" label="雨雪发电功率(MW)" align="center"
                v-if="tableData.some(item => item.weather === 'rain_snow' ? true : false)"></el-table-column>
            <el-table-column prop="power1" label="发电功率(1)(MW)" align="center"
                v-if="tableData.some(item => item.power1 ? item.power1 : item.power1 === 0 ? true : false)"></el-table-column>
            <el-table-column prop="power2" label="发电功率(2)(MW)" align="center"
                v-if="tableData.some(item => item.power2 ? item.power2 : item.power2 === 0 ? true : false)"></el-table-column>
            <el-table-column prop="power3" label="发电功率(3)(MW)" align="center"
                v-if="tableData.some(item => item.power3 ? item.power3 : item.power3 === 0 ? true : false)"></el-table-column>
            <el-table-column prop="gt" label="真实发电功率(MW)" align="center"
                v-if="tableData.some(item => item.gt ? item.gt : item.gt === 0 ? true : false)"></el-table-column>
            <el-table-column prop="pred" label="预测发电功率(MW)" align="center"
                v-if="tableData.some(item => item.pred ? item.pred : item.pred === 0 ? true : false)"></el-table-column>
            <el-table-column prop="r2_val" label="相关系数" align="center"
                v-if="tableData.some(item => item.r2_val ? item.r2_val : item.r2_val === 0 ? true : false)"></el-table-column>
            <el-table-column prop="rmse_val" label="均方误差" align="center"
                v-if="tableData.some(item => item.rmse_val ? item.rmse_val : item.rmse_val === 0 ? true : false)"></el-table-column>
            <el-table-column prop="mape_val" label="绝对百分比误差" align="center"
                v-if="tableData.some(item => item.mape_val ? item.mape_val : item.mape_val === 0 ? true : false)"></el-table-column>
        </el-table>
        <!-- 分页器 固定在底部 -->
        <!-- <el-pagination style=" position: absolute;bottom: 4px;left: 0;right: 0;" :current-page="currentPage"
            :page-sizes="[4, 6, 8]" :page-size="pageSize" :total="tableData.length"
            layout="total, sizes, prev, pager, next, jumper" @size-change="handlePageSizeChange"
            @current-change="handlePageChange">
        </el-pagination> -->
    </div>
</template>

<script>
export default {
    name: 'PopupComponent',
    props: {
        alldata: Array, // 声明名为 alldata 的 prop，其类型为数组
    },
    data() {
        return {
            // 表格数据
            tableData: [],
            time: [
                '0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
            ],
            tableName: ''
            // // 当前页数
            // currentPage: 1,
            // // 每页条数
            // pageSize: 8,
        };
    },
    created() {
    },
    methods: {
        closePopup() {
            this.$emit('close-popup'); // 发送关闭弹窗事件
        },
        updatedTable() {

            setTimeout(() => {
                this.tableName = ''
                this.tableName = this.alldata[0].name
                this.tableData = []
                this.tableData = this.alldata
            }, 400)
        },
    },
    mounted() {
        this.updatedTable(this.tableData);
    },
    beforeDestroy() {
    }
};
</script>

<style lang="scss">
.popup {
    position: fixed;
    top: 16.5%;
    left: 28.94%;
    width: 39.9%;
    height: 50%;
    border: 3px solid #4187B3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 9999;
    border-radius: 6px;
    background-color: rgba(0, 25, 47, 0.7);

    /deep/.el-table tr {
        background-color: rgba(0, 25, 47, 0.7);
    }

    /deep/ .el-table,
    .el-table__expanded-cell {
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
    }

    /deep/.el-table thead {
        background-color: rgba(0, 25, 47, 0.7);
    }

    /deep/.el-table tbody tr:hover>td {
        background-color: rgba(67, 145, 228, 0.2);
    }

    /deep/.el-table--scrollable-y .el-table__body-wrapper:-webkit-scrollbar {
        /*隐藏滚轮*/
        display: none;
    }

    /deep/.el-table--border,
    .el-table--group {
        border-color: 4187B3;
    }

    ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
        // overflow-x: hidden;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 8px;
        background-color: rgba(32, 86, 131, 0.3);
    }

    //里面滑块
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);



        -webkit-box-shadow: inset 0 0 wpx rgba(0, 0, 0, .3);
        background-color: #205683;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.2);
    }

    /deep/.el-table--border th.el-table__cell.gutter:last-of-type {
        display: none;
    }
}
</style>
<style>
.el-table {
    background-color: rgba(0, 0, 0, 0);
}

.el-table tr {
    background-color: rgba(0, 25, 47, 0.7);
}

.el-table,
.el-table__expanded-cell {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
}

.el-table thead {
    background-color: rgba(0, 25, 47, 0.7);
}

.el-table tbody tr:hover>td {
    background-color: rgba(67, 145, 228, 0.2);
}

.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
    background-color: rgba(67, 145, 228, 0.2);
}

.el-table--scrollable-y .el-table__body-wrapper:-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}

.el-table--border,
.el-table--group {
    border-color: 4187B3;
}


::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: rgba(32, 86, 131, 0.3);
}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);
    -webkit-box-shadow: inset 0 0 wpx rgba(0, 0, 0, .3);
    background-color: #205683;
    border-radius: 3px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.2);
}

.el-table--border th.el-table__cell.gutter:last-of-type {
    display: none;
}
</style>


