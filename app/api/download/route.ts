import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    // 从请求体中解析 JSON 数据
    const { htmlContent } = await request.json();
    if (!htmlContent) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // 保存 HTML 文件路径（这里写入 public 文件夹，注意生产环境下权限问题）
    const htmlFilePath = path.join(process.cwd(), 'public', 'temp.html');
    fs.writeFileSync(htmlFilePath, htmlContent);

    // PDF 生成路径
    const pdfFilePath = path.join(process.cwd(), 'public', 'resume.pdf');

    // 使用 Promise 包装 exec 调用 wkhtmltopdf 命令生成 PDF
    await new Promise<void>((resolve, reject) => {
      exec(`wkhtmltopdf --background --margin-top 0 --margin-bottom 0 --margin-left 0 --margin-right 0 ${htmlFilePath} ${pdfFilePath}`, (error) => {
        // 删除临时 HTML 文件
        if (fs.existsSync(htmlFilePath)) {
          fs.unlinkSync(htmlFilePath);
        }

        if (error) {
          console.error('Error generating PDF:', error);
          return reject(error);
        }
        resolve();
      });
    });

    // 读取生成的 PDF 文件
    const pdfBuffer = fs.readFileSync(pdfFilePath);
    // 删除生成的 PDF 文件
    if (fs.existsSync(pdfFilePath)) {
      fs.unlinkSync(pdfFilePath);
    }

    // 返回 PDF 文件，设置响应头让浏览器下载
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
