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

    const canvas = await html2canvas (contentElement as HTMLElement, {scale: 2}); // 提高分辨率
    const imageData = canvas.toDataURL ('image/png');

    // 设置 A4 尺寸
    const pdf = new jsPDF ('portrait', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth ();
    const pdfHeight = pdf.internal.pageSize.getHeight ();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 根据内容的宽高比缩放
    const aspectRatio = canvasWidth / canvasHeight;
    const imageHeight = pdfWidth / aspectRatio;

    //若是cover-letter，只打印一页
    if (anchorClassName.includes ('letter')) {
      const ratio = Math.min (pdfWidth / canvasWidth, pdfHeight / canvasHeight);

      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;

      pdf.addImage (imageData, 'PNG', (pdfWidth - imgWidth) / 2, 0, imgWidth, imgHeight);
      pdf.save ('CoverLetter.pdf');
    } else {
      // 如果内容高度超出一页，则分多页处理
      let yPosition = 0;
      while (yPosition < canvasHeight) {
        const remainingHeight = canvasHeight - yPosition;
        const pageHeight = Math.min (imageHeight, remainingHeight * (pdfWidth / canvasWidth));

        pdf.addImage (imageData, 'PNG', 0, 0, pdfWidth, pageHeight, undefined, 'FAST');
        yPosition += pageHeight * (canvasWidth / pdfWidth);

        if (yPosition < canvasHeight) {
          pdf.addPage ();
        }
      }

      pdf.save (fileName); // 保存 PDF
    }

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
