
'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useAuth} from "@/libs/hooks/AuthHook.";


const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Users list', href: '/users', icon: 'users' },
        { name: 'Dashboard', href: '/dashboard', icon: 'chart-bar' }
    ];

    return (
        <div>
            <div >
                <h1 >Super Admin Panel</h1>
            </div>

            <nav className="mt-6 px-2">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`flex items-center rounded-md px-4 py-2 ${
                                    pathname === item.href
                                        ? 'bg-indigo-900 text-white'
                                        : 'text-indigo-100 hover:bg-indigo-700'
                                }`}
                            >
                <span className="mr-3">
                </span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="absolute bottom-0 mb-4 w-64 px-4">
                <button
                    onClick={logout}
                    className="flex w-full items-center rounded-md px-4 py-2 text-indigo-100 hover:bg-indigo-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;