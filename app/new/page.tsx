'use client'
import { Form, Input, Button } from 'antd';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function NewPage() {
  const [form] = Form.useForm();
  const [company, setCompany] = useState('');
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const router = useRouter ();

  useEffect (() => {
      axios.get ('/api/defaultProfile').then ((res) => {
        console.log ('res data : ', res.data);
        setResume (JSON.stringify( res.data.resume, null, 2));
        setCoverLetter (JSON.stringify( res.data.coverLetter, null, 2));

      }).catch((error) => {
        console.error('Error fetching default profile:', error);
      })
  }, []);

  useEffect(() => {
    // 手动设置表单值
    form.setFieldsValue({
      company: company || '',
      resume: resume || '',
      coverLetter: coverLetter || '',
    });
  }, [resume, coverLetter]);

  const handleSave = () => {
    const newProfile = {
      company,
      resume,
      coverLetter,
    };
    console.log('Saving new company profile:', newProfile);
    // 这里可以添加保存逻辑，比如通过 API 发送到后端
    axios.post(`/api/resume?company=${company}`, resume).then((res) => {
      console.log(res.data);
      console.log('Resume saved');
    });
    axios.post(`/api/coverLetter?company=${company}`, coverLetter).then((res) => {
      console.log(res.data);
      console.log('Cover letter saved');
    });
    axios.post('/api/dashboard?action=createCompany', {company}).then((res) => {
      console.log(res.data);
      console.log('Company added');
      router.push('/');
    })
  };

  return (
    <>
      <div className="flex items-center flex-col bg-white min-h-screen  text-gray-700 p-3 py-8">
        <div className="w">
          <h1 className="text-2xl font-bold mb-4">Create a New Company Profile</h1>
        </div>
        <div className="bg-white p-5 rounded-lg w-full h-full max-w-screen-2xl">
          <Form
            form={form} // 绑定 form 实例
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'default' }}
            onFinish={handleSave}
          >
            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: 'Please enter the company name' }]}
            >
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
              />
            </Form.Item>

            <Form.Item
              label="Resume"
              name="resume"
              style={{width: '100%'}}
              rules={[{ required: true, message: 'Please enter the resume content' }]}
            >
              <Input.TextArea
                rows={30}
                style={{width: '100%'}}
                value={resume || ''}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Enter resume content"
              />
            </Form.Item>

            <Form.Item
              label="Cover Letter"
              name="coverLetter"
              rules={[{ required: true, message: 'Please enter the cover letter content' }]}
            >
              <Input.TextArea
                rows={30}
                value={coverLetter || ''}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Enter cover letter content"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button type="default" className="ml-4" onClick={()=> router.push('/')}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <style jsx>{`
      .ant-col-14 {
          max-width: 100% !important;
      }
      `}</style>
    </>
  );
}
