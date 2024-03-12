"use client"

import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

interface SidebarProps {
    onItemClick: (pageName: 'home' | 'about' | 'projects' | 'contact') => void;
    Logout: () => void;
}


const AwSidebar: React.FC<SidebarProps> = ({ onItemClick, Logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState<'home' | 'about' | 'projects' | 'contact'>('home');

    const handleItemClick = (pageName: 'home' | 'about' | 'projects' | 'contact') => {
        onItemClick(pageName);
        setIsActive(pageName);
        if (window.innerWidth <= 1024) {
            setIsOpen(false);
        }
    };



    return (
        <>
            <div className={`drawer  lg:drawer-open flex`}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                <div className="drawer-content flex flex-row lg:bg-black bg-base-300 justify-between py-4 px-10 lg:hidden z-10 w-full overflow-hidden mt-40 -mb-40">
                    {/* Page content here */}
                    <a href="/" className='text-3xl font-bold my-auto cursor-pointer hover:text-gray-50 text-accent'>
                        .marsaariqi
                    </a>

                    <label htmlFor="my-drawer-2" className="drawer-button my-auto cursor-pointer hover:text-gray-50 hover:scale-110 hover:rotate-180 ease-in-out duration-300"><CgMenuGridO size={50} /></label>
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-5 w-80 min-h-full bg-base-300 text-base-content text-xl gap-5 font-semibold">
                        {/* Sidebar content */}
                        <p className='text-3xl font-bold -mb-5 hover:text-gray-50 cursor-pointer mx-auto text-accent' ><a href="/">.marsaariqi</a></p>
                        <hr className='mt-5' />
                        <li onClick={() => handleItemClick('home')} className={`hover:text-gray-50 ${isActive === 'home' && 'text-primary'}`}><a>.home</a></li>
                        <li onClick={() => handleItemClick('about')} className={`hover:text-gray-50 ${isActive === 'about' && 'text-primary'}`}><a>.aboutMe</a></li>
                        <li onClick={() => handleItemClick('projects')} className={`hover:text-gray-50 ${isActive === 'projects' && 'text-primary'}`}><a>.myProjects</a></li>
                        <li onClick={() => handleItemClick('contact')} className={`hover:text-gray-50 ${isActive === 'contact' && 'text-primary'}`}><a>.contactMe</a></li>
                        <hr className='mt-5' />
                        <li onClick={() => Logout()} className='hover:text-gray-50'><a>.logout</a></li>
                    </ul>
                    <footer className="p-4 text-center text-xs font-light text-gray-500 lg:-mt-12 mt-auto lg:mb-0">
                        © 2024 marsaariqi
                    </footer>
                </div>
            </div>
        </>
    )
}

export default AwSidebar