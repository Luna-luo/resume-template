'use client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DownloadButton } from '@/components/DownloadButton'
import Image from 'next/image'
import SectionHeader from '@/components/resume/SectionHeader';
import SectionContent from '@/components/resume/SectionContent';
import TimeAndLocation from '@/components/resume/TimeAndLocation';


const Resume = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
`

export default function ResumePage () {
  const contactInfo = [
    {
      title: 'Email',
      value: 'luojinxuice@gmail.com',
      logo: () => import('@/assets/icons/email.svg')
    },
    {
      title: 'Phone',
      value: '+447724310483',
      logo: () => import('@/assets/icons/phone.svg')
    },
    {
      title: 'Location',
      value: 'London, United Kingdom',
      logo: () => import('@/assets/icons/location.svg')
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/luojinxu',
      logo: () => import('@/assets/icons/linkedin.svg')
    }
  ];
  const [logos, setLogos] = useState<{ [key: string]: string }> ({});

  useEffect (() => {
    const loadLogos = async () => {
      const loadedLogos: { [key: string]: string } = {};
      for (const info of contactInfo) {
        loadedLogos[info.title] = (await info.logo ()).default;
      }
      setLogos (loadedLogos);
    };
    loadLogos().then() ;
  }, []);
  const introduction = 'Full-stack developer with <b>4 years</b> of experience building scalable web applications using <b>React, Node.js, and TypeScript</b>. Passionate about integrating AI-driven solutions and enhancing user experience through innovative technologies. Proven track record in collaborating with cross-functional teams to develop seamless, high-performance platforms. Experienced in building and optimizing AI-powered tools, such as intelligent chatbots using<b> ChatGPT API</b>, and leveraging cloud technologies for scalable solutions.'

  const workExperience = [
    {
      title: 'Front-End Developer',
      company: 'Linklogis',
      location: 'Shenzhen, China',
      date: '09/2020 - 05/2024',
      description: [
        '<b>Greenfield Development: </b>Designed and implemented a <b>3D NFT</b> platform from scratch using React and Golang , serving over <b>1,000 clients </b> with a<b> 96% </b>satisfaction rate.',
        '<b>Legacy System Modernization :</b> Migrated a legacy system to a <b>Vue 3-based </b> architecture , improving load times by <b>30% </b>and enhancing stability.',
        '<b>AI Integration</b>: Developed an intelligent <b>Q&A chatbot leveraging the ChatGPT API</b>, implemented real-time streaming to enhance user interactions, and scaled the system to support multiple departments, increasing overall productivity.',
        '<b>Leadership :</b> Promoted from Junior to Mid-Level Developer within one year; mentored two junior developers, standardized coding practices, and introduced a <b>Vue template scaffolding</b> tool , reducing project setup time by 50%.',
        '<b>AWS Experience :  </b>Deployed containerized applications using <b>AWS ECS</b> and managed image repositories with <b>AWS ECR</b>, ensuring efficient deployment pipelines.Used AWS<b> S3</b> for basic storage needs, such as handling static assets.',
      ]
    }
  ]
  const education = [
    {
      school: 'Australian National University',
      degree: 'Master of Financial Management',
      date: '07/2018 - 07/2019',
      location: 'Canberra, Australia',
      coursesAndInfo: ['GPA:<b> 5.5/7.0</b>', 'Key Courses: Applied Investments, Data Analysis, Risk Management']
    },
    {
      school: 'Dalian Finance and Economics College',
      degree: 'Bachelor of Finance',
      date: '09/2014 - 07/2018',
      location: 'Dalian, China',
      coursesAndInfo: ['GPA:<b> 3.9/4.5</b>', 'Key Courses: Database basics, Mathematics and Algorithms, Financial Engineering', '<b>National Scholarship</b> (Ranked first in majors)']
    }
  ]
  const skills = [
    {
      title: 'Frontend',
      value: 'React, Vue, TypeScript, Three.js, Jest, Cypress'
    },
    {
      title: 'Backend',
      value: 'Node.js, Next.js, Express, PostgreSQL, RESTful & GraphQL APIs, JWT, Golang'
    },
    {
      title: 'DevOps',
      value: 'AWS (Lambda, ECR, ECS), Docker, CI/CD (GitHub Actions)'
    },
    {
      title: 'AI & Tools:',
      value: 'ChatGPT API, AI chatbot development, real-time streaming'
    }
  ]
  const projects = [
    {
      title: 'Cloud IDE',
      technologies: 'React, TypeScript, Node.js, AWS',
      description: [
        'Worked with a cross-functional team to design and implement scalable full-stack applications using <b>Node.js and React.</b>',
        'Enhanced functionality by integrating <b>preset plugins</b> for intelligent code completion, folding, and debugging.',
        'Automated deployment pipelines on <b>AWS</b> using <b>CI/CD (GitHub Actions) </b>and <b>Docker</b> , enabling seamless scalability.'
      ]
    },
    {
      title: 'Linklogis Robot',
      technologies: 'Node.js, Vue.js, ChatGPT API',
      description: [
        'Developed an intelligent chatbot leveraging <b>ChatGPT\'s API</b> to provide accurate and context-aware responses for internal use.',
        'Implemented <b>real-time streaming</b> output for a seamless user experience during extended interactions.',
        'Enhanced productivity with a widely-used internal tool, supporting multiple departments across the company.'
      ]
    },
    {
      title: 'NFT Platform',
      technologies: 'React, TypeScript, Go, Solidity',
      description: [
        'Designed and implemented a <b>3D NFT</b> platform for the company\'s anniversary, supporting the minting and transfer of digital assets.',
        'Contributed to backend development in <b>Golang</b>, offering robust querying capabilities.',
        'Deployed smart contracts on the blockchain using <b>Solidity</b>, adhering to the ERC-721 standard to securely issue and manage NFTs.'
      ]
    },
  ]
  return (
    <>
    <Resume>
      <div className="resume-content bg-white shadow-lg max-w-4xl">
        <header className="darkblue text-white p-8 pb-2 pt-2">
          <div className="text-5xl font-bold ">Jinxu Luo</div>
          <div className="lightblue text-2xl font-medium mt-2">Full-stack Developer</div>
          <div className="mt-2">
            <p style={{ lineHeight: '1.2' }} dangerouslySetInnerHTML={{ __html: introduction }}></p>
          </div>
        </header>

        <div className="contact-info">
          <div className="info">
            {contactInfo.map((info) => {
              return (
                <div className="info-block" key={info.title}>
                  {logos[info.title] &&
                    <Image src={logos[info.title]} height={20} width={20} alt={info.title}/>
                  }
                  <div className="cc" style={{ lineHeight: '1', verticalAlign: 'middle' }}
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
              {workExperience.map((work) => {
                return (
                  <SectionContent key={work.title}>
                    <div key={work.title}>
                      <div className="content-title">{work.title}</div>
                      <div className="company">{work.company}</div>
                      <TimeAndLocation date={work.date} location={work.location}/>
                      <div className="label">Achievements/Tasks</div>
                      <ul className="custom-list text-gray-700 leading-snug">
                        {work.description.map((desc) => (
                          <li className="description" key={desc}
                              dangerouslySetInnerHTML={{ __html: '<div>' + desc + '</div>'}}></li>
                        ))}
                      </ul>
                    </div>
                  </SectionContent>
                );
              })}
            </div>
            <div className="module education ">
              <SectionHeader title={'EDUCATION'}/>
              {education.map((edu) => {
                return (
                  <SectionContent key={edu.school}>
                    <div key={edu.school}>
                      <div className="content-title">{edu.school}</div>
                      <div className="degree">{edu.degree}</div>
                      <TimeAndLocation date={edu.date} location={edu.location}/>
                      <ul className="custom-list text-gray-700 leading-snug">
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
          <div className="pr-3">
            <div className="module skills">
              <SectionHeader title={'SKILLS'}/>
              {skills.map((skill) => {
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
              {projects.map((project) => {
                return (
                  <SectionContent key={project.title}>
                    <div key={project.title}>
                      <div className="light-title">{project.title}</div>
                      <div className="technologies text-gray-700">
                        <div className="keyt">Technologies: </div>
                        <div dangerouslySetInnerHTML={{ __html: '<b>' + project.technologies + '</b>' }}/>
                      </div>
                      {/*<p className="label">Description of Achievement</p>*/}
                      <ul className="custom-list text-gray-700  leading-snug text-sm">
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
  )
}
