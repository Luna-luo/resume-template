import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './features/company/companySlice';
import resumeReducer from './features/resume/resumeSlice';
import coverLetterReducer from './features/coverLetter/coverLetterSlice';
import storage from 'redux-persist/lib/storage';  // 使用 localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// 配置 redux-persist
const persistConfig = {
  key: 'company',
  storage,
};


const persistedReducer = persistReducer(persistConfig, companyReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      company: persistedReducer,
      resume: resumeReducer,
      coverLetter: coverLetterReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

// 创建 persistor
export const persistor = persistStore(makeStore());
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']