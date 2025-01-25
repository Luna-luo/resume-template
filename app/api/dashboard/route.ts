import {NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // 获取查询参数
  const action = searchParams.get('action'); // 获取 "action" 参数

  if (action === 'getCompanies') {
    try {
      const companies = await prisma.company.findMany(); // 查询所有公司
      return NextResponse.json(companies); // 返回 JSON 数据
    } finally {
      await prisma.$disconnect(); // 断开数据库连接
    }
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url); // 获取查询参数
  const action = searchParams.get('action'); // 获取 "action" 参数

  if (action === 'createCompany') {
    const body = await request.json(); // 解析请求体
    const company = await prisma.company.create({ data:{
      name: body.company,
      } }); // 创建公司
    return NextResponse.json(company); // 返回 JSON 数据
  }
}
