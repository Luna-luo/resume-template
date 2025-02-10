import { ResumeData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ResumeData = {
  jobTitle: null,
  contactInfo: [],
  introduction: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeContent: (state, action: PayloadAction<ResumeData>) => {
      Object.assign(state, action.payload);
    }
  }
})

export const { setResumeContent } = resumeSlice.actions
export default resumeSlice.reducer