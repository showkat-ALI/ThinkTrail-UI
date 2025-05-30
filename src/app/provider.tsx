'use client'

import { Provider } from 'react-redux'
import store from '../redux-hook/store'
import PageWrapper from '../components/wrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PageWrapper>
        {children}
      </PageWrapper>
    </Provider>
  )
}