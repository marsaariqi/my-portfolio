"use client"

import { useEducationData, useExperienceData } from '@/services/AboutEdEx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { FaChrome, FaCss3Alt, FaFigma, FaGitAlt, FaHtml5, FaLaravel, FaNodeJs, FaPhp, FaPython, FaReact, FaSpotify } from 'react-icons/fa'
import { GrMysql } from 'react-icons/gr'
import { IoLogoJavascript } from 'react-icons/io5'
import { SiAdobeillustrator, SiAdobephotoshop, SiMongodb, SiNextdotjs, SiNotepadplusplus, SiPostman, SiSublimetext, SiTypescript, SiVisualstudiocode } from 'react-icons/si'
import AboutSkeleton from '../AboutSkeleton';
import { useInView } from 'react-intersection-observer';


const skillsData = [
    { icon: FaHtml5, name: 'HTML', color: 'text-orange-400' },
    { icon: FaCss3Alt, name: 'CSS', color: 'text-blue-500' },
    { icon: IoLogoJavascript, name: 'JavaScript', color: 'text-yellow-300' },
    { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
    { icon: FaReact, name: 'React', color: 'text-blue-500' },
    { icon: SiNextdotjs, name: 'Next.js', color: 'text-gray-50', hoverColor: 'hover:text-gray-700' },
    { icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
    { icon: FaPhp, name: 'PHP', color: 'text-purple-500' },
    { icon: FaLaravel, name: 'Laravel', color: 'text-red-600' },
    { icon: FaPython, name: 'Python', color: 'text-green-500' },
    { icon: GrMysql, name: 'MySQL', color: 'text-blue-600' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-400' },
];

const toolsData = [
    { icon: SiVisualstudiocode, name: 'VS Code', color: 'text-blue-500', dataTip: 'Intermediate' },
    { icon: SiSublimetext, name: 'Sublime Text', color: 'text-yellow-300', dataTip: 'Intermediate' },
    { icon: FaChrome, name: 'Chrome', color: 'text-gray-300', hoverColor: 'hover:text-blue-400', dataTip: 'Intermediate' },
    { icon: FaGitAlt, name: 'Git', color: 'text-orange-600', dataTip: 'Beginner' },
    { icon: SiNotepadplusplus, name: 'Notepad++', color: 'text-green-600', dataTip: 'Intermediate' },
    { icon: FaFigma, name: 'Figma', color: 'text-gray-50', hoverColor: 'hover:text-orange-400', dataTip: 'Intermediate' },
    { icon: SiAdobephotoshop, name: 'Photoshop', color: 'text-blue-500', dataTip: 'Intermediate' },
    { icon: SiAdobeillustrator, name: 'Illustrator', color: 'text-orange-400', dataTip: 'Beginner' },
    { icon: SiPostman, name: 'Postman', color: 'text-orange-600', dataTip: 'Intermediate' },
    { icon: GrMysql, name: 'Workbench', color: 'text-blue-600', dataTip: 'Intermediate' },
    { icon: SiMongodb, name: 'Compass', color: 'text-green-400', dataTip: 'Intermediate' },
    { icon: FaSpotify, name: 'Music :)', color: 'text-green-600', dataTip: 'Advanced ;)' },
];

const ClientAbout = () => {
    const educationData = useEducationData();
    const experienceData = useExperienceData();
    const [isLoading, setIsLoading] = useState(true);
    const [showcaseRef, showcaseInView] = useInView({ triggerOnce: false, threshold: 0.1 });

    useEffect(() => {
        setIsLoading(!educationData.length && !experienceData.length);
    }, [educationData, experienceData]);

    return (
        <>
            <div className='flex md:flex-row flex-col justify-center p-5 px-2 lg:px-20 md:mb-0 mt-44 mb-5 overflow-hidden'>
                {/* Education */}
                <AnimatePresence>
                    <div
                        className='flex flex-col mx-auto w-full cursor-default'>
                        <motion.h1
                            initial={{ y: '50%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '50%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                            className='flex justify-center text-4xl md:text-5xl font-bold mb-4 text-gray-50 hover:text-primary hover:ease-in-out hover:duration-300'>Education</motion.h1>
                        <motion.ul
                            initial={{ x: '-40%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-40%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                            className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                            {isLoading && (
                                <>
                                    <AboutSkeleton />
                                </>
                            )}
                            {educationData.slice(0).reverse().map((education, index) => (
                                <motion.li
                                    className='hover:text-accent'
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0, 0.71, 0.2, 1.01],
                                        scale: {
                                            type: "spring",
                                            damping: 9,
                                            stiffness: 100,
                                            restDelta: 0.001
                                        }
                                    }}
                                >
                                    <div className="timeline-middle text-accent -my-[0.519rem]">
                                        <BsFillPatchCheckFill size={24} />
                                    </div>
                                    <div
                                        className={`timeline-${index % 2 === 0 ? 'start' : 'end'} mb-10 hover:scale-105  ${index % 2 === 0 ? 'md:hover:-translate-x-4 hover:translate-x-4 md:text-end' : ' hover:translate-x-4 md:text-start'} ease-in-out duration-300`}
                                    >
                                        <time className="font-mono italic">{education.year}</time>
                                        <div className="text-xl font-bold text-gray-200">{education.university}</div>
                                        <p>{education.major}</p>
                                        <p>{education.degree}</p>
                                    </div>
                                    <hr className='bg-accent' />
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </AnimatePresence>

                {/* Divider */}
                <AnimatePresence>
                    <motion.div
                        initial={{ y: '40%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '40%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className='divider divider-vertical md:divider-horizontal' />
                </AnimatePresence>

                {/* Experience */}
                <AnimatePresence>
                    <div
                        className='flex flex-col mx-auto w-full cursor-default'>
                        <motion.h1
                            initial={{ y: '50%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '50%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                            className='flex justify-center text-4xl md:text-5xl font-bold mb-4 text-gray-50 hover:text-primary  hover:ease-in-out hover:duration-300'>Experience</motion.h1>
                        <motion.ul
                            initial={{ x: '40%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '40%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                            className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                            {isLoading && (
                                <>
                                    <AboutSkeleton />
                                </>
                            )}
                            {experienceData.slice(0).reverse().map((experience, index) => (
                                <motion.li
                                    className='hover:text-success'
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0, 0.71, 0.2, 1.01],
                                        scale: {
                                            type: "spring",
                                            damping: 9,
                                            stiffness: 100,
                                            restDelta: 0.001
                                        }
                                    }}
                                >
                                    <div className="timeline-middle text-success -my-[0.519rem]">
                                        <BsFillPatchCheckFill size={24} />
                                    </div>
                                    <div
                                        className={`timeline-${index % 2 === 0 ? 'start' : 'end'} mb-10 hover:scale-105  ${index % 2 === 0 ? 'sm:hover:-translate-x-4 hover:translate-x-4 md:text-end' : 'hover:translate-x-4 md:text-start'} ease-in-out duration-300`}
                                    >
                                        <time className="font-mono italic">{experience.year}</time>
                                        <div className="text-xl font-bold text-gray-50">{experience.role}</div>
                                        <p>{experience.company}</p>
                                        <p>{experience.workType}</p>
                                        <p>{experience.workSummary}</p>
                                    </div>
                                    <hr className='bg-success' />
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </AnimatePresence>
            </div>

            {/* 2nd Content */}
            {isLoading ? (
                null
            ) : (
                <>
                    {/* Divider */}
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: '-50%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-50%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                            className='divider max-w-xs mx-auto my-10 mt-20' />
                    </AnimatePresence>

                    {/* Heading skill & devtools */}
                    <AnimatePresence>
                        <motion.div

                            initial={{ y: '50%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '50%', opacity: 0 }}
                            transition={{ type: 'spring', duration: 1, bounce: 0.3, }}
                            className='text-4xl md:text-5xl px-10 mb-16 mx-auto max-w-5xl'>
                            <h1 className='text-gray-50 hover:text-primary hover:ease-in-out hover:duration-300 text-right sm:text-center text-pretty font-semibold cursor-default leading-[1.1]'>
                                This is just a <span className='text-warning'>glimpse</span> of my <span className='text-success '>skills</span> and <span className='text-success'>development tools.</span> <br /> They extend far <span className='text-warning'>beyond</span> what's shown <span className='text-warning'>below,</span> and I'm always eager to learn <span className='text-warning'>new </span>stuff!
                            </h1>
                        </motion.div>
                    </AnimatePresence>

                    {/* Showace skill & devtools */}
                    <div className='flex flex-col md:flex-col lg:flex-row sm:flex-col justify-center px-5 md:px-20 mb-20 gap-10 md:gap-20 overflow-hidden'>
                        {/* Skills */}
                        <AnimatePresence>
                            <motion.div
                                ref={showcaseRef}
                                initial={{ x: '40%', opacity: 0 }}
                                animate={showcaseInView ? { x: 0, opacity: 1 } : {}}
                                exit={{ x: '40%', opacity: 0 }}
                                transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                                className=" mockup-browser border-2 bg-neutral-950 mx-auto w-full border-dashed border-warning">
                                <div className='text-center text-3xl font-bold py-4 -mb-6 cursor-default hover:text-gray-50  ease-in-out duration-300'>
                                    Skills!
                                </div>
                                <div className='divider -mb-2' />
                                <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 bg-black p-6 h-full gap-x-2 gap-y-2 md:gap-y-2 w-full lg:pb-16">
                                    {skillsData.map((skill, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col items-center ${skill.color} ${skill.hoverColor ? skill.hoverColor : 'hover:text-gray-50'} tooltip tooltip-accent`}
                                            data-tip="Intermediate"
                                        >
                                            <skill.icon size={50} className="hover:scale-105 ease-in-out duration-200 cursor-pointer" />
                                            <p className="text-gray-400">{skill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        {/* DevTools */}
                        <AnimatePresence>
                            <motion.div
                                ref={showcaseRef}
                                initial={{ x: '-40%', opacity: 0 }}
                                animate={showcaseInView ? { x: 0, opacity: 1 } : {}}
                                exit={{ x: '-40%', opacity: 0 }}
                                transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                                className="mockup-browser border-2 bg-neutral-950 mx-auto w-full border-dashed border-warning">
                                <div className='text-center text-3xl font-bold py-4 -mb-6 cursor-default hover:text-gray-50  ease-in-out duration-300'>
                                    DevTools!
                                </div>
                                <div className='divider -mb-2' />
                                <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 bg-black p-6 h-full gap-x-2 gap-y-2 md:gap-y-0 w-full lg:pb-16">
                                    {toolsData.map((tool, index) => (
                                        <div key={index} className={`flex flex-col items-center ${tool.color} ${tool.hoverColor ? tool.hoverColor : 'hover:text-gray-50'} tooltip tooltip-success`} data-tip={tool.dataTip}>
                                            <tool.icon size={50} className="hover:scale-105 ease-in-out duration-200 w-fit cursor-pointer" />
                                            <p className="text-gray-400">{tool.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            )}

        </>
    )
}

export default ClientAbout