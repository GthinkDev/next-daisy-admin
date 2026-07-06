// components/ButtonBar.tsx
import { FileUp, Plus, RotateCw, SearchX, ScanSearch } from 'lucide-react'
import React from 'react'

interface ButtonBarProps {
	onSearchToggle?: () => void
	isSearchVisible?: boolean
}

const ButtonBar = ({ onSearchToggle, isSearchVisible = true }: ButtonBarProps) => {
	return (
		<div className='flex gap-2'>
			<div className='flex-1 flex gap-2'>
				<button className='btn btn-primary btn-md '>
					<Plus className='h-4' /> 添加
				</button>
				<button className='btn btn-secondary btn-md  '>
					<FileUp className='h-4' /> 导出
				</button>
			</div>
			<div className='flex gap-2'>
				<button
					className='btn btn-square btn-success btn-outline '
					onClick={onSearchToggle}
					title={isSearchVisible ? '收起搜索栏' : '展开搜索栏'}
				>
					{isSearchVisible ? <SearchX className='h-5' /> : <ScanSearch className='h-5' />}
				</button>
				<button className='btn btn-square btn-warning btn-outline btn-info'>
					<RotateCw className='h-4.5' />
				</button>
			</div>
		</div>
	)
}

export default ButtonBar
