// src/libs/sites.ts
import {
	Home,
	Database,
	Cog,
	LoaderPinwheel,
	CalendarFold,
	Mail,
	Users,
	BarChart3,
	DollarSign,
	Database as DatabaseIcon,
	Puzzle,
	type LucideIcon,
	Store,
} from 'lucide-react'

// ✅ 导出 MenuItem 类型，供其他模块使用
export interface MenuItem {
	label: string
	href?: string
	icon?: LucideIcon
	children?: MenuItem[]
	isOpen?: boolean
}

const siteConfig = {
	// ✅ 主导航（顶部菜单）
	sites: [
		{ name: '首页', url: '/', icon: Home },
		{ name: '商城', url: '/mail', icon: Database },
		{ name: '会员', url: '/users', icon: Users },
		{ name: '营销', url: '/marketing', icon: LoaderPinwheel },
		{ name: '财务', url: '/financial', icon: DollarSign },
		{ name: '数据', url: '/data', icon: BarChart3 },
		{ name: '插件', url: '/plugin', icon: Puzzle },
	],

	// ✅ 会员模块菜单（左侧栏）
	usersMenus: [
		{ label: '会员列表', href: '/users', icon: Users },
		{ label: '会员等级', href: '/users/levels', icon: Cog },
		{ label: '积分管理', href: '/users/points', icon: Cog },
		{ label: '会员分析', href: '/users/analysis', icon: BarChart3 },
	],

	// ✅ 营销模块菜单（左侧栏）
	marketingMenus: [
		{ label: '营销活动', href: '/marketing', icon: LoaderPinwheel },
		{ label: '优惠券管理', href: '/marketing/coupons', icon: Cog },
		{ label: '推广渠道', href: '/marketing/channels', icon: Cog },
		{ label: '营销分析', href: '/marketing/analysis', icon: BarChart3 },
	],

	// ✅ 财务模块菜单（左侧栏）
	financialMenus: [
		{ label: '财务概览', href: '/financial', icon: DollarSign },
		{ label: '收支管理', href: '/financial/income', icon: Cog },
		{ label: '账单记录', href: '/financial/bills', icon: Cog },
		{ label: '财务报表', href: '/financial/reports', icon: BarChart3 },
	],

	// ✅ 数据模块菜单（左侧栏）
	dataMenus: [
		{ label: '数据概览', href: '/data', icon: BarChart3 },
		{ label: '数据报表', href: '/data/reports', icon: DatabaseIcon },
		{ label: '数据大屏', href: '/data/dashboard', icon: DatabaseIcon },
		{ label: '数据导出', href: '/data/export', icon: Cog },
	],

	// ✅ 插件模块菜单（左侧栏）
	pluginMenus: [
		{ label: '插件中心', href: '/plugin', icon: Puzzle },
		{ label: '已安装插件', href: '/plugin/installed', icon: Cog },
		{ label: '插件市场', href: '/plugin/market', icon: Cog },
		{ label: '插件配置', href: '/plugin/config', icon: Cog },
	],

	// ✅ 商城模块菜单（左侧栏）
	// mailMenus: [],
	// ✅ 默认后台菜单（备用）
	mailMenus: [
		{
			label: '商城首页',
			href: '/mail',
			icon: Store,
		},
		{
			label: '用户管理',
			icon: CalendarFold,
			isOpen: true,
			children: [
				{ label: '用户列表', href: '/mail/user/users' },
				{ label: '角色权限', href: '/mail/user/roles' },
				{
					label: '组织架构',
					icon: CalendarFold,
					children: [
						{ label: '部门管理', href: '/mail/user/org/departments' },
						{ label: '岗位设置', href: '/mail/user/org/positions' },
					],
				},
			],
		},
		{
			label: '内容管理',
			icon: CalendarFold,
			isOpen: true,
			children: [
				{ label: '文章列表', href: '/posts' },
				{ label: '分类标签', href: '/posts/categories' },
			],
		},
		{
			label: '系统设置',
			isOpen: true,
			icon: CalendarFold,
			children: [
				{ label: '基本设置', href: '/settings' },
				{ label: '安全设置', href: '/settings/security' },
			],
		},
	],

	metadata: [{ title: 'Next-Daisy-App', description: '' }],
}

export default siteConfig
