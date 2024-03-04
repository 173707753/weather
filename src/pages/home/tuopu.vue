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
            topologyData: {
                // 节点数据 category：节点类型
                nodes: [
                    { id: '1', name: 'Node 1', category: 0 },
                    { id: '2', name: 'Node 2', category: 1 },
                    { id: '3', name: 'Node 3', category: 1 },
                    { id: '4', name: 'Node 4', category: 0 },
                    { id: '5', name: 'Node 5', category: 0 },
                    { id: '6', name: 'Node 6', category: 1 },
                ],
                // 边数据  source：初始节点 target：指向节点 
                links: [
                    { source: '1', target: '2' },
                    { source: '1', target: '3' },
                    { source: '2', target: '4' },
                    { source: '3', target: '4' }
                ]
            }
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
                symbolSize: 30,
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
                        data: ['Category 0', 'Category 1']
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
                        force: {
                            repulsion: 100
                        },
                        data: nodeData,
                        links: edgeData,
                        categories: [
                            {
                                name: 'Category 0'
                            },
                            {
                                name: 'Category 1'
                            }
                        ]
                    }
                ]
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>
