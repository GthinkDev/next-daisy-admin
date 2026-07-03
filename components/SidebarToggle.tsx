// src/components/SidebarToggle/index.tsx
'use client'

import { PanelRightClose, PanelRightOpen } from 'lucide-react'
import React, { useState, useEffect } from 'react'

interface SidebarToggleProps {
	/** 侧边栏是否默认展开 */
	defaultOpen?: boolean
	/** 切换回调 */
	onToggle?: (isOpen: boolean) => void
	/** 自定义类名 */
	className?: string
}

const SidebarToggle = ({ defaultOpen = true, onToggle, className = '' }: SidebarToggleProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	// 从 localStorage 恢复状态
	useEffect(() => {
		const saved = localStorage.getItem('sidebar_open')
		if (saved !== null) {
			const open = saved === 'true'
			setIsOpen(open)
			onToggle?.(open)
		}
	}, [onToggle])

	const toggle = () => {
		const newState = !isOpen
		setIsOpen(newState)
		localStorage.setItem('sidebar_open', String(newState))
		onToggle?.(newState)
	}

	return (
		<button
			onClick={toggle}
			className={`btn btn-circle btn-ghost btn-sm transition-all duration-200  ${className}`}
			aria-label={isOpen ? '收起侧边栏' : '展开侧边栏'}
			title={isOpen ? '收起侧边栏' : '展开侧边栏'}
		>
			{isOpen ? (
				// 展开状态：显示向左箭头（表示收起）
				<PanelRightOpen className='w-4.5 h-4.5' />
			) : (
				// 收起状态：显示向右箭头（表示展开）
				<PanelRightClose className='w-4.5 h-4.5' />
			)}
		</button>
	)
}

export default SidebarToggle
