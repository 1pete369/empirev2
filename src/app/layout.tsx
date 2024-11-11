import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserDataProviderContext";


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
        <Navbar />
        {children}
        </UserProvider>
      </body>
    </html>
  );
}
