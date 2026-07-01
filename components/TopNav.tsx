// src/components/TopNav/index.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import siteConfig from '@/libs/sites'
import Themes from './Themes'
import { Languages } from 'lucide-react'

const TopNav = () => {
	const sites = siteConfig.sites
	const pathname = usePathname()

	const isActive = (url: string) => {
		if (url === '/') return pathname === '/'
		return pathname.startsWith(url)
	}

	return (
		<section className='flex gap-4 items-center justify-start h-11 z-50'>
			{/* Logo */}
			<div className='w-60 rounded-full h-full items-center flex justify-center'>
				<button className='btn btn-ghost btn-primary btn-circle w-full h-full'>Logo</button>
			</div>

			{/* 导航菜单 */}
			<div className='h-full flex-1 '>
				<ul className='w-fit h-full items-center flex-1 rounded-full gap-2   p-1 box-shadow bg-base-100'>
					{sites.map((item) => {
						const active = isActive(item.url)
						return (
							<Link
								href={item.url}
								key={item.url}
								className={`
                  btn btn-ghost rounded-full h-full   border-none  hover:border-none   
                  ${active ? 'bg-primary text-primary-content ' : 'hover:bg-base-content/10'}
                `}
							>
								<item.icon className='w-4 h-4' />
								{item.name}
							</Link>
						)
					})}
				</ul>
			</div>

			{/* 右侧操作按钮 */}
			<div className='w-fit h-full items-center flex gap-3 rounded-full  box-shadow p-1'>
				<Themes />
				<div className='w-px h-1/3 bg-base-content/30' />
				<button className='button-hover-global '>
					<Languages className='w-4 h-4' />
				</button>
				<div className='w-px h-1/3 bg-base-content/30' />
				<button className='button-hover-global '>
					<Languages className='w-4 h-4' />
				</button>
			</div>
		</section>
	)
}

export default TopNav
