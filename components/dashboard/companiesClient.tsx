'use client';
import { useRouter } from 'next/navigation';
import { FileTextOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { use } from 'react'
import NewButton from './newButton';

const { Meta } = Card;

interface Company {
  id: string;
  name: string;
}

interface Props {
  companies: Company[]
}

export default function CompanyList({
  companies,
}: {
  companies: Promise<Company[]>
}) {
  const allCompanies = use(companies)
  const router = useRouter()

  const handleResumeClick = (name: string) => {
    console.log('handleResumeClick', name);
    router.push(`/resume/${name}`);
  };

  const handleCoverLetterClick = (name: string) => {
    console.log('handleCoverLetterClick', name);
    router.push(`/coverLetter/${name}`);
  };

  const handleJsonClick = (name: string) => {
    console.log('handleJsonClick', name);
    router.push(`/setting/${name}`);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div>Luna</div>
        <NewButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {
          allCompanies.length > 0 && allCompanies.map((company) => (
            <Card
              key={company.id}
              style={{ width: 260 }}
              cover={
                <img
                  alt="example"
                  src="/temp.png"
                />
              }
              actions={[
                <FileTextOutlined key="resume" onClick={() => handleResumeClick(company.name)} />,
                <MailOutlined key="coverLetter" onClick={() => handleCoverLetterClick(company.name)} />,
                <SettingOutlined key="setting" onClick={() => handleJsonClick(company.name)} />,
              ]}
            >
              <Meta title={company.name} description="www.instagram.com" />
            </Card>
          ))
        }

      </div>
    </>
  )
}