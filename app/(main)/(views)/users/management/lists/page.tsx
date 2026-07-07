// components/UserLists.tsx
'use client'

import { useState } from 'react'
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
			{/* ✅ 极柔和过渡：多层动画叠加 */}
			<div
				className={`
					grid transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]
					${isSearchVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
				`}
			>
				<div className='overflow-hidden'>
					<div
						className={`
							transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
							${isSearchVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'}
						`}
					>
						<SearchBar />
					</div>
				</div>
			</div>

			<ButtonBar onSearchToggle={toggleSearch} isSearchVisible={isSearchVisible} />

			<TableList />
		</div>
	)
}

export default UserLists
