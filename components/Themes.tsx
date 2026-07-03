'use client'

import React, { useState, useEffect } from 'react'

// 所有主题只保留中文名称（按顺序对应 DaisyUI 内置主题）
const THEME_NAMES = [
	'明亮模式',
	'暗黑模式',
	'纸杯蛋糕',
	'大黄蜂色',
	'翡翠梦境',
	'商务风格',
	'合成浪潮',
	'复古风格',
	'赛博朋克',
	'粉色情人节',
	'万圣节',
	'花园清新',
	'森林绿意',
	'水蓝清爽',
	'低保真风',
	'粉彩柔和',
	'奇幻色彩',
	'线框风格',
	'纯黑极简',
	'纸醉金迷',
	'德古拉暗',
	'印刷四色',
	'秋日暖阳',
	'简约商务',
	'迷幻色彩',
	'柠檬清新',
	'夜色深沉',
	'咖啡醇香',
	'凛冬之寒',
	'微光朦胧',
	'北欧极简',
	'日落余晖',
]

// DaisyUI 内置主题（按顺序对应上面的中文名称）
const DAISYUI_THEMES = [
	'light',
	'dark',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter',
	'dim',
	'nord',
	'sunset',
]

const Themes = () => {
	const [currentTheme, setCurrentTheme] = useState<string>('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'light'
		setCurrentTheme(savedTheme)
		document.documentElement.setAttribute('data-theme', savedTheme)
	}, [])

	const handleThemeChange = (theme: string) => {
		setCurrentTheme(theme)
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}

	// 根据英文主题名获取对应的中文名称
	const getThemeLabel = (theme: string) => {
		const index = DAISYUI_THEMES.indexOf(theme)
		return index !== -1 ? THEME_NAMES[index] : theme
	}

	return (
		<div className='dropdown dropdown-end'>
			<div
				tabIndex={0}
				role='button'
				className='btn btn-ghost gap-2 rounded-full hover:bg-base-content/10 border-none  hover:border-none'
			>
				<span className='text-sm font-bold'>{getThemeLabel(currentTheme)}</span>
				<svg
					width='12px'
					height='12px'
					className='inline-block h-2 w-2 fill-current opacity-60'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 2048 2048'
				>
					<path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
				</svg>
			</div>

			<ul
				tabIndex={-1}
				className='dropdown-content mt-8 gap-1 bg-base-200 rounded-box w-56 px-3 py-5 shadow-2xl max-h-120 overflow-y-auto '
			>
				<li className='menu-title text-xs sticky z-50 px-4'>选择主题</li>
				{DAISYUI_THEMES.map((theme, index) => (
					<li key={theme}>
						<button
							onClick={() => handleThemeChange(theme)}
							className={`
                w-full btn btn-md btn-block justify-start
                ${currentTheme === theme ? 'btn-primary' : 'btn-ghost'}
              `}
						>
							{THEME_NAMES[index]}
							{currentTheme === theme && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='2.5'
									stroke='currentColor'
									className='size-4 ml-auto shrink-0'
								>
									<path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
								</svg>
							)}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Themes
