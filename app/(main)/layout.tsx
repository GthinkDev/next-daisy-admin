// app/(main)/layout.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import SideBar from '@/components/SideBar'
import siteConfig from '@/libs/sites'
import TopNav from '@/components/TopNav'
import SidebarToggle from '@/components/SidebarToggle'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	// ✅ 判断是否为首页
	const isHomePage = pathname === '/'

	// ✅ 从 localStorage 恢复侧边栏状态
	useEffect(() => {
		const saved = localStorage.getItem('sidebar_open')
		if (saved !== null) {
			setIsSidebarOpen(saved === 'true')
		}
	}, [])

	// ✅ 根据当前路径获取对应的侧边栏菜单
	const getSidebarMenus = () => {
		if (pathname.startsWith('/mail')) return siteConfig.mailMenus
		if (pathname.startsWith('/users')) return siteConfig.usersMenus
		if (pathname.startsWith('/marketing')) return siteConfig.marketingMenus
		if (pathname.startsWith('/financial')) return siteConfig.financialMenus
		if (pathname.startsWith('/data')) return siteConfig.dataMenus
		if (pathname.startsWith('/plugin')) return siteConfig.pluginMenus
	}

	return (
		<div className='flex flex-col h-full gap-6'>
			{/* ✅ 顶部导航 */}
			<TopNav />

			{/* 主体区域：侧边栏 + 内容 */}
			<div className='flex flex-1 gap-4 h-full '>
				{/* ✅ 侧边栏 - 使用 transform 滑出，并用负边距隐藏占位空间 */}
				{!isHomePage && (
					<aside
						className={`
							global-card py-8 
							transition-all duration-300 ease-in-out
							shrink-0
							w-58 side-shadow 
							${isSidebarOpen ? 'translate-x-0 mr-0' : '-translate-x-full -mr-62 opacity-0'}
						`}
					>
						<SideBar title='导航菜单' menus={getSidebarMenus()} />
					</aside>
				)}

				{/* ✅ 主内容 - 自动撑满剩余空间 */}
				<main className='flex flex-col w-full  h-full'>
					{!isHomePage && (
						<section className='flex gap-2 items-center justify-start w-full py-1.5'>
							<SidebarToggle defaultOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
							<span className='menu-title text-xs'>|</span>
							<Breadcrumbs />
						</section>
					)}
					<section className='flex-1 p-1 overflow-y-auto'>{children}</section>
				</main>
			</div>
		</div>
	)
}
