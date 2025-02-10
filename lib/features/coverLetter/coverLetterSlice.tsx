import { CoverLetterContent } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

const coverLetterSlice = createSlice({
  name: 'coverLetter',
  initialState,
  reducers: {
    setClContent: (state, action: PayloadAction<CoverLetterContent>) => {
      Object.assign(state, action.payload);
    }
  }
})

export const { setClContent } = coverLetterSlice.actions
export default coverLetterSlice.reducer