'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'
import type { MenuItem } from '@/libs/sites'

interface SideBarProps {
	title?: string
	menus?: MenuItem[]
	showTitle?: boolean
	className?: string
}

const SideBar = ({ title = '', menus = [], showTitle = true, className = '' }: SideBarProps) => {
	const pathname = usePathname()

	const [openMenus] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {}
		const initOpenState = (items: MenuItem[], parentKey = '') => {
			items.forEach((item, index) => {
				const key = parentKey ? `${parentKey}-${index}` : `${index}`
				if (item.children && item.children.length > 0) {
					initial[key] = true
					initOpenState(item.children, key)
				}
			})
		}
		initOpenState(menus)
		return initial
	})

	const isExactActive = (href?: string) => {
		if (!href) return false
		return pathname === href
	}

	const renderIcon = (icon?: LucideIcon) => {
		if (!icon) return null
		const IconComponent = icon
		return <IconComponent className='w-4 h-4 shrink-0' />
	}

	const renderMenuItem = (item: MenuItem, index: number, parentKey = '', depth: number = 0) => {
		const hasChildren = item.children && item.children.length > 0
		const active = isExactActive(item.href)
		const key = parentKey ? `${parentKey}-${index}` : `${index}`
		const isOpen = openMenus[key] || false
		const isTopLevel = parentKey === ''
		const shouldBold = isTopLevel || (depth === 1 && hasChildren)

		if (hasChildren) {
			return (
				<li key={key} className={active ? 'menu-active rounded-field' : ''}>
					<details open={isOpen}>
						<summary className={`cursor-pointer ${shouldBold ? 'font-extrabold' : ''}`}>
							{renderIcon(item.icon)}
							<span>{item.label}</span>
						</summary>
						<div className={`menu-children ${isOpen ? 'menu-children-open' : ''}`}>
							<ul className='my-2 flex flex-col gap-2'>
								{item.children!.map((child, childIndex) => renderMenuItem(child, childIndex, key, depth + 1))}
							</ul>
						</div>
					</details>
				</li>
			)
		}

		return (
			<li key={key} className={active ? 'menu-active rounded-field' : ''}>
				{item.href ? (
					<Link href={item.href}>
						{renderIcon(item.icon)}
						<span className={isTopLevel ? 'font-extrabold' : ''}>{item.label}</span>
					</Link>
				) : (
					<span className='px-4 text-base-content/40'>
						{renderIcon(item.icon)}
						<span className={isTopLevel ? 'font-extrabold' : 'font-medium'}>{item.label}</span>
					</span>
				)}
			</li>
		)
	}

	return (
		<div className={`h-full flex flex-col ${className} max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide`}>
			{menus.length > 0 ? (
				<ul className='menu w-full flex flex-col gap-2'>{menus.map((item, index) => renderMenuItem(item, index))}</ul>
			) : (
				<div className='text-center text-gray-400 text-sm py-4'>暂无菜单</div>
			)}
			<style jsx global>{`
				.menu-children {
					max-height: 0;
					opacity: 0;
					transform: translateY(-12px);
					overflow: hidden;
					transition:
						max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1),
						opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
						transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
				}
				.menu-children-open {
					max-height: 800px;
					opacity: 1;
					transform: translateY(0);
				}
				.menu-children:not(.menu-children-open) {
					transition:
						max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
						opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.25s,
						transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
				}
			`}</style>
		</div>
	)
}

export default SideBar
