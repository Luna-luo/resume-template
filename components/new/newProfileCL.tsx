'use client'
import { Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CoverLetterContent } from '@/types';
import { setClContent } from '@/lib/features/coverLetter/coverLetterSlice';
import { Editor } from '@monaco-editor/react';
// import { useAppSelector } from '@/lib/hooks';

interface NewPropCLProps {
  new: Boolean
}


export default function NewProfileCL(Props: NewPropCLProps) {
  const company = useAppSelector(state => state.company.value)
  const dispatch = useAppDispatch()
  const initialState: CoverLetterContent = {
    clContentInfo: [],
    introduction: '',
    applicant: { name: '', title: '', email: '', phone: '', location: '' },
    recipient: { name: '', company: '', date: '' },
    projects: [{ title: '', description: '' }],
    skills: '',
    missionStatement: '',
    closing: ''
  };
  // const companyName = useAppSelector(state => state.company.value)
  const [coverLetter, setCoverLetter] = useState(JSON.stringify(initialState));

  useEffect(() => {
    if (Props.new) {
      axios.get('/api/defaultProfile').then((res) => {
        const clGet = res.data.coverLetter as CoverLetterContent
        setCoverLetter(JSON.stringify(clGet, null, '\t'));
        dispatch(setClContent(clGet))

      }).catch((error) => {
        console.error('Error fetching default profile:', error);
      })
    } else {
      axios.get(`/api/coverLetter?company=${company}`).then((response) => {
        console.log(response.data);
        setCoverLetter(JSON.stringify(response.data, null, '\t'));
        dispatch(setClContent(response.data))
      });
    }
  }, [company]);

  function handleEditorChange(value: string | undefined) {
    // console.log('here is the current model value:', value);
    const updatedValue = value || '';
    setCoverLetter(updatedValue);

    try {
      const parsedValue = JSON.parse(updatedValue);
      dispatch(setClContent(parsedValue));
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }
  }

  return (
    <>
      <div className="flex items-center flex-col bg-white min-h-screen  text-gray-700 ">
        <div className="bg-white p-5 pt-0 rounded-lg w-full h-full max-w-screen-2xl">

          <Editor
            height="1100px"
            defaultLanguage="json"
            value={coverLetter}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              formatOnType: true,
              formatOnPaste: true,
              lineNumbers: "off"
            }}
          />

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
