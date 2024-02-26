export default [
	{
		path: '/',
		name: '登录',
		redirect: '/login',
	},
	{
		path: '/home',
		name: '首页',
		meta: { isTab: false },
		component: () =>
		import(/* webpackChunkName: "pages" */ '@/pages/home/index.vue'),
		children: [
			{
				path: '',
				redirect: () =>
				import(/* webpackChunkName: "pages" */ '@/pages/home/kanban.vue'),
			  },
			{
				path: '/kanban',
				component: () =>
				import(/* webpackChunkName: "pages" */ '@/pages/home/kanban.vue'),
			},
			{
				path: '/dingwei',
				component: () =>
				import(/* webpackChunkName: "pages" */ '@/pages/home/dingwei.vue'),
			},
		]
	},
	{
		path: '/index',
		name: '首页',
		meta: { isTab: false },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/home/index.vue'),
	},
	{
		path: '/main',
		name: '数据详情',
		meta: { isTab: false },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/main/index.vue'),
	},
	// {
	// 	path: '/stark',
	// 	name: '指标',
	// 	meta: { isTab: false },
	// 	component: () =>
	// 		import(/* webpackChunkName: "pages" */ '@/pages/stark/index.vue'),
	// },
	{
		path: '/login',
		name: 'Login',
		meta: { isTab: false },
		component: () =>
			import('@/pages/login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		meta: { isTab: false },
		component: () =>
			import('@/pages/register.vue'),
	},
]
