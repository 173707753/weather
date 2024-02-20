<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="bot" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <!-- (随机三天晴天发电功率数据) -->
        <div class="st_titles">
            季节数据
        </div>
        <!-- 渲染位置 -->
        <div id="main2" style="height: calc(100% - 4vh);width: 100%;"></div>
        <PopupComponent v-if="isMouseOverBot" ref="popup1" @close-popup="hidePopup" :alldata="allData" />
    </div>
</template>

<script>
import * as echarts from 'echarts'
import PopupComponent from '../PopupComponent.vue'
export default {
    components: {
        PopupComponent,
    },
    data() {
        return {
            loading: false,
            isMouseOverBot: false,
            colorLine: ['#FFC22E', '#5EC2F2', '#FF4528', '#fff', '#bfc', '#dac', '#faa'],
            tabindex: 0,
            leftData: [
                {
                    name: '随机数据',
                    data: []
                },
            ],
            // 表格数据
            allData: [
            ],
        };
    },
    created() {
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main2');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
        },
        changeEnergy() {
            this.updateChart(this.conventionalData);
        },
        changeNewenergy() {
            this.updateChart(this.newData);
        },
        updateChart(data) {
            if (this.chartInstance) {
                this.chartInstance.dispose(); // 销毁图表实例
            }
            this.initChart();
            this.chartInstance.setOption(this.getOption(data)); // 设置新数据
        },
        getOption(data = this.leftData) {
            return {
                title: {
                    // text: 'Bar Animation Delay',
                },
                legend: {
                    bottom: 0,
                    textStyle: {
                        color: 'rgb(55, 209, 259)',
                    },
                    data: data.map(item => item.name),
                },
                toolbox: {

                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    name: 't/h',
                    // data: Array.from({ length: this.leftData[0].data.length + 1 }, (_, i) => i),
                    data: [
                        '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30',
                        '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30',
                        '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30'
                    ],
                    axisLabel: {
                        show: true,
                        interval: 13,
                        textStyle: {
                            fontWeight: 'bold'
                        }
                    },
                },
                yAxis: [
                    {
                        name: '发电功率(P/MW)',
                        type: 'value',
                        nameTextStyle: {
                            fontWeight: 'bold'
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold'
                            }
                        },
                        axisPointer: {
                            snap: true,
                        },
                    },
                ],
                series: data.map((item,) => ({
                    name: item.name,
                    type: 'bar',
                    data: item.data,
                    // 是否有阴影面积
                    // areaStyle: {},
                    showSymbol: true,//是否默认展示圆点
                    symbol: 'circle',     //设定为实心点
                    symbolSize: 0,
                    smooth: true,
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        borderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#14c8d4' },
                            { offset: 1, color: '#43eec6' }
                        ])
                    },
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                })),
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };
        },
        //鼠标移入移出
        showPopup() {
            this.isMouseOverBot = true;
            this.allData[0].name = '季节数据'
        },
        hidePopup() {
            this.isMouseOverBot = false; // 隐藏弹窗
        },
        onBotMouseLeave(event) {
            // 获取鼠标位置
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            // 获取 PopupComponent 的 DOM 元素
            const popupElement = this.$refs.popup1.$refs.popup;
            const leftElement = this.$el;
            // 获取 PopupComponent 的位置和尺寸
            const popupRect = popupElement.getBoundingClientRect();
            const leftRect = leftElement.getBoundingClientRect();

            // 判断鼠标是否在 PopupComponent 区域内
            if (
                // mouseX < popupRect.left ||
                mouseX > popupRect.right ||
                mouseY < popupRect.top ||
                mouseY > popupRect.bottom ||
                mouseX < leftRect.left ||
                // mouseX > leftRect.right ||
                mouseY < leftRect.top ||
                mouseY > leftRect.bottom
            ) {
                // console.log('离开');
                this.hidePopup();
            }
        },
        computeSeries(data) {
            this.leftData[0].data = []
            let length = data.length
            if (data.length <= 3) { length = data.length }
            else { length = 3 }
            for (let i = 0; i < length; i++) {
                data[i].forEach((item) => {
                    this.leftData[0].data.push(item.power)
                })
            }
            let sumdata = this.leftData[0].data
            if (this.leftData[0].data.length < 100) {
                this.leftData[0].data.push(...sumdata)
                this.leftData[0].data.push(...sumdata)
            }
            this.allData = []
            if (data.length === 1) {
                for (let i = 0; i < data[0].length; i++) {
                    this.allData.push({
                        // datetimes: data[0][i].datetimes,
                        datetiming: data[0][i].datetiming,
                        power1: data[0][i].power,
                        // power2: data[1][i].power,
                        // power3: data[2][i].power,
                    })
                }
            } else if (data.length === 2) {
                for (let i = 0; i < this.alldata[0].length; i++) {
                    this.allData.push({
                        // datetimes: data[0][i].datetimes,
                        datetiming: data[0][i].datetiming,
                        power1: data[0][i].power,
                        power2: data[1][i].power,
                        // power3: data[2][i].power,
                    })
                }
            } else {
                for (let i = 0; i < data[0].length; i++) {
                    this.allData.push({
                        // datetimes: data[0][i].datetimes,
                        datetiming: data[0][i].datetiming,
                        power1: data[0][i].power,
                        power2: data[1][i].power,
                        power3: data[2][i].power,
                    })
                }
            }
            // console.log(this.allData, 'this.allData2222');
            this.updateChart(this.leftData);
        },
    },
    mounted() {
        this.$bus.$on('left2Data', (data) => {
            this.computeSeries(data);

        })
    },
    beforeDestroy() {
        this.$bus.$off('left2Data');
    }

}
</script>

<style lang="scss" scoped>
.bot {
    width: 100%;
    /* height: 100%; */
    z-index: 99999;
    height: 34vh;

    /* padding-bottom: 5.5vh; */
    /* height: 28vh; */
    #main2 {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../../../../assets/img/ch/chbg_new.png');
        transform: translateX(-50%);
        animation-name: moveRight;
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
    }
}

.st_titles {
    background-size: 100% 107%;
    background-repeat: no-repeat;
    background-image: url('../../../../../assets/img/ch/item_new.png');
}
</style>
