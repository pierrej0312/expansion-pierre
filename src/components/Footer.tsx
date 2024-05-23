import Image from "next/image";
import {NavItem} from "@/types/navItem";
import Link from "next/link";
import {navItems} from "@/utils/shared-data";

const Footer: React.FC = () => {

    return (
        <footer className={'appContainer h-fit py-24 bg-gray-000'}>
            <div className="mx-auto flex-col max-w-7xl items-center justify-center p-6 lg:px-8 w-100 gap">
                <Image src="/assets/logo.svg" alt="" width={90} height={40}/>
                <nav>
                    <ul className="flex space-y-2 py-6 gap wrap justify-center">
                        {navItems.map((navItem, index) => (
                            <li key={index}>
                                <Link href={navItem.href} className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className="font-regular text-sm leading-8 text-gray-500">©2024 Digital Booster, all rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
