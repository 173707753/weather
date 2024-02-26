export default [
	{
		path: '/',
		name: '登录',
		redirect: '/login',
	},
	{
		path: '/home',
		name: '首页',
		meta: { isTab: false, auth: true },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/home/index.vue'),
<<<<<<< HEAD
			children: [
			// {
			// 	path: '',
			// 	name: '看板',
			// 	redirect: '/kanban',
			// },
=======
		children: [
			{
				path: '',
				name: '看板',
				redirect: '/kanban',
			},
>>>>>>> 7144f21f0b06c696c3c3954ce1ca867aacc8a63d
			{
				path: '/kanban',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/kanban.vue'),
			},
			{
				path: '/dingwei',
				meta: { isTab: false, auth: true },
<<<<<<< HEAD
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/dingwei.vue'),
			},
			{
				path: '/zhenduan',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/zhenduan.vue'),
			},
			{
				path: '/tuopu',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/tuopu.vue'),
			},
			{
				path: '/yujing',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/yujing.vue'),
=======
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/dingwei.vue'),
>>>>>>> 7144f21f0b06c696c3c3954ce1ca867aacc8a63d
			},
			{
				path: '/pingu',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/pingu.vue'),
			},
			{
				path: '/shebei',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/shebei.vue'),
			},
			
			
		]
	},
	{
		path: '/main',
		name: '数据详情',
		meta: { isTab: false, auth: true },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/main/index.vue'),
	},
	// {
	//  path: '/stark',
	//  name: '指标',
	//  meta: { isTab: false },
	//  component: () =>
	//      import(/* webpackChunkName: "pages" */ '@/pages/stark/index.vue'),
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