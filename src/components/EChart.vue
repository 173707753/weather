<template>
	<div class="chart-container">
		<div class="chart" :id="id"></div>
		<slot></slot>
	</div>
</template>
<script>
import * as echarts from 'echarts'

export default {
	props: {
		id: {
			//chart的id
			type: String,
			default: 'myChart',
		},
		option: {
			//图表配置
			type: Object,
			default: () => { },
		},
	},
	data() {
		return {
			chart: null, //图表实例
		}
	},
	mounted() {
		// console.log(this.option,this.id)
		// 初始化图表
		this.chart = echarts.init(document.getElementById(this.id))
		// 设置图标的配置项
		this.chart.setOption(this.option)
	},
}
</script>
<style lang="scss" scoped>
.chart-container {
	width: 8vw;
	height: 8vw;
	position: relative;
}

.chart {
	width: 100%;
	height: 100%;
}
</style>
