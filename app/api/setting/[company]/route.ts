import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';


export async function POST(request: Request, {params}: {params: {company: string}}) {
  const { searchParams } = new URL(request.url); // 获取查询参数
  const action = searchParams.get('action'); // 获取 "action" 参数

  const { company} = await params;
  let filePath = '';
  if (action==='saveResume') {
    // 构建 JSON 文件路径
    filePath = path.join(process.cwd(), 'data', `${company}-cv.json`);

  } else if (action==='saveCoverLetter') {

    // 构建 JSON 文件路径
    filePath = path.join (process.cwd (), 'data', `${company}-cl.json`);
  }
    // 读取 JSON 文件内容
    const fileContent = fs.readFileSync (filePath, 'utf-8');
    const data = JSON.parse (fileContent);

    // 解析请求体
    const body = await request.json ();

    // 更新 JSON 文件内容
    Object.assign (data, body);
    fs.writeFileSync (filePath, JSON.stringify (data, null, 2));
  return NextResponse.json(data);
}
