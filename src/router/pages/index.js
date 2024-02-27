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
=======
		children: [
>>>>>>> 2a8a1cd90547f6c34efdfc312c3ad97ce981847e
			// {
			// 	path: '',
			// 	name: '看板',
			// 	redirect: '/kanban',
			// },
			{
				path: '/kanban',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/kanban.vue'),
			},
			{
				path: '/dingwei',
				meta: { isTab: false, auth: true },
				component: () =>
					import(/* webpackChunkName: "pages" */ '@/pages/home/dingwei.vue'),
<<<<<<< HEAD
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
>>>>>>> 2a8a1cd90547f6c34efdfc312c3ad97ce981847e
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