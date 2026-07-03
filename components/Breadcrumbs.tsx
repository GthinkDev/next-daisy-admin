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

	// ✅ 直接从菜单配置构建路径映射，所有标签都来自配置表
	const pathMap = useMemo(() => {
		const map = new Map<string, string>()

		const traverse = (items: MenuItem[]) => {
			for (const item of items) {
				if (item.href) {
					map.set(item.href, item.label)
				}
				if (item.children) {
					traverse(item.children)
				}
			}
		}

		// 遍历所有模块菜单
		const allMenus = [
			...siteConfig.mailMenus,
			...siteConfig.usersMenus,
			...siteConfig.marketingMenus,
			...siteConfig.financialMenus,
			...siteConfig.dataMenus,
			...siteConfig.pluginMenus,
		]

		traverse(allMenus)

		// 顶部导航名称映射（用于第一级）
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

		if (segments.length === 0) return result

		// 第一级：顶部导航名称
		const moduleLabel = pathMap.get('/' + segments[0]) || segments[0]
		result.push({
			label: moduleLabel,
			href: '/' + segments[0],
			isLast: false,
		})

		// 从第二级开始，从 pathMap 中查找
		for (let i = 1; i < segments.length; i++) {
			const href = '/' + segments.slice(0, i + 1).join('/')
			const label = pathMap.get(href) || segments[i]

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
						<button className='flex items-center gap-4 text-base-content/70 font-medium hover:text-primary transition-colors px-3 py-1 rounded-md hover:cursor-pointer no-underline'>
							{item.label}
						</button>
					) : item.isLast ? (
						<span className='font-bold px-3 py-1 hover:cursor-pointer'>{item.label}</span>
					) : (
						<button className='text-base-content/80 font-medium hover:text-primary transition-colors px-3 py-1 rounded-md hover:cursor-pointer no-underline'>
							{item.label}
						</button>
					)}
					{!item.isLast && <ChevronRight className='w-3.5 h-3.5 text-base-content shrink-0' />}
				</React.Fragment>
			))}
		</nav>
	)
}

export default Breadcrumbs
