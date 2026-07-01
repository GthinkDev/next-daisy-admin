// components/Breadcrumbs/index.tsx
'use client'

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import siteConfig, { type MenuItem } from '@/libs/sites'
import Link from 'next/link'
import { Home } from 'lucide-react'

const Breadcrumbs = () => {
	const pathname = usePathname()
	const router = useRouter()

	if (pathname === '/') {
		return null
	}

	// 构建路径映射
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

	// 获取面包屑
	const breadcrumbs = useMemo(() => {
		const segments = pathname.split('/').filter(Boolean)
		const result: Array<{ label: string; href: string; isLast: boolean }> = []

		for (let i = 0; i < segments.length; i++) {
			const href = '/' + segments.slice(0, i + 1).join('/')

			let label = pathMap.get(href)

			if (!label) {
				for (const [path, name] of pathMap) {
					if (href.startsWith(path + '/')) {
						label = name
						break
					}
				}
			}

			if (!label) {
				label = segments[i]
			}

			if (pathMap.has(href) || href === pathname) {
				result.push({
					label,
					href,
					isLast: href === pathname,
				})
			}
		}

		return result
	}, [pathname, pathMap])

	if (breadcrumbs.length === 0) {
		return null
	}

	return (
		<div className='breadcrumbs '>
			<ul className='flex items-center '>
				{breadcrumbs.map((item, index) => (
					<li key={`${item.href}-${index}`} className='flex items-center '>
						{item.isLast ? (
							// 当前页面高亮显示
							<button className='btn rounded-full h-full py-1.5 btn-link pointer-events-none no-underline'>
								{item.label}
							</button>
						) : (
							<button
								onClick={() => router.push(item.href)}
								className='btn h-full py-1.5 btn-link text-base-content/60  font-medium rounded-full  no-underline hover:text-primary transition-colors '
							>
								<Home className='w-4 h-4' />
								{item.label}
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Breadcrumbs
