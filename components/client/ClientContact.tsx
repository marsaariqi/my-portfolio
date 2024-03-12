"use client"
import connectMongoDB from "@/libs/mongodb";
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { BiMessageDetail } from "react-icons/bi"
import ToastAlert from "../ToastAlert";


const ClientContact = () => {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const [submitting, setSubmitting] = useState(false);
    const [showToastAlert, setShowToastAlert] = useState(false);
    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });



    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setShowToastAlert(true);
            return;
        }
        try {
            setSubmitting(true);
            const res = await fetch(`${baseUrl}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
                cache: "no-store",
            });

            if (res.ok) {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
                setShowToastSuccess(true);
                console.log('data sent')
                router.refresh();
            } else {
                throw new Error("Failed to create Heading");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        }
    }

    function handleInputPhone(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/[^\d+]/g, '');
        event.target.value = numericValue;
    }

    const handleCloseToast = () => {
        setShowToastAlert(false);
        setShowToastSuccess(false);
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-48 overflow-clip">
                {/* Heading */}
                <AnimatePresence>
                    <motion.div
                        initial={{ x: '-40%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-40%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                    >
                        <div className="flex text-5xl gap-5 text-gray-50 font-semibold cursor-default mb-10 px-5 text-center hover:text-accent ease-in-out duration-200">
                            Get<span className="text-warning">in</span>touch!
                        </div>
                        <div className="flex items-center justify-between text-6xl -mt-5">
                            <span className="icon-flip text-warning"><BiMessageDetail /></span>
                            <span className="text-warning"><BiMessageDetail /></span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Form */}
                <AnimatePresence>
                    <motion.div
                        initial={{ x: '20%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '20%', opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.8, bounce: 0.3, }}
                        className="flex justify-center items-center w-full px-5 mb-10"
                    >
                        <div className="mockup-window border-2 border-dashed border-warning bg-black max-w-3xl w-full">
                            <div className="flex justify-center px-10 pb-5 pt-2 bg-black">
                                <form onSubmit={handleSubmit} className="max-w-4xl w-full flex flex-col gap-2 text-neutral-200">
                                    <label className="form-control">
                                        <div className="label">
                                            <span className="label-text text-warning">What should I call you?</span>
                                        </div>
                                        <input type="text"
                                            placeholder="name"
                                            className="input input-bordered w-full max-w-xs bg-black"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            value={formData.name} />
                                    </label>
                                    <label className="form-control w-full max-w-xl ">
                                        <div className="label">
                                            <span className="label-text text-warning">Where can I get back to you?</span>
                                        </div>
                                        <input type="text"
                                            placeholder="email"
                                            className="input input-bordered w-full max-w-xs bg-black "
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            value={formData.email} />
                                    </label>
                                    <label className="form-control w-full max-w-xl ">
                                        <div className="label">
                                            <span className="label-text text-warning">Whatsapp? (optional)</span>
                                        </div>
                                        <input type="text" placeholder="phone number" className="input input-bordered w-full max-w-xs bg-black " onInput={handleInputPhone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            value={formData.phone} />
                                    </label>
                                    <label className="form-control w-full max-w-xl ">
                                        <div className="label">
                                            <span className="label-text text-warning">Say something!</span>
                                        </div>
                                        <textarea
                                            className="textarea textarea-bordered bg-black max-w-sm"
                                            placeholder="warm message"
                                            rows={4}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            value={formData.message}
                                        />
                                    </label>
                                    <button type="submit" disabled={submitting} className="btn btn-warning btn-outline mt-2">
                                        Send!
                                    </button>
                                </form>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
            {showToastAlert && (
                <ToastAlert message="Name, email and message are required." type="error" onClose={handleCloseToast} />
            )}
            {showToastSuccess && (
                <ToastAlert message="Woohoo! Your Message is En Route!" type="success" onClose={handleCloseToast} />
            )}
        </>
    )
}

export default ClientContact