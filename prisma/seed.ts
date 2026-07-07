// scripts/seed.ts
import { PrismaClient, Prisma } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
	adapter,
})

// ✅ 修复：添加括号，补全函数体
function generateMockUserInfo(index: number): Prisma.UserInfoCreateInput {
	return {
		name: `User ${index}`,
		email: `user${index}@example.com`,
		// 可根据需要添加其他字段
		// createdAt: new Date(),
		// updatedAt: new Date(),
	}
}

// ✅ 生成多条模拟数据
function generateMockUsers(count: number = 10): Prisma.UserInfoCreateInput[] {
	const users: Prisma.UserInfoCreateInput[] = []
	for (let i = 1; i <= count; i++) {
		users.push(generateMockUserInfo(i))
	}
	return users
}

// ✅ 完善 main 函数，添加错误处理和批量插入
export async function main() {
	try {
		console.log('🚀 开始插入模拟数据...')

		const userData = generateMockUsers(10)

		// ✅ 使用 createMany 批量插入，提高性能
		const result = await prisma.user.createMany({
			data: userData,
			skipDuplicates: true, // 跳过重复数据（如果 email 有唯一约束）
		})

		console.log(`✅ 成功插入 ${result.count} 条用户数据`)

		// ✅ 可选：查询验证
		const totalUsers = await prisma.user.count()
		console.log(`📊 当前数据库共有 ${totalUsers} 条用户数据`)

		return result
	} catch (error) {
		console.error('❌ 插入数据失败:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}

// ✅ 只在直接运行时执行
if (require.main === module) {
	main()
		.then(() => {
			console.log('🎉 数据填充完成')
			process.exit(0)
		})
		.catch((error) => {
			console.error('💥 程序异常退出:', error)
			process.exit(1)
		})
}

// ✅ 导出供其他模块使用
export { generateMockUserInfo, generateMockUsers }
