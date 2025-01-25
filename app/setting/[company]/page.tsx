'use client';
import {useEffect, useState} from 'react';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import {Button, Input} from 'antd';


export default function Setting({params}: { params: { company: string } }) {
  const [resume, setResume] = useState ('');
  const [coverLetter, setCoverLetter] = useState (null);
  useEffect (() => {
    axios.get (`/api/resume/${params.company}`).then ((response) => {
      console.log (response.data);
      setResume (JSON.stringify(response.data, null, 2));
    });
  }, []);
  useEffect (() => {
    axios.get (`/api/coverLetter/${params.company}`).then ((response) => {
      console.log (response.data);
      setCoverLetter (response.data);
    });
  }, []);

  const saveResume = () => {
    axios.post (`/api/setting/${params.company}?action=saveResume`, resume).then ((response) => {
      console.log (response.data);
    });
  }
  const saveCoverLetter = () => {
    axios.post (`/api/setting/${params.company}?action=saveCoverLetter`, coverLetter).then ((response) => {
      console.log (response.data);
    });
  }
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-4/5 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Setting</h1>
          <Button>back</Button>
        </div>
        <div className="flex justify-center mt-4">
          <h2>Resume</h2>
          <Button  onClick={()=>saveResume}>save resume</Button>
        </div>
        {/*<Input type="textArea" autoSize={{minRows: 10, maxRows: 30}} value={JSON.stringify (resume, null, 2)} />*/}
        <Input.TextArea
          rows={30}
          style={{width: '100%'}}
          value={resume || ''}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Enter resume content"
        />
        <div className="flex justify-center mt-4">
          <h2>Cover Letter</h2>
          <Button onClick={()=> saveCoverLetter()}>save cl</Button>
        </div>
        <TextArea autoSize={{minRows: 10, maxRows: 30}} value={JSON.stringify (coverLetter, null, 2)}/>
      </div>
    </div>
  );
}
