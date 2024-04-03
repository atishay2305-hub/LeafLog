import '../styles/global.css';
import { AppProps } from 'next/app';
import { BrowserRouter as Router } from 'react-router-dom'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
