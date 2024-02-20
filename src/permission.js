/**
 * 全站权限配置
 *
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { validatenull } from '@/utils/validate'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, _, next) => {
	NProgress.start()
	const value = to.query.src || to.fullPath
	const label = to.query.name || to.name
	const meta = to.meta || {}
	if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
		store.commit('ADD_TAG', {
			label: label,
			value: value,
			params: to.params,
			query: to.query,
		})
	}
	next()
})

router.afterEach(() => {
	NProgress.done()
})
