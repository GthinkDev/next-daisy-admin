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

	// ✅ 构建路径映射
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

		const allMenus = [
			...siteConfig.mailMenus,
			...siteConfig.usersMenus,
			...siteConfig.marketingMenus,
			...siteConfig.financialMenus,
			...siteConfig.dataMenus,
			...siteConfig.pluginMenus,
		]

		traverse(allMenus)

		return map
	}, [])

	// ✅ 顶部导航名称（仅用于第一级显示）
	const moduleNames: Record<string, string> = {
		'/mail': '商城',
		'/users': '会员',
		'/marketing': '营销',
		'/financial': '财务',
		'/data': '数据',
		'/plugin': '插件',
	}

	// ✅ 构建面包屑数据
	const breadcrumbs = useMemo(() => {
		const segments = pathname.split('/').filter(Boolean)
		const result: Array<{ label: string; href: string; isLast: boolean }> = []

		if (segments.length === 0) return result

		// ✅ 第一级：使用顶部导航名称
		const firstLevelPath = '/' + segments[0]
		const firstLabel = moduleNames[firstLevelPath] || segments[0]
		result.push({
			label: firstLabel,
			href: firstLevelPath,
			isLast: false,
		})

		// ✅ 从第二级开始，从菜单配置中查找
		for (let i = 1; i < segments.length; i++) {
			const href = '/' + segments.slice(0, i + 1).join('/')
			let label = pathMap.get(href)

			// ✅ 如果找不到，尝试用父级路径
			if (!label) {
				const parentHref = '/' + segments.slice(0, i).join('/')
				label = pathMap.get(parentHref)
			}

			// ✅ 如果还是找不到，使用路径片段
			if (!label) {
				label = segments[i]
			}

			result.push({
				label,
				href,
				isLast: href === pathname,
			})
		}

		return result
	}, [pathname, pathMap, moduleNames])

	if (breadcrumbs.length === 0) {
		return null
	}

	return (
		<nav className='flex items-center gap-1 text-sm' aria-label='面包屑导航'>
			{breadcrumbs.map((item, index) => (
				<React.Fragment key={`${item.href}-${index}`}>
					{index === 0 ? (
						<button
							onClick={() => router.push(item.href)}
							className='flex items-center gap-4 text-base-content/70 font-medium hover:text-primary transition-colors px-3 py-1 rounded-md hover:cursor-pointer no-underline'
						>
							{item.label}
						</button>
					) : item.isLast ? (
						<span className='font-bold px-3 py-1'>{item.label}</span>
					) : (
						<button
							onClick={() => router.push(item.href)}
							className='text-base-content/80 font-medium hover:text-primary transition-colors px-3 py-1 rounded-md hover:cursor-pointer no-underline'
						>
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
