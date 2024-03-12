"use client"
import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: '20%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                className=''
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
