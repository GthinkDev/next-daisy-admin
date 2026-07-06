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
	ShieldUser,
	type LucideIcon,
	Store,
	Package,
	Settings,
	ShoppingBag,
	Truck,
	Bolt,
	ClipboardList,
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
		{ name: '商城', url: '/mail/products/selling', icon: Store },
		{ name: '会员', url: '/users/management/lists', icon: Users },
		{ name: '营销', url: '/marketing', icon: LoaderPinwheel },
		{ name: '财务', url: '/financial', icon: DollarSign },
		{ name: '数据', url: '/data', icon: BarChart3 },
		{ name: '插件', url: '/plugin', icon: Puzzle },
	],

	// ✅ 会员模块菜单（左侧栏）
	usersMenus: [
		{
			label: '会员管理',
			href: '/users/management', // ✅ 添加 href
			icon: Users,
			isOpen: true,
			children: [
				{ label: '会员列表', href: '/users/management/lists' },
				{ label: '会员等级', href: '/users/management/levels' },
				{ label: '积分管理', href: '/users/management/points' },
				{ label: '会员分析', href: '/users/management/analysis' },
			],
		},
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
	mailMenus: [
		{
			label: '商品管理',
			href: '/mail/products', // ✅ 添加 href
			icon: Package,
			isOpen: true,
			children: [
				{ label: '出售中', href: '/mail/products/selling' },
				{ label: '已售罄', href: '/mail/products/soldout' },
				{ label: '仓库中', href: '/mail/products/warehouse' },
				{ label: '回收站', href: '/mail/products/recycle' },
				{
					label: '商品设置',
					href: '/mail/products/settings', // ✅ 添加 href
					icon: Bolt,
					children: [
						{ label: '分类层级', href: '/mail/products/settings/categories' },
						{ label: '商品分组', href: '/mail/products/settings/groups' },
						{ label: '标签管理', href: '/mail/products/settings/tags' },
					],
				},
				{ label: '批量设置', href: '/mail/products/batch' },
			],
		},
		{
			label: '订单管理',
			href: '/mail/orders', // ✅ 添加 href
			icon: ShoppingBag,
			isOpen: true,
			children: [
				{ label: '待发货', href: '/mail/orders/pending' },
				{ label: '待付款', href: '/mail/orders/unpaid' },
				{ label: '待收货', href: '/mail/orders/shipping' },
				{ label: '已完成', href: '/mail/orders/completed' },
				{ label: '已关闭', href: '/mail/orders/closed' },
				{ label: '全部订单', href: '/mail/orders/all' },
				{
					label: '订单处理',
					href: '/mail/orders/processing', // ✅ 添加 href
					icon: ClipboardList,
					children: [
						{ label: '维权订单', href: '/mail/orders/processing/rights' },
						{ label: '评价管理', href: '/mail/orders/processing/reviews' },
					],
				},
				{ label: '批量发货', href: '/mail/orders/batch-ship' },
				{ label: '订单导出', href: '/mail/orders/export' },
				{ label: '增强发货', href: '/mail/orders/enhanced-ship' },
			],
		},
		{
			label: '物流管理',
			href: '/mail/logistics', // ✅ 添加 href
			icon: Truck,
			isOpen: true,
			children: [
				{ label: '物流监控', href: '/mail/logistics/monitor' },
				{ label: '配送方式', href: '/mail/logistics/methods' },
				{ label: '物流设置', href: '/mail/logistics/settings' },
			],
		},
		{
			label: '商城设置',
			href: '/mail/settings', // ✅ 添加 href
			icon: Cog,
			isOpen: true,
			children: [
				{ label: '分享设置', href: '/mail/settings/share' },
				{ label: '公告管理', href: '/mail/settings/announcements' },
				{ label: '交易设置', href: '/mail/settings/trade' },
			],
		},
	],

	metadata: [{ title: 'Next-Daisy-App', description: '' }],
}

export default siteConfig
