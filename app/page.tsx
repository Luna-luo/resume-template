'use client';
import { FileTextOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Meta } = Card;

interface Company {
  id: string;
  name: string;
}

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/dashboard?action=getCompanies').then((res) => {
      console.log('companies: ', res.data);
      setCompanies(res.data);
    });
  }, []);

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

  const handleNewClick = () => {
    console.log('handleNewClick');
    router.push('/new');
  }

  if (companies.length === 0) return <div>Loading...</div>;
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-4/5 min-h-screen">
        <div className="flex justify-between items-center">
          <div>Luna</div>
          <Button className="my-4" onClick={() => handleNewClick()}>New</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {
            companies.length > 0 && companies.map((company) => (
              <Card
                key={company.id}
                style={{ width: 260 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
      </div>
    </div>

  );
}
