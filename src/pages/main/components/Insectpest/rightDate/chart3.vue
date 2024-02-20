<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="top" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <div class="st_titles">
            ELM模型发电功率预测
        </div>
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="chart3" class="chart">

            </div>
        </div>
        <PopupComponent v-if="isMouseOverBot" ref="popup3" @close-popup="hidePopup" :alldata="allData" />
    </div>
</template>
<script>
import * as echarts from 'echarts'
import PopupComponent from '../PopupComponent.vue'
export default {
    components: { PopupComponent },
    data() {
        return {
            loading: false,
            isMouseOverBot: false,
            colorLine: ['#FF4528'],
            tabindex: 0,
            rightData: [
                {
                    name: '预测功率',
                    data: []
                },
            ],
            allData: [
            ]
        };
    },
    created() {
        this.$bus.$on('left3', () => {
            this.changeEnergy(2)
        })
        this.$bus.$on('left4', () => {
            this.changeNewenergy(2)
        })
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('chart3');
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
        getOption(data = this.rightData) {
            return {
                title: {
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
                    name: 't/min',
                    data: Array.from({ length: 58 }, (_, i) => i),
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
                        // name: 'P/MW',
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
                                color: '#FF4528'
                            },
                            {
                                offset: 1,
                                color: 'rgb(255, 154, 131)'
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
            this.isMouseOverBot = true;
            this.allData[0].name = 'ELM模型发电功率预测'
        },
        hidePopup() {
            this.isMouseOverBot = false;
        },
        onBotMouseLeave(event) {
            // 获取鼠标位置
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            // 获取 PopupComponent 的 DOM 元素
            const popupElement = this.$refs.popup3.$refs.popup;
            const leftElement = this.$el;
            // 获取 PopupComponent 的位置和尺寸
            const popupRect = popupElement.getBoundingClientRect();
            const leftRect = leftElement.getBoundingClientRect();

            // 判断鼠标是否在 PopupComponent 区域内
            if (
                mouseX < popupRect.left ||
                // mouseX > popupRect.right ||
                mouseY < popupRect.top ||
                mouseY > popupRect.bottom ||
                // mouseX < leftRect.left ||
                mouseX > leftRect.right ||
                mouseY < leftRect.top ||
                mouseY > leftRect.bottom
            ) {
                // console.log('离开');
                this.hidePopup();
            }
        },
    },
    mounted() {
        this.$bus.$on('rightdata_new', (data) => {
            data.forEach((item) => {
                // 预测功率
                this.rightData[0].data.push(item.prediction_result3)
            })
            this.allData = []
            this.allData = data
            this.updateChart(this.rightData);
        })
    },
    beforeDestroy() {
        this.$bus.$off('rightdata_new')
    }
}
</script>
<style lang="scss" scoped>
.top {
    width: 100%;
    /* height: 100%; */
    z-index: 99999;
    height: 34vh;
    /* padding-bottom: 5.5vh; */
    /* height: 28vh; */
}

.st_titles {
    background-size: 100% 107%;
    background-repeat: no-repeat;
    background-image: url('../../../../../assets/img/ch/item_new.png');
}

.chart-container {
    position: relative;
    height: calc(100% - 4vh);
    background-size: 100% 107%;
    background-repeat: no-repeat;
    background-image: url('../../../../../assets/img/ch/chbg_new.png');
    transform: translateX(-50%);
    animation-name: moveRightToLeft;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;

    .chart {
        width: 100%;
        height: 100%;
    }

    .button-container {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .energy-button {
        padding: 1px 2px;
        margin: 2px;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        color: rgb(55, 209, 259);
        transition: background-color 0.3s;

        &.conventional {
            background-color: rgba(84, 122, 194, .5);
        }

        &.new {
            background-color: rgba(84, 122, 194, .5);
        }

        &:hover {
            color: rgb(2, 188, 233);
            background-color: rgb(14, 33, 72);
        }
    }
}

/* .chartclass{

} */
</style>