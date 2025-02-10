'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { Button, Input, message, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCompanyName } from '@/lib/features/company/companySlice';
import SplitWindowResume from '@/components/new/splitWindowResume';
import SplitWindowCL from '@/components/new/splitWindowCL';
import { ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link';

const backButton = <Link href="/" className='mr-4'><ArrowLeftOutlined /></Link>;

type activeKey = 'cv' | 'cl'

export default function Setting({ params, }: { params: Promise<{ company: string }> }) {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch()
  const [activeKey, setActiveKey] = useState<activeKey>('cv')
  const [company, setCompany] = useState<string | null>(null);  // 用 useState 存储 company
  const resume = useAppSelector(state => state.resume)
  const coverLetter = useAppSelector(state => state.coverLetter)
  const router = useRouter();

  const onChange = (key: string) => {
    console.log(key);
    setActiveKey(key as activeKey)
  };

  const onSave = () => { // Setting Page's save means update
    Promise.all([
      axios.post(`/api/setting?company=${company}&action=saveResume`, resume).catch((error) => Promise.reject({ error, source: 'resume' })),

      axios.post(`/api/setting?company=${company}&action=saveCoverLetter`, coverLetter).catch((error) => Promise.reject({ error, source: 'coverLetter' })),

    ])
      .then((responses) => {
        messageApi.info('Update content successfully!');
      })
      .catch(({ error, source }) => {
        console.error(`Error in ${source} request:`, error);
        messageApi.error(`Failed to save content for ${source}`);
      });
  }

  useEffect(() => {
    const fetchCompany = async () => {
      const { company } = await params;
      setCompany(company);  // 获取并保存 company
      dispatch(setCompanyName(company))
    };
    fetchCompany();
  }, [params]);

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (!company) return
  //   const fetchResume = async () => {
  //     axios.get(`/api/resume?company=${company}`).then((response) => {
  //       console.log(response.data);
  //       setResume(JSON.stringify(response.data, null, 2));
  //     });
  //   }
  //   fetchResume()
  // }, [company]);
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (!company) return
  //   const fetchCoverLetter = async () => {
  //     axios.get(`/api/coverLetter?company=${company}`).then((response) => {
  //       console.log(response.data);
  //       setCoverLetter(response.data);
  //     });
  //   }
  //   fetchCoverLetter()
  // }, [company]);

  // const saveResume = async () => {
  //   axios.post(`/api/setting?company=${company}?action=saveResume`, resume).then((response) => {
  //     console.log(response.data);
  //   });
  // }
  // const saveCoverLetter = async () => {
  // axios.post(`/api/setting?company=${company}?action=saveCoverLetter`, coverLetter).then((response) => {
  //   console.log(response.data);
  // });
  // }
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
            left: <div className='ml-4'>{backButton}{company}</div>,
            right: <Button type='primary' className='mr-4' onClick={onSave}>Save</Button>,
          }}
          defaultActiveKey="cv"
          centered
          items={[
            {
              label: 'Resume',
              key: 'cv',
              children: <SplitWindowResume new={false}></SplitWindowResume>
            },
            {
              label: 'Cover Letter',
              key: 'cl',
              children: <SplitWindowCL new={false}></SplitWindowCL>
            }
          ]}
          onChange={onChange}
        />
      </div>
    </>
  );
}
