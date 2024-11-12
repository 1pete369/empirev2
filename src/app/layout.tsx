import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserDataProviderContext";
import { AdminAnalyticsProvider } from "./contexts/AdminAnalytics";


export const metadata: Metadata = {
  title: "Your productivity hub",
  description: "Productivity App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AdminAnalyticsProvider>
        <Navbar />
        {children}
          </AdminAnalyticsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
