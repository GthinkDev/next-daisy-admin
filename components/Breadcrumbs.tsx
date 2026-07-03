'use client'

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import siteConfig, { type MenuItem } from '@/libs/sites'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = () => {
	const pathname = usePathname()
	const router = useRouter()

	if (pathname === '/') {
		return null
	}

	// ✅ 构建完整的路径映射
	const pathMap = useMemo(() => {
		const map = new Map<string, string>()

		const traverse = (items: MenuItem[], parentPath: string = '') => {
			for (const item of items) {
				if (item.href) {
					map.set(item.href, item.label)
				}
				if (item.children) {
					traverse(item.children, item.href || parentPath)
				}
			}
		}

		const allMenus = [
			...siteConfig.mailMenus,
			...siteConfig.usersMenus,
			...siteConfig.marketingMenus,
			...siteConfig.financialMenus,
			...siteConfig.dataMenus,
			...siteConfig.pluginMenus,
		]

		traverse(allMenus)

		// ✅ 添加模块级路径映射（顶部导航名称）
		const moduleMap: Record<string, string> = {
			'/mail': '商城',
			'/users': '会员',
			'/marketing': '营销',
			'/financial': '财务',
			'/data': '数据',
			'/plugin': '插件',
		}

		for (const [path, label] of Object.entries(moduleMap)) {
			if (!map.has(path)) {
				map.set(path, label)
			}
		}

		return map
	}, [])

	// ✅ 构建面包屑数据
	const breadcrumbs = useMemo(() => {
		const segments = pathname.split('/').filter(Boolean)
		const result: Array<{ label: string; href: string; isLast: boolean }> = []

		// ✅ 第一级：顶部导航名称（如：商城、会员、营销...）
		const moduleName = pathMap.get('/' + segments[0]) || segments[0]
		result.push({
			label: moduleName,
			href: '/' + segments[0],
			isLast: false,
		})

		// ✅ 从第二级开始，查找菜单名称
		for (let i = 1; i < segments.length; i++) {
			const href = '/' + segments.slice(0, i + 1).join('/')

			// ✅ 先从 pathMap 中查找
			let label = pathMap.get(href)

			// ✅ 如果没找到，尝试模糊匹配
			if (!label) {
				for (const [path, name] of pathMap) {
					if (href.startsWith(path) && path !== '/' + segments[0]) {
						label = name
						break
					}
				}
			}

			// ✅ 如果仍然没找到，使用 fallback 映射
			if (!label) {
				const fallbackMap: Record<string, string> = {
					products: '商品管理',
					orders: '订单管理',
					logistics: '物流管理',
					settings: '商城设置',
					levels: '会员等级',
					points: '积分管理',
					analysis: '会员分析',
					coupons: '优惠券管理',
					channels: '推广渠道',
					income: '收支管理',
					bills: '账单记录',
					reports: '财务报表',
					export: '数据导出',
					installed: '已安装插件',
					market: '插件市场',
					config: '插件配置',
					selling: '出售中',
					soldout: '已售罄',
					warehouse: '仓库中',
					recycle: '回收站',
					batch: '批量设置',
					pending: '待发货',
					unpaid: '待付款',
					shipping: '待收货',
					completed: '已完成',
					closed: '已关闭',
					all: '全部订单',
					processing: '订单处理',
					rights: '维权订单',
					reviews: '评价管理',
					'batch-ship': '批量发货',
					'enhanced-ship': '增强发货',
					monitor: '物流监控',
					methods: '配送方式',
					share: '分享设置',
					announcements: '公告管理',
					trade: '交易设置',
					categories: '分类层级',
					groups: '商品分组',
					tags: '标签管理',
				}
				label = fallbackMap[segments[i]] || segments[i]
			}

			result.push({
				label,
				href,
				isLast: href === pathname,
			})
		}

		return result
	}, [pathname, pathMap])

	if (breadcrumbs.length === 0) {
		return null
	}

	return (
		<nav className='flex items-center gap-1 text-sm' aria-label='面包屑导航'>
			{breadcrumbs.map((item, index) => (
				<React.Fragment key={`${item.href}-${index}`}>
					{index === 0 ? (
						// ✅ 第一级：顶部导航名称，显示 Home 图标
						<button className='flex items-center gap-1.5 text-base-content/70 font-medium hover:text-primary transition-colors px-1.5 py-1 rounded-md hover:bg-base-200/50 no-underline'>
							{item.label}
						</button>
					) : item.isLast ? (
						// ✅ 当前页面：高亮显示，不可点击
						<span className=' font-bold px-1.5 py-1'>{item.label}</span>
					) : (
						// ✅ 中间层级：可点击
						<button className='text-base-content/80 font-medium hover:text-primary transition-colors px-1.5 py-1 rounded-md hover:bg-base-200/50 no-underline'>
							{item.label}
						</button>
					)}
					{/* ✅ 分隔符（只在非最后一项显示） */}
					{!item.isLast && <ChevronRight className='w-3.5 h-3.5 text-base-content shrink-0' />}
				</React.Fragment>
			))}
		</nav>
	)
}

export default Breadcrumbs
