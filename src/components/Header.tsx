import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import { NavItem } from "@/@types/navItem";
import Image from 'next/image';

const Header: React.FC = () => {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { href: '/', label: 'Bienvenue' },
        { href: '/nos-metiers', label: 'Nos métiers'},
        { href: '/notre-methodologie', label: 'Notre méthodologie' },
        { href: '/agence', label: `L'agence` },
        { href: '/blog', label: 'Blog' },
    ];

    return (
        <header className={styles.header + " appContainer"}>
            {/* Nav Desktop */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 w-100" aria-label="Global">
                <div className="flex">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image
                            src="/assets/logo.svg"
                            width={184.7}
                            height={81.76}
                            alt="logo Digital Booster, A solution of expansion"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Ouvrir le menu principal</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <ul className="hidden lg:flex lg:gap-x-12">
                    {navItems.map((navItem, index) => (
                        <li key={index}>
                            {navItem.subNavItem ? (
                                <div className="relative">
                                    <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-700">
                                        {navItem.label}
                                        <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 top-full z-10 mt-3 w-48 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                        <ul className="p-4">
                                            {navItem.subNavItem.map((subNavItem, subNavIndex) => (
                                                <li key={subNavIndex} className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                        {subNavItem.svg}
                                                    </div>
                                                    <div className="flex-auto">
                                                        <Link href={subNavItem.href} className={`block font-semibold text-gray-900 ${router.pathname === subNavItem.href ? styles.active : styles.navItem}`}>
                                                            {subNavItem.label}
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link href={navItem.href} className={`text-sm font-semibold leading-6 text-gray-900 ${router.pathname === navItem.href ? styles.active : styles.navItem}`}>
                                    {navItem.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
                <ul className="hidden lg:flex lg:justify-end lg:gap-x-12 items-center">
                    <Link href="/contact" className={`text-sm font-semibold leading-6 text-gray-900 ${router.pathname === "/contact" ? styles.activeLink : styles.navItem}`}>
                        Contact
                    </Link>
                    <button aria-label="CTA title ?" className="ml-4 btn primary-btn">Prendre un rendez-vous</button>
                </ul>
            </nav>

            {/* Nav Mobile */}
            {mobileMenuOpen && (
                <nav className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-10 bg-black bg-opacity-25"></div>
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <Image className="h-8 w-auto" src="/assets/logo.svg" alt="logo Digital Booster, A solution of expansion"
                                       width={32}
                                       height={32}/>
                            </Link>
                            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Fermer le menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <ul className="space-y-2 py-6">
                                    {navItems.map((navItem, index) => (
                                        <li key={index}>
                                            {navItem.subNavItem ? (
                                                <div className="-mx-3">
                                                    <button type="button" className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                        {navItem.label}
                                                        <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <ul className="mt-2 space-y-2">
                                                        {navItem.subNavItem.map((subNavItem, subNavIndex) => (
                                                            <li key={subNavIndex}>
                                                                <Link href={subNavItem.href} className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                                    {subNavItem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <Link href={navItem.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                    {navItem.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div className="py-6">
                                    <Link href="/contact" className={`text-sm font-semibold leading-6 text-gray-900 ${router.pathname === "/contact" ? styles.activeLink : styles.navItem}`}>
                                        Contact
                                    </Link>
                                    <button aria-label="ouvrir popup prise de rendez-vous" className="ml-4 btn primary-btn">Prendre un rendez-vous</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
