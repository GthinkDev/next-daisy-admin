'use client'

import React, { useState, useEffect } from 'react'
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

	// ✅ 存储所有菜单的展开状态 - 默认全部展开
	const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
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

	// ✅ 当路径变化时，自动展开包含当前路径的父级菜单
	useEffect(() => {
		const newOpenMenus: Record<string, boolean> = {}
		const updateOpenState = (items: MenuItem[], parentKey = '') => {
			items.forEach((item, index) => {
				const key = parentKey ? `${parentKey}-${index}` : `${index}`
				if (item.href && pathname.startsWith(item.href)) {
					newOpenMenus[key] = true
				}
				if (item.children) {
					const hasActiveChild = item.children.some((child) => child.href && pathname.startsWith(child.href))
					if (hasActiveChild) {
						newOpenMenus[key] = true
					}
					updateOpenState(item.children, key)
				}
			})
		}
		updateOpenState(menus)
		setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }))
	}, [pathname, menus])

	// ✅ 切换菜单展开/收起
	const toggleMenu = (key: string) => {
		setOpenMenus((prev) => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	const isExactActive = (href?: string) => {
		if (!href) return false
		return pathname === href
	}

	const renderIcon = (icon?: LucideIcon) => {
		if (!icon) return null
		const IconComponent = icon
		return <IconComponent className='w-4 h-4 shrink-0 ' />
	}

	// ✅ 递归生成菜单项（带索引生成唯一 key）
	const renderMenuItem = (item: MenuItem, index: number, parentKey = '', depth: number = 0) => {
		const hasChildren = item.children && item.children.length > 0
		const active = isExactActive(item.href)
		const key = parentKey ? `${parentKey}-${index}` : `${index}`
		const isOpen = openMenus[key] || false
		// ✅ 判断是否为一级菜单
		const isTopLevel = parentKey === ''
		// ✅ 判断是否应该加粗：所有一级菜单 + 有子级的二级菜单
		const shouldBold = isTopLevel || (depth === 1 && hasChildren)

		if (hasChildren) {
			return (
				<li key={key} className={active ? 'menu-active rounded-field ' : ''}>
					<details
						open={isOpen}
						onToggle={(e) => {
							if (e.currentTarget.open !== isOpen) {
								toggleMenu(key)
							}
						}}
					>
						<summary
							onClick={(e) => {
								e.preventDefault()
								toggleMenu(key)
							}}
							className={`cursor-pointer ${shouldBold ? 'font-extrabold' : ''}`}
						>
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
					<span className='px-4 text-base-content/40 '>
						{renderIcon(item.icon)}
						<span className={isTopLevel ? 'font-extrabold' : 'font-medium'}>{item.label}</span>
					</span>
				)}
			</li>
		)
	}
	return (
		<div className={`h-full flex flex-col ${className}`}>
			{showTitle && title && <p className='px-6 font-bold menu-title text-xs uppercase tracking-wider'>{title}</p>}
			{menus.length > 0 ? (
				<ul className='menu  w-full flex flex-col gap-2'>{menus.map((item, index) => renderMenuItem(item, index))}</ul>
			) : (
				<div className='text-center text-gray-400 text-sm py-4'>暂无菜单</div>
			)}
			{/* CSS 动画 - 使用 max-height + 组合动画 */}
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
				/* 收起时更慢 */
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
