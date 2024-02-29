<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="bot" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <div class="chart-container">
            <!-- 折线图容器 -->
            <div id="main1" class="chart"></div>
        </div>
        <!-- <PopupComponent v-if="isMouseOverBot" ref="popup" @close-popup="hidePopup" :alldata="allData" /> -->
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
            colorLine: ['#FFC22E', '#5EC2F2', '#FF4528', '#fff', '#bfc', '#dac', '#faa'],
            leftData: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 274, name: 'Union Ads' },
                { value: 235, name: 'Video Ads' },
                { value: 400, name: 'Search Engine' }
            ],
            isMouseOverBot: false,
            titleName: '雷达图'
        };
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('main1');
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
                    trigger: 'item',
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: data,
                        roseType: 'radius',
                        label: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function () {
                            return Math.random() * 200;
                        }
                    }
                ],
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
            const popupElement = this.$refs.popup.$refs.popup;
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
