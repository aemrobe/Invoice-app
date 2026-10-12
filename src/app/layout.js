import { League_Spartan } from "next/font/google";
import "./globals.css";
import "@daypicker/react/style.css";
import AppProviders from "@/providers/AppProviders";
import Header from "@/components/layout/Header";

const spartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Invoice app",
    default: "Invoice App",
  },
  description:
    "A full-stack invoice management application built with Next.js and Tailwind CSS to create, filter, track, and manage invoices with dark mode support.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spartan.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-surface-app">
        <AppProviders>
          <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] pt-18 md:pt-20 lg:pt-0">
            <div className="w-25.75">
              <Header />
            </div>

            <main className="min-h-dvh flex-1 flex flex-col">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
