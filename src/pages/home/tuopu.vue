<template>
    <div id="topologyChart" style="width: 70vw; height: 80vh;margin-left: 5vw;">
    </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    data() {
        return {
            // 拓扑图的数据
            topologyData: {                // 节点数据 category：节点类型
                nodes: [
                    { id: '1', name: 'Node 1', category: 0 },
                    { id: '2', name: 'Node 2', category: 1 },
                    { id: '3', name: 'Node 3', category: 2 },
                    { id: '4', name: 'Node 4', category: 3 },
                    { id: '5', name: 'Node 5', category: 0 },
                    { id: '6', name: 'Node 6', category: 1 },
                    { id: '7', name: 'Node 7', category: 2 },
                    { id: '8', name: 'Node 8', category: 3 },
                    { id: '9', name: 'Node 9', category: 4 },
                ],
                // 边数据  source：初始节点 target：指向节点 
                links: [
                    { source: '1', target: '2' },
                    { source: '2', target: '3' },
                    { source: '3', target: '4' },
                    { source: '4', target: '5' },
                    { source: '5', target: '6' },
                    { source: '7', target: '6' },
                    { source: '7', target: '2' },
                    { source: '7', target: '8' },
                    { source: '9', target: '4' },
                    { source: '8', target: '9' },
                    { source: '1', target: '9' },
                    { source: '9', target: '5' },
                ],
            },
            categories: [
                {
                    name: 'Category 0'
                },
                {
                    name: 'Category 1'
                },
                {
                    name: 'Category 2'
                },
                {
                    name: 'Category 3'
                },
                {
                    name: 'Category 4'
                },
            ]
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        //Echarts数据渲染
        initChart() {
            const container = document.getElementById('topologyChart')
            this.chart = echarts.init(container)
            // 解构节点，边数据
            const { nodes, links } = this.topologyData
            // 构造节点数据
            const nodeData = nodes.map(node => ({
                id: node.id,
                name: node.name,
                symbolSize: 20,
                category: node.category
            }))
            // 构造边数据
            const edgeData = links.map(link => ({
                source: link.source,
                target: link.target
            }))
            var option = this.getOption(nodeData, edgeData);
            this.chart.setOption(option);
        },
        getOption(nodeData, edgeData) {
            return {
                title: {
                    text: '网络拓扑图',
                    left: 'center',
                    bottom: '0'
                },
                tooltip: {},
                legend: [
                    {
                        data: ['Category 0', 'Category 1', 'Category 2', 'Category 3', 'Category 4']
                    }
                ],
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        roam: true,
                        symbol: 'circle',
                        label: {
                            show: true
                        },
                        force: {
                            repulsion: 500,
                        },
                        lineStyle: {
                            color: 'red'
                        },
                        data: nodeData,
                        links: edgeData,
                        categories: this.categories,
                    }
                ]
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>
