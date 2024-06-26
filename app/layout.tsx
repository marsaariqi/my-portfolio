import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import Starfield from 'react-starfield';
import NavBar from "@/components/client/NavBar";
import CFooter from "@/components/client/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import { Analytics } from "@vercel/analytics/react"


const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ['latin'] });
const imageUrl = 'https://marsaariqi.my.id/preview.jpg';


export const metadata: Metadata = {
  title: "marsaariqi",
  description: "Marsa Ariqi Gustiandza Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <meta property="og:title" content="my portfolio :3" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content="marsaariqi.my.id" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:creator" content="@fishercore"></meta>
      </head>
      <body className={`${poppins.className} overflow-x-clip`}>
        <Starfield starCount={1200}
          starColor={[255, 255, 255]}
          speedFactor={0.02} />
        {/* <UnderConstruction /> */}
        <NavBar />
        <div className="my-5 -mt-40">
          {children}
        </div>
        <CFooter />
        <Analytics />
      </body>
    </html>
  );
}
