'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DownloadButton } from '@/components/DownloadButton';
import Image from 'next/image';
import SectionHeader from '@/components/resume/SectionHeader';
import SectionContent from '@/components/resume/SectionContent';
import TimeAndLocation from '@/components/resume/TimeAndLocation';
import axios from 'axios';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: #EFF2F5;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const CenterBox = styled.div`
    width: 1031px;
    height: 1458px;
    background: white;
`;

interface ContactInfo {
  title: string;
  value: string;
  logo: string;
}

interface workExperience {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
}

interface edu {
  school: string;
  degree: string;
  date: string;
  location: string;
  coursesAndInfo: string[];
}

interface skill {
  title: string;
  value: string;
}

interface project {
  title: string;
  technologies: string;
  description: string[];
}

interface ResumeData {
  jobTitle: string | null;
  contactInfo: ContactInfo[];
  introduction: string;
  workExperience: workExperience[];
  education: edu[];
  skills: skill[];
  projects: project[];
}

export default function ResumePage({ params, }: { params: Promise<{ company: string }> }) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const company = (await params).company;
      axios.get(`/api/resume?company=${company}`).then((res) => {
        console.log('res.data', res.data);
        setResumeData(res.data);
      });
    };
    fetchData().then();
  }, [params]);

  if (!resumeData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Wrapper>
        <CenterBox>
          <div className="resume-content bg-white shadow-lg">
            <header className="darkblue p-11 pb-6 pt-9">
              <div className="text-5xl font-bold ">Jinxu Luo</div>
              <div className="lightblue text-2xl font-medium mt-2">{resumeData.jobTitle ? resumeData.jobTitle : "Full-stack Developer (Full Work Authorization)"}</div>
              <div className="mt-2 text-lg">
                <p style={{ lineHeight: '1.3' }} dangerouslySetInnerHTML={{ __html: resumeData.introduction }}></p>
              </div>
            </header>

            <div className="contact-info">
              <div className="info">
                {resumeData.contactInfo.map((info) => {
                  return (
                    <div className="info-block" key={info.title}>
                      {info.logo &&
                        <Image src={info.logo} height={20} width={20} alt={info.title} />
                      }
                      <div className="cc" style={{ verticalAlign: 'middle' }}
                        key={info.title}>{info.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="module-wrapper">
              <div className="module-item">
                <div className="module work mb-2">
                  <SectionHeader title={'WORK EXPERIENCE'} />
                  {resumeData.workExperience.map((work) => {
                    return (
                      <SectionContent key={work.title}>
                        <div key={work.title}>
                          <div className="content-title">{work.title}</div>
                          <div className="company">{work.company}</div>
                          <TimeAndLocation date={work.date} location={work.location} />
                          <div className="label">Achievements/Tasks</div>
                          <ul className="custom-list  leading-snug">
                            {work.description.map((desc) => (
                              <li className="description" key={desc}
                                dangerouslySetInnerHTML={{ __html: '<div>' + desc + '</div>' }}></li>
                            ))}
                          </ul>
                        </div>
                      </SectionContent>
                    );
                  })}
                </div>
                <div className="module education ">
                  <SectionHeader title={'EDUCATION'} />
                  {resumeData.education.map((edu) => {
                    return (
                      <SectionContent key={edu.school}>
                        <div className="mb-2" key={edu.school}>
                          <div className="content-title">{edu.school}</div>
                          <div className="degree">{edu.degree}</div>
                          <TimeAndLocation date={edu.date} location={edu.location} />
                          <ul className="custom-list  leading-snug">
                            {edu.coursesAndInfo.length > 0 && edu.coursesAndInfo.map((info) => (
                              <li className="courses" key={info}
                                dangerouslySetInnerHTML={{ __html: '<div>' + info + '</div>' }}></li>
                            ))
                            }
                          </ul>
                        </div>
                      </SectionContent>
                    );
                  })}
                </div>
              </div>
              <div className="module-item pr-6">
                <div className="module skills mb-4">
                  <SectionHeader title={'SKILLS'} />
                  {resumeData.skills.map((skill) => {
                    return (
                      <SectionContent key={skill.title}>
                        <div className="skills-block" key={skill.title}>
                          <div className="skills-light-title">{skill.title}</div>
                          <div className="value">{skill.value}</div>
                        </div>
                      </SectionContent>
                    );
                  })}
                </div>
                <div className="pb-2 projects">
                  <SectionHeader title={'PROJECTS'} />
                  {resumeData.projects.map((project) => {
                    return (
                      <SectionContent key={project.title}>
                        <div className="mb-2" key={project.title}>
                          <div className="light-title-smaller">{project.title}</div>
                          <div className="technologies text-gray-700">
                            <div className="keyt-smaller">Technologies:</div>
                            <div dangerouslySetInnerHTML={{ __html: '<b>' + project.technologies + '</b>' }} />
                          </div>
                          {/*<p className="label">Description of Achievement</p>*/}
                          <ul className="custom-list  leading-snug small-text">
                            {project.description.map((desc) => (
                              <li key={desc} dangerouslySetInnerHTML={{ __html: '<div>' + desc + '</div>' }}></li>
                            ))}
                          </ul>
                        </div>
                      </SectionContent>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <DownloadButton anchorClassName=".resume-content" fileName="Resume-A4.pdf" />
        </CenterBox>
      </Wrapper>
      <style jsx>{`
          .resume-content {
              height: 100%;
              color: white;
          }
  
          .darkblue {
              background-color: #313C4D
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

      


          .module-wrapper {
              display: flex;
              flex-direction: row;
          }
              .module-item {
               flex: 1;
              }

          .content-title {
              font-size: 22px;
              font-weight: bold;
              padding-top: 0;
              margin-top: 0;
              color: #000;
            //  min-height: 24px;
          }

          .company {
              color: #000;
              font-size: 22px;
          }
              .degree {
              color: #000;
                font-size: 20px;
              }

          .label {
              color: #449399;
              font-size: 16px;
          }

          .light-title {
              //padding-top: 2px;
              color: #000;
              font-size: 20px;
              font-weight: 600;
          }
          .light-title-smaller {
          color: #000;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 3px;
          }

          .skills-light-title {
              padding-top: 8px;
              font-size: 18px;
              color: #000;
              font-weight: 600;
          }

          .technologies {
              margin-bottom: 1px;
              display: flex;
              flex-wrap: nowrap;
              color: #000;
              font-size: 16px;
          }

          .keyt {
              color: #449399;
              font-size: 16px;
              padding-right: 8px;
          }
          .keyt-smaller {
              color: #449399;
              font-size: 16px;
              padding-right: 8px;
          }

          .description {
              font-size: 16px;
              white-space: pre-wrap;
          }

          .education {
              margin-top: -4px;
              font-size: 16px;
          }

          .value {
              color: #000;
              font-size: 16px;
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
          }
          .small-text {
              font-size: 16px;
              color: #000;
          }
      `}</style>
    </>
  );
}
