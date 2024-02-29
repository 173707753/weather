<template>
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="bot" @mouseenter="showPopup"
        @mouseleave="onBotMouseLeave">
        <!-- 渲染位置 -->
        <div id="main2" style="height: 100%;width: 100%;"></div>
        <!-- <PopupComponent v-if="isMouseOverBot" ref="popup1" @close-popup="hidePopup" :alldata="allData" /> -->
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
                {
                    name: '柱状图',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 7, 14, 25, 40, 59, 77, 98, 93, 118, 151, 158, 177, 175, 179, 230, 265, 262, 255, 274, 227, 308, 270, 290, 344, 355, 329, 354, 343, 330, 312, 322, 322, 335, 356, 326, 327, 312, 293, 258, 236, 209, 187, 164, 133, 109, 87, 67, 46, 31, 22, 14, 11, 9, 9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
            ],
            titleName: '柱状图',
            isMouseOverBot: false,
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
                    text: this.titleName,
                    textStyle: {
                        color: '#fff',
                    },
                    left: '3%',
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
                    name: '',
                    data: Array.from({ length: this.leftData[0].data.length + 1 }, (_, i) => i),
                    // data: [
                    //     '0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
                    // ],
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
    #main2 {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../../../../assets/img/jiduan/content_kuang.png');
        transform: translateX(-50%);
        animation-name: moveRight;
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
    }
}
</style>
