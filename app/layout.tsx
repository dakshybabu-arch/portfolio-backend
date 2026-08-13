import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daksh Y Babu | Frontend Developer & Website Developer Portfolio",
  description: "Daksh Y Babu — Frontend Developer & Website Developer from Kerala, India. I build modern, responsive websites and web applications using React, Next.js, and TypeScript. Hire a skilled frontend developer for your next project.",
  keywords: [
    "frontend developer",
    "website developer",
    "frontend web developer",
    "web developer portfolio",
    "hire frontend developer",
    "hire website developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "responsive web design",
    "modern web development",
    "freelance frontend developer",
    "freelance website developer",
    "website developer India",
    "frontend developer India",
    "frontend developer Kerala",
    "portfolio website",
    "UI developer",
    "web development services",
    "Daksh Y Babu",
  ],
  authors: [{ name: "Daksh Y Babu", url: "https://your-protfolio-daksh.vercel.app" }],
  creator: "Daksh Y Babu",
  openGraph: {
    title: "Daksh Y Babu | Frontend Developer & Website Developer",
    description: "Frontend developer & website developer building modern, responsive websites with React, Next.js & TypeScript. View my projects and get in touch.",
    url: "https://your-protfolio-daksh.vercel.app",
    siteName: "Daksh Y Babu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daksh Y Babu | Frontend Developer & Website Developer",
    description: "Frontend developer & website developer building modern, responsive websites with React, Next.js & TypeScript.",
  },
  alternates: {
    canonical: "https://your-protfolio-daksh.vercel.app",
  },
  other: {
    "google-site-verification": "aUFwfP4iQ96j5BOvQsJugkY3-chBFmCaFUOYKkT-3CU",
    "msvalidate.01": "0570F710230A914D333A1AB0A2AB9D88",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Daksh Y Babu",
              url: "https://your-protfolio-daksh.vercel.app",
              jobTitle: "Frontend Developer & Website Developer",
              description:
                "Frontend developer and website developer from Kerala, India. Building modern, responsive websites and web applications using React, Next.js, and TypeScript.",
              knowsAbout: [
                "Frontend Development",
                "Website Development",
                "React",
                "Next.js",
                "TypeScript",
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Web Design",
                "UI Design",
              ],
              sameAs: ["https://github.com/dakshybabu-arch"],
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
