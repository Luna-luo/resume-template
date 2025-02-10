'use client'
import { useAppSelector } from '@/lib/hooks';
import { Input, Tabs, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import NewProfile from '@/components/new/newProfileCV';
import Link from 'next/link';
import SplitWindowResume from '@/components/new/splitWindowResume';
import { DownloadButton } from '@/components/DownloadButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SplitWindowCL from '@/components/new/splitWindowCL';

const backButton = <Link href="/" className='mr-4'><ArrowLeftOutlined /></Link>;

type activeKey = 'cv' | 'cl'

export default function NewPage() {
  // const [editCompany, setEditCompany] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState<activeKey>('cv')
  const companyName = useAppSelector(state => state.company.value)
  const resume = useAppSelector(state => state.resume)
  const coverLetter = useAppSelector(state => state.coverLetter)
  const router = useRouter()

  const onChange = (key: string) => {
    console.log(key);
    setActiveKey(key as activeKey)
  };

  const onSave = () => {
    Promise.all([
      axios.post(`/api/resume?company=${companyName}`, resume)
        .catch((error) => Promise.reject({ error, source: 'resume' })),

      axios.post(`/api/coverLetter?company=${companyName}`, coverLetter)
        .catch((error) => Promise.reject({ error, source: 'coverLetter' })),

      axios.post('/api/dashboard?action=createCompany', { company: companyName })
        .catch((error) => Promise.reject({ error, source: 'createCompany' }))
    ])
      .then((responses) => {
        messageApi.info('Save content successfully!');
      })
      .catch(({ error, source }) => {
        console.error(`Error in ${source} request:`, error);
        messageApi.error(`Failed to save content for ${source}`);
      });
  }

  return (
    <>
      {contextHolder}
      <div className='header'>
        {/* <div className='company-title'>
          {editCompany ? <Input value={companyName} /> : <div>{companyName}</div>
          }
          <EditOutlined />
        </div> */}
        <Tabs
          tabBarExtraContent={{
            left: <div className='ml-4'>{backButton}{companyName}</div>,
            right: <Button type='primary' className='mr-4' onClick={onSave}>Save</Button>,
          }}
          defaultActiveKey="cv"
          centered
          items={[
            {
              label: 'Resume',
              key: 'cv',
              children: <SplitWindowResume new={true}></SplitWindowResume>
            },
            {
              label: 'Cover Letter',
              key: 'cl',
              children: <SplitWindowCL new={true}></SplitWindowCL>
            }
          ]}
          onChange={onChange}
        />
      </div>
    </>
  );
}
