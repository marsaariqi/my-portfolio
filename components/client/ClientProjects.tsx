"use client"

import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import { IoBatteryHalf, IoBodyOutline, IoBugOutline, IoBulbOutline, IoCloudUploadOutline, IoCodeOutline, IoCodeSlashOutline, IoConstructOutline, IoCut, IoGitBranchOutline, IoGlobeOutline } from "react-icons/io5"
import Image from "next/image"
import { FaArrowsLeftRight } from "react-icons/fa6"
import { getProjectData } from "@/services/ProjectData"


const icons = [
    IoCodeOutline,
    IoBodyOutline,
    IoBulbOutline,
    IoConstructOutline,
    IoCut,
    IoBugOutline,
    IoCloudUploadOutline,
    IoGitBranchOutline,
    IoGlobeOutline,
    IoBatteryHalf,
    IoCodeSlashOutline,
];

const ClientProjects = () => {
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const [activeIconIndex, setActiveIconIndex] = useState(0);
    const ANIMATION_DURATION = 220;

    const { projectData, isLoading } = getProjectData();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, ANIMATION_DURATION);

        return () => clearInterval(intervalId);
    }, [icons.length]);

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-56">
                {/* Heading */}
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '60%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '60%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className="text-5xl text-gray-50 px-8 font-bold w-fit cursor-default mb-10 -mt-8 text-center z-10">
                        <h1 className="hover:text-primary ease-in-out duration-200">
                            Some of <span className="text-success">my</span> works!
                        </h1>
                    </motion.div>
                </AnimatePresence>
                {/* Icons */}
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '-60%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-60%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className="flex gap-2 mb-10 -mt-5 ">
                        {icons.map((Icon, index) => {
                            const animationClass = `animate ease-in-out duration-${ANIMATION_DURATION}`;
                            return (
                                <span key={index}>
                                    <Icon
                                        size={22}
                                        className={` ${animationClass} ${activeIconIndex === index ? 'text-success ' : 'motion-safe:animate-pulse text-gray-500'
                                            }`
                                        }
                                    />
                                </span>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Circle Bar */}
                <AnimatePresence>
                    <motion.svg
                        initial={{ y: '60%', opacity: 0 }}
                        animate={{ y: 0, rotate: 270, opacity: 1 }}
                        exit={{ y: '60%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        width={100} height={100} viewBox="0 0 100 100"
                    >
                        <circle cx="50" cy="50" r="30" pathLength="1" className="stroke-base-100 stroke-[15%]" />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="30"
                            pathLength="1"
                            className="stroke-primary stroke-[15%]"
                            style={{ pathLength: scrollXProgress }}
                        />
                    </motion.svg>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className="text-primary -my-4">
                        <FaArrowsLeftRight size={48} />
                    </motion.div>
                </AnimatePresence>
                {/* Container */}
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '-30%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-30%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className="max-w-4xl w-full px-5 mt-4"

                    >
                        <div className="project-container relative overflow-y-hidden overflow-x-scroll flex flex-col border-2 border-dashed border-primary bg-black w-full px-5 pb-2 justify-start items-start rounded-lg mb-8"
                            ref={containerRef}
                        >
                            <ul
                                className="card-container flex justify-start items-stretch gap-5 rotate-180 h-full"
                            >
                                {!isLoading ? (
                                    <>
                                        <AnimatePresence>
                                            {projectData.toReversed().map((prj) => (
                                                <motion.li
                                                    initial={{ opacity: 0, scale: 0.7 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                                                    key={prj._id}
                                                    className="card w-72 sm:w-80 bg-black shadow-xl mb-4 mt-1 border-2 border-dashed border-success overflow-hidden hover:border-primary">
                                                    <motion.figure
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                                                        className="px-4 pt-5 overflow-hidden relative w-[15rem] h-36 sm:w-[17rem] sm:h-40 mx-auto mt-5 border-2 border-dashed border-success shrink-0">
                                                        <Image
                                                            src={prj.image}
                                                            alt="Project Preview Image"
                                                            fill={true}
                                                            style={{ objectFit: "fill" }}
                                                        />
                                                    </motion.figure>
                                                    <div className="card-body items-center text-center cursor-default -mt-5">
                                                        <h2 className="card-title text-success">{prj.title}</h2>
                                                        <p className="text-left text-pretty -mx-2">{prj.desc}</p>
                                                        <div className="card-actions gap-5 items-end">
                                                            <Link href={prj.githubLink} target="_blank" className="hover:scale-105 hover:text-gray-50 ease-in-out duration-200">
                                                                <FaGithub size={50} />
                                                            </Link>
                                                            <Link href={prj.projectLink}
                                                                target="_blank" className="btn btn-outline btn-success">Visit me!</Link>
                                                        </div>
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <>
                                        {[1, 2, 3, 4].map((index) => (
                                            <motion.li
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                                                key={index} className="card w-72 sm:w-80 bg-black shadow-xl mb-4 mt-1 border-2 border-dashed border-neutral justify-center items-center py-8">
                                                <div className="flex flex-col gap-4 w-52">
                                                    <div className="skeleton h-32 w-full"></div>
                                                    <div className="skeleton h-4 w-28 mx-auto"></div>
                                                    <div className="skeleton h-4 w-full"></div>
                                                    <div className="skeleton h-4 w-full"></div>
                                                    <div className="skeleton h-4 w-28"></div>
                                                    <div className="flex justify-center gap-5 mt-10">
                                                        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                                                        <div className="skeleton w-24 h-12 rounded-4xl shrink-0"></div>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </>
                                )}

                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

export default ClientProjects