"use client"
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
const CFooter = () => {
    const [currentPath, setCurrentPath] = useState("/");
    const pathname = usePathname();
    useEffect(() => {
        setCurrentPath(pathname);
    }, []);

    const isNotAdminPage = !currentPath.startsWith("/awbibib");

    if (!isNotAdminPage) {
        return null;
    }
    return (
        <>
            <AnimatePresence>
                <motion.footer
                    initial={{ y: '-10%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-10%', opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                    className='fixed bottom-0 w-full flex justify-center bg-black'>
                    <div className="text-gray-500 py-2 text-xs">
                        ©2024 marsaariqi :3
                    </div>
                </motion.footer>
            </AnimatePresence>
        </>
    );
}

export default CFooter;
