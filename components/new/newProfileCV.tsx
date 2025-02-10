'use client'
import { Form, Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setResumeContent } from '@/lib/features/resume/resumeSlice';
import { ResumeData } from '@/types';
import Editor from '@monaco-editor/react';

interface NewProfileCVProps {
  new: Boolean
}

export default function NewProfileCV(Props: NewProfileCVProps) {
  const dispatch = useAppDispatch()
  const company = useAppSelector(state => state.company.value)
  const initialState: ResumeData = {
    jobTitle: null,
    contactInfo: [],
    introduction: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
  };
  const [resume, setResume] = useState(JSON.stringify(initialState));

  useEffect(() => {
    if (Props.new) {
      axios.get('/api/defaultProfile').then((res) => {
        console.log('res data aa: ', res.data);
        const resumeGet = res.data.resume as ResumeData;
        setResume(JSON.stringify(resumeGet, null, '\t'));
        dispatch(setResumeContent(resumeGet));
      }).catch((error) => {
        console.error('Error fetching default profile:', error);
      })
    } else {
      if (!company) return
      axios.get(`/api/resume?company=${company}`).then((response) => {
        console.log('exist data', response.data)
        setResume(JSON.stringify(response.data, null, '\t'));
        dispatch(setResumeContent(response.data));
      });
    }
  }, [company]);

  function handleEditorChange(value: string | undefined) {
    // console.log('here is the current model value:', value);
    const updatedValue = value || '';
    setResume(updatedValue);

    try {
      const parsedValue = JSON.parse(updatedValue);
      dispatch(setResumeContent(parsedValue));
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }
  }

  return (
    <>
      <div className="flex items-center flex-col bg-white min-h-screen  text-gray-700 ">
        <div className="bg-white pr-5 pt-0 rounded-lg w-full h-full max-w-screen-2xl">
          <Editor
            height="1100px"
            defaultLanguage="json"
            value={resume}
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
