"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { FaDiscord, FaGithub, FaLinkedin, FaSpotify } from 'react-icons/fa';
import CursorBlinker from '../CursorBlinker';
import Link from 'next/link';
import { getDataStats } from '@/services/HomeData';
import { getResumeData } from '@/services/ResumeData';
import { useEffect, useRef, useState } from 'react';

const fonts = ['Open Sans', 'Montserrat', 'Raleway', 'Roboto', 'Lato', 'Arial', 'Ubuntu', 'Oswald'];

const ClientHome = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        favFont: '',
        totalProject: '',
        workYears: '',
        resumeUrl: '',
    });
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 9) + 1);
    const [randomNumberB, setRandomNumberB] = useState(Math.floor(Math.random() * 9) + 1);
    const [currFont, setCurrFont] = useState('');
    const [currText, setCurrText] = useState(' Marsa,');
    const [currentDots, setCurrentDots] = useState('');

    const handleHover = () => {
        setCurrText(' awbibib,');
    };
    const handleMouseLeave = () => {
        setCurrText(' Marsa,');
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * fonts.length);
            const newDots = currentDots.length === 3 ? '' : currentDots + '.';
            setCurrentDots(newDots);
            setCurrFont(fonts[randomIndex]);
            setRandomNumber(Math.floor(Math.random() * 9) + 1);
            setRandomNumberB(Math.floor(Math.random() * 9) + 1);

        }, 200);

        return () => clearInterval(intervalId);
    }, [currentDots]);

    // useEffect(() => {
    //     const fetchDataAndSetState = async () => {
    //         try {
    //             setIsLoading(true); 

    //             const { stats } = await getDataStats();
    //             const { resume } = await getResumeData();

    //             const fetchedData = {
    //                 favFont: stats[0].favFont,
    //                 totalProject: stats[0].totalProject,
    //                 workYears: stats[0].workYears,
    //                 resumeUrl: resume[0].resumeUrl,
    //             };

    //             setData(fetchedData);
    //             setIsLoading(false); 
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchDataAndSetState();
    // }, []);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            setIsLoading(true);

            try {
                const { stats } = await getDataStats();
                const { resume } = await getResumeData();

                const fetchedData = {
                    favFont: stats[0].favFont,
                    totalProject: stats[0].totalProject,
                    workYears: stats[0].workYears,
                    resumeUrl: resume[0].resumeUrl,
                };

                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, []);


    return (
        <>
            <div className="flex flex-col justify-center items-center overflow-hidden mt-44">
                {/* Heading */}
                <div>
                    <AnimatePresence>
                        <motion.div
                            initial={{ x: '-20%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-20%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        >
                            <h1 className="text-5xl text-gray-50 md:text-7xl px-8 font-bold w-fit mt-4 cursor-default hover:text-accent ease-in-out duration-200">
                                Hi!
                                <br />
                                <span className='text-gray-50'>I'm
                                </span>
                                <span
                                    className="text-primary"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {currText}
                                </span>
                                <br />
                                I Do <span className="text-pretty text-info">
                                    Web Development</span> Stuff
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence>
                        <motion.div
                            initial={{ x: '20%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '20%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        >
                            <h2 className="px-8 mt-5 text-md lg:text-lg font-semibold text-left w-fit cursor-default">Mostly <span className="text-success">Front-End</span> stuff, but I do <span className="text-accent">Full-Stack</span> sometimes☺</h2>

                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: '-60%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-60%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        >
                            <div className='flex gap-2 px-8 mt-2 mb-10'>
                                <Link
                                    href="https://www.linkedin.com/in/marsa-ariqi-gustiandza-1023851b7/"
                                    target='_blank'
                                    className='hover:text-blue-300 hover:scale-105 ease-in duration-200'><FaLinkedin size={40} /></Link>
                                <Link
                                    href="https://github.com/marsaariqi"
                                    target='_blank'
                                    className='hover:text-gray-50 hover:scale-105 ease-in duration-200' ><FaGithub size={40} /></Link>
                                <Link
                                    href="https://open.spotify.com/user/udsrhrklpnb0bd7i2we1oc4ve?si=a80c486ea1fa415f"
                                    target='_blank'
                                    className='hover:text-green-300 hover:scale-105 ease-in duration-200'><FaSpotify size={40} /></Link>
                                <Link
                                    href="https://discordapp.com/users/360432973117390860"
                                    target='_blank'
                                    className='hover:text-indigo-400 hover:scale-105 ease-in duration-200'><FaDiscord size={40} /></Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Stats*/}
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '50%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '50%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                    >
                        <div className="stats shadow w-fit scale-[.85] md:scale-100 cursor-default mt-0 sm:-mt-8 text-primary bg-zinc-900">
                            <div className="stat place-items-center">
                                <div className="stat-value mb-2 hover:text-gray-50 hover:scale-105 ease-in-out duration-200">{isLoading ? (
                                    <div suppressHydrationWarning >{currFont}</div>
                                ) :
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            scale: {
                                                type: "spring",
                                                damping: 8,
                                                stiffness: 100,
                                                restDelta: 0.001
                                            }
                                        }}
                                    >
                                        {data.favFont}
                                    </motion.div>
                                }
                                </div>
                                <div className="stat-desc">Favorite Font</div>
                            </div>
                            <div className="stat place-items-center">
                                <div className="stat-value flex hover:text-gray-50 hover:scale-105 ease-in-out duration-200">{isLoading ? (
                                    <div suppressHydrationWarning >{randomNumber}</div>
                                ) :
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            scale: {
                                                type: "spring",
                                                damping: 8,
                                                stiffness: 100,
                                                restDelta: 0.001
                                            }
                                        }}
                                    >
                                        {data.totalProject}
                                    </motion.div>
                                }<span className='text-success'>+</span></div>
                                <div className="stat-desc">Projects</div>
                            </div>

                            <div className="stat place-items-center">
                                <div className="stat-value flex hover:text-gray-50 hover:scale-105 ease-in-out duration-200">{isLoading ? (
                                    <div suppressHydrationWarning >{randomNumberB}</div>
                                ) :
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            scale: {
                                                type: "spring",
                                                damping: 8,
                                                stiffness: 100,
                                                restDelta: 0.001
                                            }
                                        }}
                                    >
                                        {data.workYears}
                                    </motion.div>
                                }<span className='text-success'>+</span></div>
                                <div className="stat-desc">Experience</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Resume */}
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '-20%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-20%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className='max-w-lg w-full mx-auto px-5'
                    >
                        <div className="mockup-browser border-2 bg-neutral-950 mt-4 mb-5 cursor-default border-dashed border-success">
                            <div className="mockup-browser-toolbar">
                                <div className="input text-gray-50">My Resume!</div>
                            </div>
                            <div className="flex flex-col justify-center py-5 bg-black p-8 w-full items-center">
                                <div className="mockup-code bg-zinc-900 max-w-xs w-full">
                                    <pre data-prefix="$"><code>npm i Resume.pdf</code></pre>
                                    <pre data-prefix=">" className="text-warning">
                                        {isLoading ? (
                                            <code suppressHydrationWarning>installing{currentDots}</code>
                                        ) : (

                                            <code>installing...</code>
                                        )}
                                    </pre>
                                    {isLoading ? (
                                        null
                                    ) : (
                                        <>
                                            <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
                                            <pre data-prefix="$"><code><CursorBlinker /></code></pre>
                                        </>
                                    )}

                                </div>
                                <motion.div
                                    className='mx-auto mt-5'
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0, 0.71, 0.2, 1.01],
                                        scale: {
                                            type: "spring",
                                            damping: 8,
                                            stiffness: 100,
                                            restDelta: 0.001
                                        }
                                    }}
                                >
                                    {isLoading ? (
                                        null
                                    ) : (

                                        <Link href={data.resumeUrl}
                                            download="Marsa Ariqi Gustiandza - Resume.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='btn btn-outline btn-success motion-safe:animate-bounce'>
                                            Open Resume!
                                        </Link>
                                    )}

                                </motion.div>

                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

export default ClientHome