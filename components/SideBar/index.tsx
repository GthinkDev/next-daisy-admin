// src/components/SideBar/index.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
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

	// ✅ 存储所有菜单的展开状态
	const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {}
		const initOpenState = (items: MenuItem[], parentKey = '') => {
			items.forEach((item, index) => {
				const key = parentKey ? `${parentKey}-${index}` : `${index}`
				if (item.isOpen || (item.href && pathname.startsWith(item.href))) {
					initial[key] = true
				}
				if (item.children) {
					const hasActiveChild = item.children.some((child) => child.href && pathname.startsWith(child.href))
					if (hasActiveChild) {
						initial[key] = true
					}
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
		return <IconComponent className='w-4 h-4 shrink-0' />
	}

	// ✅ 递归生成菜单项（带索引生成唯一 key）
	const renderMenuItem = (item: MenuItem, index: number, parentKey = '') => {
		const hasChildren = item.children && item.children.length > 0
		const active = isExactActive(item.href)
		const key = parentKey ? `${parentKey}-${index}` : `${index}`
		const isOpen = openMenus[key] || false

		if (hasChildren) {
			return (
				<li key={key} className={active ? 'menu-active rounded-field' : ''}>
					<details open={isOpen}>
						<summary
							onClick={(e) => {
								e.preventDefault()
								toggleMenu(key)
							}}
							className='cursor-pointer'
						>
							{renderIcon(item.icon)}
							<span>{item.label}</span>
						</summary>
						<div className='menu-children'>
							<ul className='my-1 flex flex-col gap-1'>
								{item.children!.map((child, childIndex) => renderMenuItem(child, childIndex, key))}
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
						<span>{item.label}</span>
					</Link>
				) : (
					<span className='px-4 py-2 text-gray-400'>
						{renderIcon(item.icon)}
						<span>{item.label}</span>
					</span>
				)}
			</li>
		)
	}

	return (
		<div className={`h-full flex flex-col ${className}`}>
			{showTitle && title && <p className='px-6 font-bold menu-title text-xs uppercase tracking-wider'>{title}</p>}

			{menus.length > 0 ? (
				<ul className='menu w-full flex flex-col gap-2'>{menus.map((item, index) => renderMenuItem(item, index))}</ul>
			) : (
				<div className='text-center text-gray-400 text-sm py-4'>暂无菜单</div>
			)}

			{/* 添加 CSS 动画 - 使用 Grid 实现平滑过渡 */}
			<style jsx global>{`
				.menu-children {
					display: grid;
					grid-template-rows: 0fr;
					transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				}
				.menu-children > ul {
					overflow: hidden;
					opacity: 0;
					transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				}
				details[open] > .menu-children {
					grid-template-rows: 1fr;
				}
				details[open] > .menu-children > ul {
					opacity: 1;
				}
			`}</style>
		</div>
	)
}

export default SideBar
