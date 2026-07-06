// components/UserLists.tsx
'use client'

import React, { useState } from 'react'
import SearchBar from './SearchBar'
import TableList from './TableList'
import ButtonBar from './ButtonBar'

const UserLists = () => {
	const [isSearchVisible, setIsSearchVisible] = useState(true)

	const toggleSearch = () => {
		setIsSearchVisible(!isSearchVisible)
	}

	return (
		<div className='flex flex-col gap-4'>
			{/* ✅ 优化后的搜索栏过渡动画 */}
			<div
				className={`
					grid transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
					${
						isSearchVisible
							? 'grid-rows-[1fr] opacity-100 translate-y-0 scale-100'
							: 'grid-rows-[0fr] opacity-0 -translate-y-2 scale-95'
					}
				`}
			>
				<div className='overflow-hidden'>
					<SearchBar />
				</div>
			</div>

			<ButtonBar onSearchToggle={toggleSearch} isSearchVisible={isSearchVisible} />

			<TableList />
		</div>
	)
}

export default UserLists
