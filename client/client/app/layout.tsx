import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f7f8fa] text-slate-900 antialiased">
        <Sidebar />

        <main className="min-h-screen pl-0 md:pl-64">
          <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}