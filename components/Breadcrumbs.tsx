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

	// ✅ 构建完整的路径映射（包含所有层级）
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

		// ✅ 添加模块级路径映射
		const moduleMap: Record<string, string> = {
			'/mail': '商城管理',
			'/users': '会员管理',
			'/marketing': '营销管理',
			'/financial': '财务管理',
			'/data': '数据管理',
			'/plugin': '插件管理',
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

		for (let i = 0; i < segments.length; i++) {
			const href = '/' + segments.slice(0, i + 1).join('/')

			let label = pathMap.get(href)

			if (!label) {
				for (const [path, name] of pathMap) {
					if (href.startsWith(path) && path !== '/') {
						label = name
						break
					}
				}
			}

			if (!label) {
				const fallbackMap: Record<string, string> = {
					mail: '商城',
					users: '会员',
					marketing: '营销',
					financial: '财务',
					data: '数据',
					plugin: '插件',
					products: '商品',
					orders: '订单',
					logistics: '物流',
					settings: '设置',
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
					export: '订单导出',
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
						// ✅ 第一级：显示 Home 图标 + 模块名
						<button className='flex items-center gap-1.5 text-base-content/70 font-medium hover:text-primary transition-colors px-1.5 py-1 rounded-md hover:bg-base-200/50 no-underline'>
							<span>{item.label}</span>
						</button>
					) : item.isLast ? (
						// ✅ 当前页面：高亮显示，不可点击
						<span className='text-base-content font-bold px-1.5 py-1'>{item.label}</span>
					) : (
						// ✅ 中间层级：可点击
						<button className='text-base-content/70 font-medium hover:text-primary transition-colors px-1.5 py-1 rounded-md hover:bg-base-200/50 no-underline'>
							{item.label}
						</button>
					)}
					{/* ✅ 分隔符（只在非最后一项显示） */}
					{!item.isLast && <ChevronRight className='w-3.5 h-3.5 text-base-content/20 shrink-0' />}
				</React.Fragment>
			))}
		</nav>
	)
}

export default Breadcrumbs
