import "@/styles/globals.css";


export const metadata = {
  title: "My Calendar App",
  description: "Simple and clean calendar application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
          {children}
        </div>
      </body>
    </html>
  );
}
