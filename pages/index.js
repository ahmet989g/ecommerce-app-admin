import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  
  const { data: session } = useSession()
  if (session) {
    return <>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl m-auto">
        <h1 className="text-4xl font-bold max-w-lg text-center">Admine Hoşgeldiniz</h1>
        <p className="my-5 font-medium">Bu sayfayı görüntülemek için bir hesap gerekli.</p>
        <button onClick={() => signIn('google')}
          class="inline-block rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500"
          href="#"
        >
          Google ile Giriş Yap
        </button>
      </div>
    </>
  );
}
