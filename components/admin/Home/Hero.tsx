"use client"
import AlertSubmit from "@/components/AlertSubmit";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import connectMongoDB from "@/libs/mongodb";
import ToastAlert from "@/components/ToastAlert";
import { getDataHeading, getDataStats } from "@/services/HomeData";
import { UploadDropzone } from "@/utils/uploadthing";
import { getResumeData } from "@/services/ResumeData";
import Link from "next/link";


interface UploadThingResponse {
    name: string;
    url: string;
}

const AwHome: React.FC = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [prevTitle, setPrevTitle] = useState("");
    const [prevSummary, setPrevSummary] = useState("");
    const [favFont, setFavFont] = useState("");
    const [totalProject, setTotalProject] = useState("");
    const [workYears, setWorkYears] = useState("");
    const [prevFavFont, setPrevFavFont] = useState("");
    const [prevTotalProject, setPrevTotalProject] = useState("");
    const [prevWorkYears, setPrevWorkYears] = useState("");
    const [showHomeAlert, setShowHomeAlert] = useState(false);
    const [showCvAlert, setShowCvAlert] = useState(false);
    const [showStatAlert, setShowStatAlert] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [progress, setProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [downloadCV, setDownloadCV] = useState("")
    const [resumeName, setResumeName] = useState("")

    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!title || !summary || !title.trim() || !summary.trim()) {
            setShowHomeAlert(true);
            setTimeout(() => {
                setShowHomeAlert(false);
            }, 4000);
            setProgress(50);
            return;
        }

        try {
            setSubmitting(true);
            await connectMongoDB();
            const res = await fetch(`${baseUrl}/api/home`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ title, summary }),
                cache: "no-store",
            });

            if (res.ok) {
                setTitle(title);
                setSummary(summary);
                setShowToast(true);
                window.location.reload();
            } else {
                throw new Error("Failed to create Heading");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 1500);
        }
    };

    const handleStatSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!favFont.trim() || !totalProject.trim() || !workYears.trim()) {
            setShowStatAlert(true);
            setTimeout(() => {
                setShowStatAlert(false);
            }, 4000);
            setProgress(50);
            return;
        }
        try {
            setSubmitting(true);
            await connectMongoDB();
            const res = await fetch(`${baseUrl}/api/stats`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ favFont, totalProject, workYears }),
                cache: "no-store",
            });

            if (res.ok) {
                setFavFont(favFont);
                setTotalProject(totalProject);
                setWorkYears(workYears);
                setShowToast(true);
                window.location.reload();
            } else {
                throw new Error("Failed to update Stats!");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 1500);
        }
    }

    const handleCVSubmit = async (data: UploadThingResponse[]) => {
        try {

            await connectMongoDB();
            const name = data[0].name;
            const resumeUrl = data[0].url;
            const requestData = { name, resumeUrl };
            const res = await fetch(`${baseUrl}/api/resume`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(requestData),
                cache: "no-store",
            });

            if (res.ok) {
                setShowToast(true);
                router.refresh();
            } else {
                throw new Error("Failed to update Resume!");
            }

            const response = await fetch('/api/uploadthing', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ url: downloadCV })
            });

            if (!response.ok) {
                throw new Error('Failed to delete project image');
            }

            window.location.reload();
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false);
        }
    };

    function handleInputNumber(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        event.target.value = numericValue;
    }

    const handleCloseToast = () => {
        setShowToast(false);
    };

    useEffect(() => {
        let animationId: number;

        const animateProgress = (startTime: number) => {
            const now = Date.now();
            const deltaTime = now - startTime;
            const decrementAmount = deltaTime * 0.025;
            const newProgress = Math.max(progress - decrementAmount, 0);
            setProgress(newProgress);

            if (newProgress > 0) {
                animationId = requestAnimationFrame(() => animateProgress(now));
            }
        };

        if (showCvAlert || showHomeAlert || showStatAlert) {
            animationId = requestAnimationFrame(() => animateProgress(Date.now()));
        }

        return () => cancelAnimationFrame(animationId);
    }, [{ setShowCvAlert, setShowHomeAlert, setShowStatAlert }, progress]);


    const fetchDataAndSetState = async () => {
        try {
            const { home } = await getDataHeading();
            const { stats } = await getDataStats();
            const { resume } = await getResumeData();
            if (home || stats || resume) {
                setResumeName(resume[0].name);
                setDownloadCV(resume[0].resumeUrl);
                setPrevTitle(home[0].title);
                setPrevSummary(home[0].summary);
                setPrevFavFont(stats[0].favFont);
                setPrevTotalProject(stats[0].totalProject);
                setPrevWorkYears(stats[0].workYears);
                setTitle(home[0].title);
                setSummary(home[0].summary);
                setFavFont(stats[0].favFont);
                setTotalProject(stats[0].totalProject);
                setWorkYears(stats[0].workYears);
            }
        } catch (error) {
            console.error("Error setting state:", error);
        }
    };

    useEffect(() => {
        fetchDataAndSetState();
    }, []);



    return (
        <>
            <div className="flex gap-5 flex-col md:flex-col sm:flex-col lg:flex-row mt-44">
                <div className="flex flex-col gap-4 mb-10">
                    <div className="mockup-browser border bg-base-300">
                        <div className="mockup-browser-toolbar">
                            <div className="input">.home</div>
                        </div>
                        <div className="flex flex-col px-6 py-2 bg-base-200 gap-2">
                            <h1 className="text-2xl font-bold -mb-5 text-center">Update Home Title and Summary here!</h1>
                            <div className="divider"></div>
                            <form onSubmit={handleSubmit} action="/awbibib" className="">
                                <label className="form-control w-full -mt-5">
                                    <div className="label">
                                        <span className="label-text">Home Title here!</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="input input-bordered"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                setTitle(prevT => prevT + '\n');
                                            }
                                        }}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Home Summary here!</span>
                                    </div>
                                    <textarea
                                        className="textarea textarea-bordered" rows={5}
                                        placeholder="Summary"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)} />
                                </label>
                                <button type="submit" className="btn btn-outline btn-accent w-full mt-5 mb-2" disabled={submitting}>Submit</button>
                            </form>
                            {showToast && (
                                <ToastAlert message="Data Submitted!" type="success" onClose={handleCloseToast} />
                            )}

                            {showHomeAlert && (
                                <AlertSubmit message="All fields are required." progress={progress} />
                            )}

                        </div>
                    </div>
                    <div className="mockup-browser border bg-base-300">
                        <div className="mockup-browser-toolbar">
                            <div className="input">.home</div>
                        </div>
                        <div className="flex flex-col px-6 py-2 bg-base-200 gap-2">
                            <h1 className="text-2xl font-bold -mb-5 text-center">Update Stats!</h1>
                            <div className="divider"></div>
                            <form onSubmit={handleStatSubmit} action="/awbibib" className="">
                                <label className="form-control w-full -mt-5">
                                    <div className="label">
                                        <span className="label-text">Fav Font!</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Fav Font"
                                        className="input input-bordered"
                                        value={favFont}
                                        onChange={(e) => setFavFont(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Total Projects!</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Total Projects"
                                        className="input input-bordered"
                                        value={totalProject}
                                        onChange={(e) => setTotalProject(e.target.value)}
                                        onInput={handleInputNumber}
                                    />
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">Work years!</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Work years"
                                        className="input input-bordered"
                                        value={workYears}
                                        onChange={(e) => setWorkYears(e.target.value)}
                                        onInput={handleInputNumber}
                                    />
                                </label>
                                <button type="submit" className="btn btn-outline btn-accent w-full mt-5 mb-2" disabled={submitting}>Submit</button>
                            </form>
                            {showStatAlert && (
                                <AlertSubmit message="All fields are required." progress={progress} />
                            )}

                        </div>
                    </div>
                    <div className="mockup-window border bg-base-300 mb-5">
                        <div className="flex flex-col px-4 py-4 bg-base-200">
                            <h1 className="text-2xl font-bold mt-2 text-center">Update Resume file here!</h1>
                            <div className="divider"></div>
                            <UploadDropzone
                                className="ut-label:text-xl ut-button:btn-lg ut-button:w-full"
                                endpoint="pdfUploader"
                                onClientUploadComplete={(res: any) => {
                                    handleCVSubmit(res);
                                    console.log("Files: ", res);
                                    alert("Upload Completed");
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                            {showCvAlert && (
                                <AlertSubmit message="File are required." progress={progress} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full mb-10">
                    <div className="mockup-code h-fit ">
                        <h1 className="px-5 text-lg font-semibold">Title</h1>
                        <pre><code>{prevTitle}</code></pre>
                    </div>
                    <div className="mockup-code h-fit">
                        <h1 className="px-5 text-lg font-semibold">Summary</h1>
                        <div className="ml-5">
                            <pre className="text-pretty"><code>{prevSummary}</code></pre>
                        </div>
                    </div>
                    <div className="mockup-code h-fit ">
                        <h1 className="px-5 text-lg font-semibold">Stats!</h1>
                        <pre data-prefix="$"><code>{prevFavFont}</code></pre>
                        <pre data-prefix="$"><code>{prevTotalProject}</code></pre>
                        <pre data-prefix="$"><code>{prevWorkYears}</code></pre>
                    </div>
                    <div className="mockup-code h-fit sm:mb-10">
                        <h1 className="px-5 text-lg font-semibold">Resume File</h1>
                        <pre><code>{resumeName}</code></pre>
                        <div className="text-center">
                            <Link
                                href={downloadCV} download="Marsa Ariqi Gustiandza - Resume.pdf"
                                target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline btn-accent w-3/4 mt-5">
                                Download CV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AwHome