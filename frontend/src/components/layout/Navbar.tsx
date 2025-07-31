'use client';

import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/AuthContext';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Navbar = () => {
    const { logout, user } = useAuth();
    const pathname = usePathname()

    return (
        <header className="w-full z-40 h-16 px-6 flex items-center justify-between bg-[#040612] shadow text-white">
            <Link href={"/"} className="flex items-center gap-x-2 group group-hover:cursor-pointer">
                <img src="/logo/logo.svg" className='size-8' />
                <img src="/logo/logo-text.svg" className='size-16' />
            </Link>

            <nav className="flex items-center space-x-8 text-sm">
                <Link href="/task-list" className={clsx(pathname.startsWith("/task-list") && "text-green-400","hover:text-green-400 flex items-center gap-1 font-medium text-lg")}>
                    <img src="/icons/clipboard.svg" className='size-5' />
                    <p>Task List</p>
                </Link>
                <Link href="/spin" className={clsx(pathname.startsWith("/spin") && "text-green-400","hover:text-green-400 flex items-center gap-1 font-medium text-lg")}>
                    <img src="/icons/spin.svg" className='size-5' />
                    <p>Spin</p>
                </Link>
                {/* <Link href="/friends" className={clsx(pathname.startsWith("/friends") && "text-green-400","hover:text-green-400 flex items-center gap-1 font-medium text-lg")}>
                    <img src="/icons/people.svg" className='size-5' />
                    <p>Friends</p>
                </Link> */}
            </nav>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            // src="https://randomuser.me/api/portraits/men/3.jpg"
                            src={"https://randomuser.me/api/portraits/men/2.jpg"}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <span>{user?.name || 'Thomas M.'}</span>
                        <ChevronDown size={12} />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="mt-2">
                    <DropdownMenuItem onClick={logout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Navbar;
