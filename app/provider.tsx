"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux-hook/store";
import BrandLoader from "../components/utils/loaders/BrandLoader";
import PageWrapper from "../components/wrapper";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<BrandLoader/>} persistor={persistor}>
      <PageWrapper>

        {children}
      </PageWrapper>

      </PersistGate>
    </Provider>
  );
}
