import {NextRequest, NextResponse} from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  const company = request.nextUrl.searchParams.get('company');

  // 构建 JSON 文件路径
  const filePath = path.join(process.cwd(), 'data', `${company}-cv.json`);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  // 读取 JSON 文件内容
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const company = request.nextUrl.searchParams.get('company');

// 构建 JSON 文件路径
  const dataDir = path.join(process.cwd(), 'data'); // 指定 data 文件夹路径
  const filePath = path.join(dataDir, `${company}-cv.json`);

  // 如果 data 文件夹不存在，创建它
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir); // 创建文件夹
  }

  // 如果文件不存在，初始化文件内容
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2)); // 创建一个空 JSON 文件
  }

  // 读取 JSON 文件内容
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  // 解析请求体
  const body = await request.json();

  // 更新 JSON 文件内容
  Object.assign(data, body);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(data);
}
