import './globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import { AuthProvider } from '@/contexts/user-context';
import { baiJamjuree, spaceMono } from '@/helpers/fonts';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`dark ${spaceMono.variable} ${baiJamjuree.variable} `}>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
