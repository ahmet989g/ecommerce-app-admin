import Header from "@/components/Header";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react"

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <main className={`mx-auto max-w-screen-6xl px-4 sm:px-6 lg:px-8 ${poppins.className}`}>
    <SessionProvider session={session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  </main>;
}
