import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/providers/auth-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TaskFlow Solutions",
  description: "Task Management Application",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className='w-full mx-auto pt-20 h-[calc(100vh-4rem)] relative font-mono'>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
