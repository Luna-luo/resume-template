'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Modal, Input } from 'antd';
import { useState } from 'react';
import { setCompanyName } from '@/lib/features/company/companySlice';
import { useRouter } from 'next/navigation';


export default function NewButton() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(setCompanyName(company))
    setIsModalOpen(false);
    router.push('/new')
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className="my-4" onClick={showModal}>New</Button>
      <Modal title="Company Basic" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>Company Name</div>
        <Input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
        />
      </Modal>
    </>
  )
}