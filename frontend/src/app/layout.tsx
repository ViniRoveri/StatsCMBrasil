import type { Metadata } from "next"
import "@/globals.css"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Stats CM Brasil",
  icons: '/favicon.ico'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-vr-black">
        <NextTopLoader color="var(--yellow)" height={2} showSpinner={false}/>

        <Header/>

        <main className="px-6 py-4">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}
