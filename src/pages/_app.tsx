import './globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Bai_Jamjuree } from 'next/font/google';
import SidebarNav from '@/components/SidebarNav/SidebarNav';
import { AuthProvider } from '@/contexts/user-context';

const baiJamjuree = Bai_Jamjuree({
  weight: '200',
  subsets: ['latin'],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={baiJamjuree.className}>
      {/* <style jsx global>{`
        table {
          font-family: ${baiJamjuree.style.fontFamily};
        }
      `}</style> */}
      <AuthProvider>
        <SidebarNav />
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
