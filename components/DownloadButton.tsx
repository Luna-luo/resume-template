"use client";
import axios from "axios";

export function DownloadButton({ anchorClassName, fileName }: { anchorClassName: string, fileName: string }) {
  const handleDownload = async () => {
    // 获取页面中包含内容的容器 HTML 字符串
    const resumeContent = document.querySelector(anchorClassName)?.outerHTML;
    if (!resumeContent) {
      alert('未找到简历内容！');
      return;
    }

    // 提取所有 styled-jsx 注入的 <style> 标签
    const styleTags = Array.from(document.querySelectorAll('style[data-styled-jsx]'))
      .map(tag => tag.outerHTML)
      .join('\n');

    // 提取外部样式表（比如 TailwindCSS）链接
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(tag => tag.outerHTML)
      .join('\n');

    // 构造完整的 HTML 文档
    const completeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base href="${window.location.origin}/">
           ${linkTags}
          ${styleTags}
        </head>
        <body>
          ${resumeContent}
        </body>
      </html>
    `;

    try {
      const response = await axios.post("/api/download",
        { htmlContent: completeHtml },
        { responseType: "blob" } // 重要：设置 responseType 为 blob
      );

      // 创建 Blob 对象并触发下载
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Jinxu-" + fileName + ".pdf";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('PDF 生成失败：', error);
      alert('PDF 生成失败，请检查控制台信息。');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded shadow-lg hover:bg-blue-600"
    >
      Download PDF
    </button>
  );
}
