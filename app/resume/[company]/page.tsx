'use client';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DownloadButton} from '@/components/DownloadButton';
import Image from 'next/image';
import SectionHeader from '@/components/resume/SectionHeader';
import SectionContent from '@/components/resume/SectionContent';
import TimeAndLocation from '@/components/resume/TimeAndLocation';
import axios from 'axios';


const Resume = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
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
  contactInfo: ContactInfo[];
  introduction: string;
  workExperience: workExperience[];
  education: edu[];
  skills: skill[];
  projects: project[];
}

export default function ResumePage({params,}: { params: Promise<{ company: string }> }) {
  const [resumeData, setResumeData] = useState<ResumeData | null> (null);


  useEffect (() => {
    const fetchData = async () => {
      const company = (await params).company;
      axios.get (`/api/resume/${company}`).then ((res) => {
        console.log ('res.data', res.data);
        setResumeData (res.data);
      });
    };
    fetchData ().then ();
  }, [params]);

  if (!resumeData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Resume>
        <div className="resume-content bg-white shadow-lg max-w-4xl">
          <header className="darkblue text-white p-8 pb-2 pt-2">
            <div className="text-5xl font-bold ">Jinxu Luo</div>
            <div className="lightblue text-2xl font-medium mt-2">Full-stack Developer (Full Work Authorization)</div>
            <div className="mt-2">
              <p style={{lineHeight: '1.2'}} dangerouslySetInnerHTML={{__html: resumeData.introduction}}></p>
            </div>
          </header>

          <div className="contact-info">
            <div className="info">
              {resumeData.contactInfo.map ((info) => {
                return (
                  <div className="info-block" key={info.title}>
                    {info.logo &&
                      <Image src={info.logo} height={20} width={20} alt={info.title}/>
                    }
                    <div className="cc" style={{lineHeight: '1', verticalAlign: 'middle'}}
                         key={info.title}>{info.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="module-wrapper">
            <div>
              <div className="module work">
                <SectionHeader title={'WORK EXPERIENCE'}/>
                {resumeData.workExperience.map ((work) => {
                  return (
                    <SectionContent key={work.title}>
                      <div key={work.title}>
                        <div className="content-title">{work.title}</div>
                        <div className="company">{work.company}</div>
                        <TimeAndLocation date={work.date} location={work.location}/>
                        <div className="label">Achievements/Tasks</div>
                        <ul className="custom-list text-gray-700 leading-snug">
                          {work.description.map ((desc) => (
                            <li className="description" key={desc}
                                dangerouslySetInnerHTML={{__html: '<div>' + desc + '</div>'}}></li>
                          ))}
                        </ul>
                      </div>
                    </SectionContent>
                  );
                })}
              </div>
              <div className="module education ">
                <SectionHeader title={'EDUCATION'}/>
                {resumeData.education.map ((edu) => {
                  return (
                    <SectionContent key={edu.school}>
                      <div key={edu.school}>
                        <div className="content-title">{edu.school}</div>
                        <div className="degree">{edu.degree}</div>
                        <TimeAndLocation date={edu.date} location={edu.location}/>
                        <ul className="custom-list text-gray-700 leading-snug">
                          {edu.coursesAndInfo.length > 0 && edu.coursesAndInfo.map ((info) => (
                            <li className="courses" key={info}
                                dangerouslySetInnerHTML={{__html: '<div>' + info + '</div>'}}></li>
                          ))
                          }
                        </ul>
                      </div>
                    </SectionContent>
                  );
                })}
              </div>
              {/*<div>*/}
              {/*  <SectionHeader title={'Work Authorization'}/>*/}
              {/*  <SectionContent>*/}
              {/*    <div className="font-bold mb-1">Eligible to work in the UK with a valid visa/work permit for 2 years.</div>*/}
              {/*  </SectionContent>*/}
              {/*</div>*/}
            </div>
            <div className="pr-3">
              <div className="module skills">
                <SectionHeader title={'SKILLS'}/>
                {resumeData.skills.map ((skill) => {
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
                <SectionHeader title={'PROJECTS'}/>
                {resumeData.projects.map ((project) => {
                  return (
                    <SectionContent key={project.title}>
                      <div key={project.title}>
                        <div className="light-title">{project.title}</div>
                        <div className="technologies text-gray-700">
                          <div className="keyt">Technologies:</div>
                          <div dangerouslySetInnerHTML={{__html: '<b>' + project.technologies + '</b>'}}/>
                        </div>
                        {/*<p className="label">Description of Achievement</p>*/}
                        <ul className="custom-list text-gray-700  leading-snug text-sm">
                          {project.description.map ((desc) => (
                            <li key={desc} dangerouslySetInnerHTML={{__html: '<div>' + desc + '</div>'}}></li>
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
        <DownloadButton anchorClassName=".resume-content" fileName="Resume-A4.pdf"/>
      </Resume>
      <style jsx>{`
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
          }

          .info {
              display: flex;
              width: 100%;
              padding: 4px 0;
              align-items: center;
              justify-content: space-between;
          }

          .info-block {
              display: contents;
              gap: 4px; /* 增加图标与文字之间的间距 */
              margin-right: 8px;
          }

          .cc {
              padding-bottom: 18px;
              vertical-align: middle; /* 确保文字与图标中线对齐 */
          }

          .info-block .cc {
              line-height: 1; /* 确保行高与图标高度一致 */
          }


          .module-wrapper {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0;
              grid-auto-rows: auto;
              padding: 0;
          }

          .content-title {
              font-size: 20px;
              font-weight: bold;
              padding-top: 0;
              margin-top: 0;
          }

          .company, .degree {
              color: #000;
              font-size: 18px;
          }

          .label {
              color: #449399;
              font-size: 14px;
          }

          .light-title {
              //padding-top: 2px;
              font-size: 20px;
              font-weight: 600;
          }

          .skills-light-title {
              padding-top: 4px;
              font-size: 18px;
              font-weight: 600;
          }

          .technologies {
              display: flex;
              flex-wrap: nowrap;
          }

          .keyt {
              color: #449399;
              font-size: 16px;
              padding-right: 8px;
          }

          .description {
              font-size: 14px;
              white-space: pre-wrap;
          }

          .education {
              margin-top: -4px;
              font-size: 14px;
          }

          .value {
              font-size: 14px;
          }

          ul.custom-list {
              list-style-type: none; /* 禁用默认圆点 */
              padding-left: 0; /* 去除内边距 */
              margin-top: 1px; /* 去除外边距 */
              margin-bottom: 1px;
          }

          ul.custom-list li {
              display: flex; /* 使用 flex 布局让图标与文本对齐 */
              align-items: flex-start; /* 对齐到顶部 */
              gap: 0.6rem; /* 图标和文本间距 */
              margin-bottom: 2px;
          }

          ul.custom-list li::before {
              content: '•'; /* 使用自定义圆点 */
              color: #449399; /* 设置颜色 */
              font-size: 2rem; /* 设置大小 */
              line-height: 0.2; /* 修正与文本的对齐 */
          }
      `}</style>
    </>
  );
}
