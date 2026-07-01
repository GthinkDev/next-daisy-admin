import { Inter, Lusitana, Noto_Sans_SC, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const lusitana = Lusitana({
	weight: ['400', '700'],
	subsets: ['latin'],
})

const notoSansSC = Noto_Sans_SC({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	display: 'swap',
})

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700'], // 只加载需要的字重
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	// 如果不需要所有字重，减少加载
})

export { inter, lusitana, notoSansSC, poppins }
