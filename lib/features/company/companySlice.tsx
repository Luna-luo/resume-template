import { createSlice } from '@reduxjs/toolkit'

const companySlice = createSlice({
  name: 'company',
  initialState: {
    value: 'pp'
  },
  reducers: {
    setCompanyName: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setCompanyName } = companySlice.actions
export default companySlice.reducer