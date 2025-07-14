import { LAYOUT_CLASSES } from '@/constants/styles';

import '@/styles/globals.css';

export const metadata = {
  title: 'My Calendar App',
  description: 'Simple and clean calendar application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className={LAYOUT_CLASSES.DEFAULT_PAGE_LAYOUT}>{children}</div>
      </body>
    </html>
  );
}
