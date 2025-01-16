'use client';
import React, {useEffect} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {DownloadButton} from '@/components/DownloadButton';
import Image from 'next/image';

const CoverLetter = () => {
  const cvContactInfo = [
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
  const [logos, setLogos] = React.useState<{ [key: string]: string }> ({});
  useEffect (() => {
    const loadLogos = async () => {
      const loadedLogos: { [key: string]: string } = {};
      for (const info of cvContactInfo) {
        loadedLogos[info.title] = (await info.logo ()).default;
      }
      setLogos (loadedLogos);
    };
    loadLogos ();
  }, []);
  // Variables for dynamic content
  const applicant = {
    name: 'Jinxu Luo',
    title: 'Full-Stack Developer',
    email: 'luojinxuice@gmail.com',
    phone: '07724310483',
    location: 'London',
  };

  const recipient = {
    name: 'Hiring Manager',
    company: 'Contentful',
    date: '14 January, 2025',
  };

  const introduction = `I am writing to express my interest in the FullStack Engineer - AI Platforms position at Contentful. With four years of experience in full-stack development and a proven track record of integrating AI-powered tools into scalable applications, I am excited about the opportunity to contribute to your mission of empowering teams with innovative AI solutions.`;

  const projects = [
    {
      title: 'Chatbot Development:',
      description: 'Built an internal Q&A chatbot using ChatGPT API, implementing real-time streaming for seamless interactions and improving team productivity.',
    },
    {
      title: '3D NFT Platform: ',
      description:
        'Designed and deployed a platform with React and Golang, serving over 1,000 clients with a 96% satisfaction rate.',
    },
    {
      title: 'Cloud Deployments: ',
      description:
        'Deployed containerized applications with AWS ECS and managed image repositories via ECR, streamlining CI/CD pipelines.',
    },
  ];

  const skills = `My technical skill set—including React, Node.js, PostgreSQL, and AWS—aligns closely with ${recipient.company}’s
    requirements. Beyond my technical abilities, I have a strong track record of collaborating with
    cross-functional teams, mentoring junior developers, and maintaining high standards of code quality in
    regulated environments.`;

  const missionStatement = `Contentful’s mission to empower teams through innovative AI solutions aligns with my passion for building tools that drive efficiency. I look forward to contributing my skills in TypeScript, React, and Node.js to enhance your AI platform and support cross-functional innovation.`;

  const closing = `Thank you for considering my application. I would welcome the opportunity to discuss how I can contribute to your team.`;

  return (
    <>
      <div className="bg-gray-100 flex justify-center py-1 px-5">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-10 py-3 letter-content">
          {/* Header */}
          <header>
            <h1 className="text-5xl text-gray-900 pl-3">{applicant.name}</h1>
            <h2 className="text-2xl font-medium text-teal-600 mt-2 pl-3 mb-8">{applicant.title}</h2>
            <div className="contact-info rounded-lg p-3 flex justify-center items-center gap-4 mt-4 text-gray-600">
              {
                cvContactInfo.map ((info, index) => (
                  <div key={index} className="info-block-cl flex items-center gap-2">
                    <Image src={logos[info.title]} alt={info.title} width={20} height={20}/>
                    <p className="cc" style={{fontSize: '14px'}}>{info.value}</p>
                  </div>
                ))
              }
            </div>
          </header>

          {/* Recipient Info */}
          <div className="mt-8 text-gray-800 pl-3">
            <p>To</p>
            <p className="font-bold">{recipient.name}</p>
            <p>{recipient.company}</p>
            <p className="mt-2 text-gray-600">{recipient.date}</p>
          </div>

          {/* Divider */}
          <div className="h-1 bg-teal-500 w-full my-6"></div>

          {/* Body */}
          <div className="text-gray-800 leading-relaxed pl-3">
            <p className="mb-6">Dear {recipient.name},</p>

            <p className="mb-6 pl-3">{introduction}</p>

            <p className="mb-6 pl-3">At Linklogis, I contributed to impactful projects, including:</p>
            <ul className="custom-list mb-6 space-y-2 pl-3">
              {projects.map ((project, index) => (
                <li key={index}>
                  {project.title + ',' + project.description}
                </li>
              ))}
            </ul>

            {/*<p className="mb-6 pl-3">{skills}</p>*/}

            <p className="mb-6 pl-3">{missionStatement}</p>

            <p className="mb-6 pl-3">{closing}</p>
          </div>

          {/* Divider */}
          <div className="h-1 bg-teal-500 w-full my-6"></div>

          {/* Signature */}
          <div className="text-gray-800 pl-3">
            <p>Sincerely,</p>
            <p className="mt-4">{applicant.name}</p>
          </div>
        </div>
        <DownloadButton anchorClassName=".letter-content" fileName="CoverLetter.pdf"/>
      </div>
      <style jsx>{`
          .contact-info {
              background-color: #222A33;
              color: #FFFFFF;
              padding-left: 20px;
              padding-right: 20px;
          }

          .info-block-cl {
              display: contents;
              gap: 2px; /* 增加图标与文字之间的间距 */
              margin-right: 4px;
          }

          .cc {
              vertical-align: middle; /* 确保文字与图标中线对齐 */
          }
      `}</style>
    </>
  );
};

export default CoverLetter;
