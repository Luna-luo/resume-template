import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadButtonProps {
  anchorClassName: string;
  fileName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = (props) => {
  const exportToPDF = async (anchorClassName: string, fileName: string) => {
    const contentElement = document.querySelector (anchorClassName); // 选取包含内容的容器
    if (!contentElement) return;

    const canvas = await html2canvas(contentElement as HTMLElement, { scale: 2 }); // 降低分辨率
    const imageData = canvas.toDataURL('image/jpeg'); // 使用 JPEG 格式

    // 设置 A4 尺寸
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;

    pdf.addImage(imageData, 'JPEG', (pdfWidth - imgWidth) / 2, 0, imgWidth, imgHeight); // 使用压缩后的 JPEG
    pdf.save(fileName);

  };

  return (
    <button
      onClick={() => exportToPDF (props.anchorClassName, props.fileName)}
      className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded shadow-lg hover:bg-blue-600"
    >
      Download PDF
    </button>
  );
};
