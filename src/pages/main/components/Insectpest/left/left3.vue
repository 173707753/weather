<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="bot" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="main3" class="chart"></div>
        </div>
        <!-- <PopupComponent v-if="isMouseOverBot" ref="popup2" @close-popup="hidePopup" :alldata="allData" /> -->
    </div>
</template>

<script>
import * as echarts from 'echarts'
// import PopupComponent from '../PopupComponent.vue'
export default {
    components: {
        // PopupComponent,
    },
    data() {
        return {
            loading: false,
            colorLine: ['#FFC22E', '#5EC2F2', '', '#fff', '#bfc', '#dac', '#faa'],
            leftData: [
                {
                    name: '折线图',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 7, 14, 25, 40, 59, 77, 98, 93, 118, 151, 158, 177, 175, 179, 230, 265, 262, 255, 274, 227, 308, 270, 290, 344, 355, 329, 354, 343, 330, 312, 322, 322, 335, 356, 326, 327, 312, 293, 258, 236, 209, 187, 164, 133, 109, 87, 67, 46, 31, 22, 14, 11, 9, 9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
            ],
            titleName: '折线图',
            isMouseOverBot: false,
        };
    },
    created() {
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main3');
            this.chartInstance = echarts.init(chartDom);
            var option = this.getOption();
            this.chartInstance.setOption(option);
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
                    text: this.titleName,
                    textStyle: {
                        color: '#fff',
                    },
                    left: '3%',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    bottom: 0,
                    textStyle: {
                        color: '#fff',
                    },
                    data: data.map(item => item.name),
                    left: 'center'
                },
                xAxis: {
                    name: '',
                    data: Array.from({ length: this.leftData[0].data.length + 1 }, (_, i) => i),
                    axisLabel: {
                        show: true,
                        interval: 9,
                        textStyle: {
                            fontWeight: 'bold'
                        }
                    },
                },
                yAxis: [
                    {
                        name: '',
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
                series: data.map((item, index) => ({
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    // 是否有阴影面积
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#FFC22E'
                            },
                            {
                                offset: 1,
                                color: '#bfc'
                            }
                        ])
                    },
                    showSymbol: true,//是否默认展示圆点
                    symbol: 'circle',     //设定为实心点
                    symbolSize: 0,
                    smooth: true,
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        color: this.colorLine[index], // 设置单独的颜色
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
            this.isMouseOverBot = false;
        },
        hidePopup() {
            this.isMouseOverBot = false; // 隐藏弹窗
        },
        onBotMouseLeave(event) {
            // 获取鼠标位置
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            // 获取 PopupComponent 的 DOM 元素
            const popupElement = this.$refs.popup2.$refs.popup;
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
    },

    mounted() {
        this.updateChart(this.leftData)
    },
    beforeDestroy() {
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
}

.chart-container {
    position: relative;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../../../../assets/img/jiduan/content_kuang.png');
    transform: translateX(-50%);
    animation-name: moveRight;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;

    .chart {
        width: 100%;
        height: 100%;
    }
}
</style>
