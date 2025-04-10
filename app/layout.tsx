import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { GeistSans } from 'geist/font/sans';
import { Nav } from '@/widgets/header/ui';

import AuthButton from '@/features/auth/ui/AuthButton';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import { Logo } from '@/shared/ui/Logo';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Product Engineer Community',
  description: '코드를 넘어, 가치를 만드는 엔지니어들의 성장 공간',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Nav />
        <main className="flex min-h-screen flex-col items-center">
          <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
            <div className="flex w-full max-w-5xl items-center justify-between px-4 text-sm">
              <Logo />
              <AuthButton />
            </div>
          </nav>

          <div className="pt-16">{children}</div>

          <footer className="border-t-foreground/10 flex w-full justify-center border-t p-4 text-center text-xs">
            <div className="text-left text-stone-400">
              <div>상호명: 마중물 | 대표: 황경찬</div>
              <div>사업자등록번호: 264-01-01901</div>
              <div>정보통신업 주소: 경기도 광주시 회안대로 350-23</div>
              <div>문의: 010 5056 2412</div>
              <div className="flex justify-between">
                <ExternalLink href="https://slashpage.com/pec/terms-of-use">
                  이용약관
                </ExternalLink>
                <ExternalLink href="https://slashpage.com/pec/privacy-policy">
                  개인정보 처리방침
                </ExternalLink>
              </div>
              Copyright© PEC
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
