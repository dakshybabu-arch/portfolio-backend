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
  metadataBase: new URL("https://your-protfolio-daksh.vercel.app"),
  title: {
    default: "Daksh Y Babu | Frontend & Full Stack Developer Portfolio",
    template: "%s | Daksh Y Babu",
  },
  description:
    "Daksh Y Babu — Frontend Developer & Full Stack Website Developer from Kerala, India. Specializing in React, Next.js, TypeScript, Node.js, and MongoDB. Building fast, modern, and high-performance web applications.",
  keywords: [
    "frontend developer",
    "website developer",
    "full stack developer",
    "database developer",
    "MongoDB developer",
    "frontend web developer",
    "web developer portfolio",
    "hire frontend developer",
    "hire website developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Node.js developer",
    "Express.js",
    "REST API developer",
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
  publisher: "Daksh Y Babu",
  icons: {
    icon: [
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/icon.svg?v=3"],
    apple: [
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Daksh Y Babu | Frontend & Full Stack Developer Portfolio",
    description:
      "Frontend developer & website developer building modern, fast, and responsive websites with React, Next.js, TypeScript, and MongoDB. Explore projects and get in touch.",
    url: "https://your-protfolio-daksh.vercel.app",
    siteName: "Daksh Y Babu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daksh Y Babu | Frontend & Full Stack Developer",
    description:
      "Frontend developer & website developer building modern, responsive websites with React, Next.js, TypeScript & MongoDB.",
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
  themeColor: "#050816",
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
      <body className="min-h-full flex flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://your-protfolio-daksh.vercel.app/#person",
                  name: "Daksh Y Babu",
                  url: "https://your-protfolio-daksh.vercel.app",
                  jobTitle: "Frontend Developer & Full Stack Web Developer",
                  description:
                    "Frontend developer and website developer from Kerala, India. Building modern, responsive websites and web applications using React, Next.js, TypeScript, Node.js, and MongoDB.",
                  knowsAbout: [
                    "Frontend Development",
                    "Website Development",
                    "Full Stack Development",
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "MongoDB",
                    "Mongoose",
                    "Database Management",
                    "Express.js",
                    "REST APIs",
                    "Responsive Web Design",
                    "UI/UX Design",
                  ],
                  sameAs: ["https://github.com/dakshybabu-arch"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://your-protfolio-daksh.vercel.app/#website",
                  url: "https://your-protfolio-daksh.vercel.app",
                  name: "Daksh Y Babu Portfolio",
                  description: "Official portfolio of Daksh Y Babu, showcasing frontend and full-stack web development projects.",
                  author: {
                    "@id": "https://your-protfolio-daksh.vercel.app/#person",
                  },
                },
              ],
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
