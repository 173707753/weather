/**
 * 全局配置文件
 */
export default {
	//http的status默认放行不才用统一处理的,
	statusWhiteList: [],
	//配置首页不可关闭
	isFirstPage: false,
	fistPage: {
		label: '首页',
		value: '/home/index',
		params: {},
		query: {},
		meta: {},
		group: [],
		close: false,
	},
	//配置菜单的属性
	menu: {
		iconDefault: 'iconfont icon-caidan',
		props: {
			label: 'name',
			path: 'path',
			icon: 'source',
			children: 'children',
		},
	},
}
