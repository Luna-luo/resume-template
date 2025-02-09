'use client';
import React, { useEffect, useState } from 'react';
import { DownloadButton } from '@/components/DownloadButton';
import Image from 'next/image';
import axios from 'axios';
import { Wrapper } from '@/app/resume/[company]/page';
import { CenterBox } from '@/app/resume/[company]/page';

interface CoverLetterContent {
  clContentInfo: { title: string, value: string, logo: string }[];
  introduction: string;
  applicant: { name: string, title: string, email: string, phone: string, location: string };
  recipient: { name: string, company: string, date: string };
  projects: { title: string, description: string }[];
  skills: string;
  missionStatement: string;
  closing: string;
}

export default function CoverLetter({ params, }: {
  params: Promise<{ company: string }>
}) {
  const [clContent, setClContent] = useState<CoverLetterContent | null>(null);
  const [company, setCompany] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      const { company } = await params;
      setCompany(company);  // 获取并保存 company
    };
    fetchCompany();
  }, [params]);

  useEffect(() => {
    if (!company) return
    const fetchCoverLetter = async () => {
      axios.get(`/api/coverLetter?company=${company}`).then((res) => {
        console.log(res.data);
        setClContent(res.data);
      })
    }
    fetchCoverLetter().then();
  }, [params]);
  if (!clContent) return (<div>Loading...</div>);
  return (
    <>
      <Wrapper>
        <CenterBox>
          <div className="bg-gray-100 flex justify-center py-1 px-5">
            <div className="bg-white shadow-lg rounded-lg w-full p-10 py-3 letter-content">
              {/* Header */}
              <header>
                <h1 className="text-5xl text-gray-900 pl-3">{clContent.applicant.name}</h1>
                <h2 className="lightblue text-2xl font-medium text-teal-600 mt-2 pl-3 mb-8">{clContent.applicant.title}</h2>
                <div className="contact-info rounded-lg p-3 flex justify-center items-center gap-4 mt-4 text-gray-600">
                  {
                    clContent.clContentInfo.map((info, index) => (
                      <div key={index} className="info-block-cl flex items-center gap-2">
                        <Image src={info.logo} alt={info.title} width={20} height={20} />
                        <p className="cc" style={{ fontSize: '14px' }}>{info.value}</p>
                      </div>
                    ))
                  }
                </div>
              </header>

              {/* Recipient Info */}
              <div className="mt-8 text-gray-800 pl-3">
                <p>To</p>
                <p className="font-bold">{clContent.recipient.name}</p>
                <p>{clContent.recipient.company}</p>
                <p className="mt-2 text-gray-600">{clContent.recipient.date}</p>
              </div>

              {/* Divider */}
              <div className="line my-6"></div>

              {/* Body */}
              <div className="text-gray-800 leading-relaxed pl-3">
                <p className="mb-6">Dear {clContent.recipient.name},</p>

                <p className="mb-6 pl-3">{clContent.introduction}</p>

                <p className="mb-6 pl-3">At Linklogis, I contributed to impactful projects, including:</p>
                <ul className="custom-list mb-6 space-y-2 pl-3">
                  {clContent.projects.map((project, index) => (
                    <li key={index}>
                      {project.title + ': ' + project.description}
                    </li>
                  ))}
                </ul>

                {clContent.skills && <p className="mb-6 pl-3">{clContent.skills}</p>}

                <p className="mb-6 pl-3">{clContent.missionStatement}</p>

                <p className="mb-6 pl-3">{clContent.closing}</p>
              </div>

              {/* Divider */}
              <div className="line my-6"></div>

              {/* Signature */}
              <div className="text-gray-800 pl-3">
                <p>Sincerely,</p>
                <p className="mt-4">{clContent.applicant.name}</p>
              </div>
            </div>
            <DownloadButton anchorClassName=".letter-content" fileName={"CoverLetter-" + company} />
          </div>
        </CenterBox>
      </Wrapper>
      <style jsx>{`
      .line {
      display: block;
       background-color: #14B8A6;
       height: 4px;
       width: 100%;
      }
       .lightblue {
              color: #449399
          }
         .contact-info {
              background-color: #222A33;
              color: #FFFFFF;
              padding-left: 50px;
              padding-right: 50px;
              padding-top: 18px;
              padding-bottom: 14px;
              margin-bottom: 10px;
              display:flex;
              justify-content: space-around;
          }

          .info {
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: space-between;
          }

          .info-block {
              font-size: 16px;
              font-weight: 400;
              display: flex;
              flex-direction: row;
              gap: 4px; /* 增加图标与文字之间的间距 */
              margin-right: 8px;
          }

          .cc {
              vertical-align: middle; /* 确保文字与图标中线对齐 */
              margin-left: 4px;
          }
          ul.custom-list {
              color: #000;
              list-style-type: none; /* 禁用默认圆点 */
              padding-left: 0; /* 去除内边距 */
              margin-top: 1px; /* 去除外边距 */
              margin-bottom: 1px;
          }

          ul.custom-list li {
              display: flex; /* 使用 flex 布局让图标与文本对齐 */
              align-items: flex-start; /* 对齐到顶部 */
              gap: 0.6rem; /* 图标和文本间距 */
              margin-bottom: 4px;
          }

          ul.custom-list li::before {
              content: '•'; /* 使用自定义圆点 */
              color: #449399; /* 设置颜色 */
              font-size: 1.3rem; /* 设置大小 */
              line-height: 1.2; /* 修正与文本的对齐 */
              margin-right: 4px;
          }
      `}</style>
    </>
  );
};
