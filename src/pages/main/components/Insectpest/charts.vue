<template>
    <div id="chartMain" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    props: {
        allcharts: Object, // 声明名为 alldata 的 prop，其类型为对象
    },
    data() {
        return {
            seriesData: [],
            indicatorData: []
        }
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            var chartDom = document.getElementById('chartMain');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                color: ['blue', 'yellow', '#67F9D8', '#FFE434', '#56A3F1', '#eee'],
                title: {
                    left: 'center',
                    text: this.allcharts.txt,
                    textStyle: {
                        fontSize: 18,  // 根据需要设置标题的字体大小
                        fontWeight: 'bold',  // 根据需要设置标题的字体粗细
                        color: '#fff'
                    },
                },
                legend: {
                    bottom: '0',
                    textStyle: {
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                },
                radar: {
                    indicator: this.indicatorData,
                    // [
                    // { name: '6:00', },
                    // { name: '10:00', },
                    // { name: '12:00', },
                    // { name: '14:00', },
                    // { name: '16:00', },
                    // { name: '20:00', }
                    // ],
                    //修改indicator文字的颜色
                    axisName: {
                        formatter: '{value}',
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                    splitNumber: 4,
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(0,0,0,0)'
                                // '#77EADF',
                                // '#26C3BE', '#64AFE9', '#428BD4'
                            ],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10
                        }
                    },
                },
                series: [
                    {
                        type: 'radar',
                        data: this.seriesData,
                    }
                ]
            };
            option && myChart.setOption(option);
        },
    },
    mounted() {
        // 处理数据
        this.seriesData = this.allcharts.data.map((item, index) => ({
            value: item,
            name: this.allcharts.time[index],
            label: {
                // show: true,
                color: '#fff',
                fontWeight: 'bold',
            },
        })),
            this.indicatorData = this.allcharts.indicatorData
        this.initChart();
    },
}
</script>

<style lang="scss" scoped>
.chart {
    position: absolute;
    top: 13.5%;
    left: 28.94%;
    width: 39.9%;
    height: 50%;
    border: 3px solid #4187B3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 9999;
    border-radius: 6px;
    background-color: rgba(0, 25, 47, 0.9);
    // background-color: rgb(255, 255, 255);
}
</style>