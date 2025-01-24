import "../styles/globals.css";
import type { AppProps } from "next/app";
import "swiper/css/bundle";
import "./../styles/testimonialsSwiperStyles.module.css";
import { Provider } from "react-redux";
import store from "../app/store";
import PageWrapper from "../components/wrapper";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </Provider>
  );
}

export default MyApp;
