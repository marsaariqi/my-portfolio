"use client"

import { awbibib } from "@/services/AwbibibData";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";


interface LoginAwbibibProps {
    setAuthAwbibib: React.Dispatch<React.SetStateAction<boolean>>;
}


const LoginAwbibib: React.FC<LoginAwbibibProps> = ({ setAuthAwbibib }) => { // Accept setAuthAwbibib as a prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await awbibib({ username, password });
            if (response?.success) {
                console.log('Login successful');
                setAuthAwbibib(true);
                sessionStorage.setItem("authAwbibib", JSON.stringify(true));
            } else {
                setError(response.message || 'Failed to authenticate');
            }
        } catch (e) {
            console.error('Login error:', e);
            setError('An error occurred during login');
        }
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ y: '-50%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-50%', opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                    className='flex justify-center items-center  h-[80dvh] w-full p-2 mt-40'>
                    <div className="mockup-browser border border-base-300 p-2">
                        <div className="mockup-browser-toolbar">
                            <a href="/" className="input border border-base-300 hover:text-gray-50">https://marsaariqi.my.id</a>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mockup-code m-5 text-xl w-fit mx-auto">
                                <pre data-prefix="$" className='text-warning mb-2'>
                                    <input type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="username" className="input input-ghost w-fit max-w-xs text-xl" />
                                </pre>
                                <pre data-prefix="$" className='text-success'>
                                    <input type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password" className="input input-ghost w-fit max-w-xs text-xl" />
                                </pre>

                                <div className='text-center mx-5 mt-5'>
                                    <button
                                        type="submit"
                                        className='btn btn-outline w-full'>login :3</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-red-400">
                            {error &&
                                <AnimatePresence>

                                    <motion.div
                                        initial={{ y: '-50%', opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: '-50%', opacity: 0 }}
                                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                                        className="border rounded-2xl w-fit px-6 py-1 mx-auto border-red-400">
                                        <p>
                                            {error}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default LoginAwbibib;
