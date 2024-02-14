import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router";

export default function Header() {
    const { data: session } = useSession();

    const router = useRouter();
    const { pathname } = router;

    const active = 'text-green-500 transition hover:text-green-500/75 p-2 bg-gray-200 rounded-md';
    const inactive = 'text-gray-500 transition hover:text-gray-500/75 p-2';

    if (session) {
        return <>
            <header className="bg-white border-b sticky top-0">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-teal-600" href="#">
                        <span className="sr-only">Home</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                            <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                            <path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clip-rule="evenodd" />
                            <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                        </svg>

                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-lg">
                                <li>
                                    <Link className={location.pathname === '/' ? active : inactive } href="/"> Dashboard </Link>
                                </li>
                                <li>
                                    <Link className={location.pathname === '/urunler' ? active : inactive} href="/urunler"> Ürünler </Link>
                                </li>
                                <li>
                                    <Link className={location.pathname === '/kategoriler' ? active : inactive} href="/kategoriler"> Kategoriler </Link>
                                </li>
                                <li>
                                    <Link className={location.pathname === '/siparisler' ? active : inactive} href="/siparisler"> Siparişler </Link>
                                </li>
                                <li>
                                    <Link className={location.pathname === '/ayarlar' ? active : inactive} href="/ayarlar"> Ayarlar </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <div class="h-10 w-10">
                                    <img class="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt="" />
                                </div>
                            </div>

                            <button
                                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    }
}