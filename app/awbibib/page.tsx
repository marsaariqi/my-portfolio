"use client"
import AwAbout from '@/components/admin/About/Hero'
import AwContact from '@/components/admin/Contact/Hero'
import AwHome from '@/components/admin/Home/Hero'
import LoginAwbibib from '@/components/admin/Login/Hero'
import AwProjects from '@/components/admin/Projects/Hero'
import AwSidebar from '@/components/admin/Sidebar'
import { Suspense, useEffect, useState } from 'react'
import Loading from './loading'


const Page = () => {
    const [activePage, setActivePage] = useState<'home' | 'about' | 'projects' | 'contact'>('home');
    const [authAwbibib, setAuthAwbibib] = useState(false);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedPage = localStorage.getItem('activePage');
            if (storedPage && ['home', 'about', 'projects', 'contact'].includes(storedPage)) {
                setActivePage(storedPage as 'home' | 'about' | 'projects' | 'contact');
            }
        }
    }, []);

    const handleMenuItemClick = (pageName: 'home' | 'about' | 'projects' | 'contact') => {
        setActivePage(pageName);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activePage', pageName);
        }
    };


    useEffect(() => {
        const authAwbibibFromSessionStorage = sessionStorage.getItem("authAwbibib");
        if (authAwbibibFromSessionStorage) {
            setAuthAwbibib(JSON.parse(authAwbibibFromSessionStorage));
        }
    }, []);


    const Logout = () => {
        setAuthAwbibib(false);
        sessionStorage.removeItem('authAwbibib');
    }

    if (!authAwbibib) {
        return <LoginAwbibib setAuthAwbibib={setAuthAwbibib} />
    }
    return (
        <main className='flex flex-col  md:flex-col sm:flex-col lg:flex-row'>
            <nav className='top-0 z-10 lg:fixed'>
                <AwSidebar
                    onItemClick={handleMenuItemClick} Logout={Logout} />
            </nav>
            <Suspense fallback={<Loading />}>
                <div className='p-6 lg:pl-[22rem] h-[90dvh] w-full'>
                    {activePage === 'home' && <AwHome />}
                    {activePage === 'about' && <AwAbout />}
                    {activePage === 'projects' && <AwProjects />}
                    {activePage === 'contact' && <AwContact />}
                </div>
            </Suspense>
        </main>
    )
}

export default Page