"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

import { AnimatePresence, motion } from 'framer-motion'

interface NavLink {
    id: string,
    href: string;
    label: string;
}

const NavBar = () => {
    const [currentPath, setCurrentPath] = useState("/");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        setCurrentPath(pathname);
    }, [currentPath]);

    const navLinks: NavLink[] = [
        { id: '1', href: '/', label: '.home' },
        { id: '2', href: '/about', label: '.aboutMe' },
        { id: '3', href: '/projects', label: '.myProjects' },
        { id: '4', href: '/contact', label: '.contactMe' }
    ];

    const isActive = (href: string) => {
        return pathname === href ? 'text-success' : '';
    };


    const isNotAdminPage = !currentPath.startsWith("/awbibib");

    if (!isNotAdminPage) return null;


    return (
        <>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 top-[8rem] bg-neutral-950 z-[30]"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></motion.div>
            )}
            <AnimatePresence>

                <motion.nav
                    initial={{ y: '-60%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-60%', opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                    className="grid grid-cols-2 mt-10 items-center lg:grid-cols-4 relative z-50 2xl:px-32">
                    <ul className="text-2xl justify-center items-center lg:col-span-1 md:col-span-4 sm:col-span-2 text-center ml-5 md:ml-0 z-50">
                        <li key="logo" className="text-gray-50 hover:text-success font-bold ease-in duration-300 inline-block p-5 border-dotted border-2 border-gray-600">
                            <Link href="/">.marsaariqi</Link>
                        </li>
                    </ul>
                    {/* Mobile Menu Button */}
                    <button
                        className={`block sm:hidden col-span-1 text-xl text-gray-50 justify-self-center ml-20 transition duration-300 ease-in-out transform ${isMobileMenuOpen ? "rotate-180" : ""
                            }`}

                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <IoClose size={55} className="text-success" /> : <CgMenuGridO size={50} />}
                    </button>


                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <>
                                <motion.ul
                                    initial={{ y: -15, opacity: 0 }}
                                    animate={{ y: 20, opacity: 1 }}
                                    exit={{ y: -15, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="lg:hidden col-span-2 flex flex-col items-center justify-start text-xl absolute top-full left-0 right-0 bg-black z-40">
                                    <p className="divider -mt-2" />
                                    {navLinks.map((link, index) => (
                                        <li key={link.id} className={`hover:text-gray- text-center ${isActive(link.href)}`}
                                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                            <Link href={link.href}>{`${link.label}`}</Link>
                                            {index !== 3 && <p className="divider w-24 mx-auto" />}
                                        </li>

                                    ))}
                                    <p className="divider -mb-2"></p>
                                </motion.ul>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Desktop Menu */}
                    <ul className="hidden sm:flex sm:col-span-4 sm:justify-center sm:items-center sm:text-2xl sm:gap-0 md:col-span-4 sm:mt-5 lg:col-span-2">
                        {navLinks.map((link, index) => (
                            <React.Fragment key={link.id}>
                                <li key={link.id} className={`hover:text-gray-50 ease-in-out duration-100 ${isActive(link.href)}`}>
                                    <Link href={link.href}>{`${link.label}`}</Link>
                                </li>
                                {index !== 3 && <p className="divider divider-horizontal" />}
                            </React.Fragment>

                        ))}
                    </ul>
                    <div className="justify-self-center hidden lg:flex mt-5">
                        <a href="/awbibib" onClick={() => router.refresh()} className="btn btn-ghost text-black rounded-3xl">you found me!</a>
                    </div>
                </motion.nav>
            </AnimatePresence>

        </>
    );
};

export default NavBar;
