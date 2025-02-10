'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore, persistor } from '../lib/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<{ store: AppStore; persistor: ReturnType<typeof persistStore> } | null>(null);

  if (!storeRef.current) {
    // Create the store and persistor instance the first time this renders
    const store = makeStore();
    storeRef.current = {
      store,
      persistor: persistStore(store),
    };
  }

  const { store, persistor } = storeRef.current;

  return <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
}