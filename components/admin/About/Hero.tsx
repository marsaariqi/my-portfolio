import AlertSubmit from "@/components/AlertSubmit";
import ToastAlert from "@/components/ToastAlert";
import { FormEventHandler, useEffect, useState } from "react";
import { useEducationData, useExperienceData } from "@/services/AboutEdEx";
import { useRouter } from "next/navigation";

const AwAbout = () => {
    const [university, setUniversity] = useState("");
    const [edYear, setEdYear] = useState("");
    const [major, setMajor] = useState("");
    const [degree, setDegree] = useState("");
    const [role, setRole] = useState("");
    const [exYear, setExYear] = useState("");
    const [company, setCompany] = useState("");
    const [workType, setWorkType] = useState("");
    const [workSumm, setWorkSumm] = useState("")
    const [showEdAlert, setShowEdAlert] = useState(false);
    const [showExAlert, setShowExAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showToastDel, setShowToastDel] = useState(false);

    const educationData = useEducationData();
    const experienceData = useExperienceData();

    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_AWBIBIB;
    const handleEducationSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!university.trim() || !edYear.trim() || !major.trim() || !degree.trim()) {
            setShowEdAlert(true);
            setTimeout(() => {
                setShowEdAlert(false);
            }, 4000);
            setProgress(50);
            return;
        }

        try {
            setSubmitting(true);
            const formData = { university, year: edYear, major, degree };
            const res = await fetch(`${baseUrl}/api/education`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setUniversity("");
                setEdYear("");
                setMajor("");
                setDegree("");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);

                window.location.reload();
                // router.refresh();
            } else {
                throw new Error("Failed to submit education data");
            }
        } catch (error) {
            console.error("Error submitting education data:", error);
        } finally {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 1500);
        }
    };

    const handleExperienceSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!role.trim() || !exYear.trim() || !company.trim() || !workType.trim() || !workSumm.trim()) {
            setShowExAlert(true);
            setTimeout(() => {
                setShowExAlert(false);
            }, 4000);
            setProgress(50);
            return;
        } try {
            setSubmitting(true);
            const formData = { role, year: exYear, workType, company, workSummary: workSumm };
            const res = await fetch(`${baseUrl}/api/experience`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setRole("");
                setExYear("");
                setWorkType("");
                setCompany("");
                setWorkSumm("");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);

                window.location.reload();
                // router.refresh();
            } else {
                throw new Error("Failed to submit education data");
            }
        } catch (error) {
            console.error("Error submitting education data:", error);
        } finally {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 1500);
        }
    }

    const handleEduDelete = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this education entry?');
        if (!confirmDelete) {
            return; // Do nothing if user cancels
        }
        try {
            const res = await fetch(`${baseUrl}/api/education?id=${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }
            });
            if (res.ok) {
                setShowToastDel(true);
                setTimeout(() => {
                    setShowToastDel(false);
                }, 2000);
                window.location.reload();
                // router.refresh();
            } else {
                throw new Error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleExpDelete = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this education entry?');
        if (!confirmDelete) {
            return; // Do nothing if user cancels
        }
        try {
            const res = await fetch(`${baseUrl}/api/experience?id=${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }
            });
            if (res.ok) {
                setShowToastDel(true);
                setTimeout(() => {
                    setShowToastDel(false);
                }, 2000);
                window.location.reload();
                // router.refresh();
            } else {
                throw new Error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
        setShowToastDel(false);
    };

    useEffect(() => {
        let animationId: number;

        const animateProgress = (startTime: number) => {
            const now = Date.now();
            const deltaTime = now - startTime;
            const decrementAmount = deltaTime * 0.025; // Adjust the decrement rate as needed
            const newProgress = Math.max(progress - decrementAmount, 0); // Ensure progress doesn't go below 0
            setProgress(newProgress);

            if (newProgress > 0) {
                animationId = requestAnimationFrame(() => animateProgress(now));
            }
        };

        if (showEdAlert || showExAlert) {
            animationId = requestAnimationFrame(() => animateProgress(Date.now()));
        }

        return () => cancelAnimationFrame(animationId);
    }, [{ showEdAlert, showExAlert }, progress]);


    return (
        <>
            <div className="flex flex-col md:flex-col sm:flex-col lg:flex-row gap-2 mb-52 mt-44">
                {/* Form */}
                <div className="flex flex-col gap-5 mb-10">
                    <div className="mockup-browser border bg-base-300">
                        <div className="mockup-browser-toolbar">
                            <div className="input">.aboutMe</div>
                        </div>
                        <div className="flex flex-col px-6 py-2 bg-base-200 gap-2">
                            <h1 className="text-2xl font-bold -mb-5 text-center">Add Education</h1>
                            <div className="divider"></div>
                            <form onSubmit={handleEducationSubmit} action="/awbibib" className="">
                                <label className="form-control w-full -mt-5">
                                    <div className="label">
                                        <span className="label-text">University</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="University"
                                        className="input input-bordered"
                                        value={university}
                                        onChange={(e) => setUniversity(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Year</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Year"
                                        className="input input-bordered"
                                        value={edYear}
                                        onChange={(e) => setEdYear(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Major</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Major"
                                        className="input input-bordered"
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Degree</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Degree"
                                        className="input input-bordered"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                    />
                                </label>
                                <button type="submit" className="btn btn-outline btn-accent w-full mt-5 mb-2" disabled={submitting}>Submit</button>
                            </form>
                            {showToast && (
                                <ToastAlert message="Data Submitted!" type="success" onClose={handleCloseToast} />
                            )}
                            {showEdAlert && (
                                <AlertSubmit message="All fields are required." progress={progress} />
                            )}
                        </div>
                    </div>
                    <div className="mockup-browser border bg-base-300">
                        <div className="mockup-browser-toolbar">
                            <div className="input">.aboutMe</div>
                        </div>
                        <div className="flex flex-col px-6 py-2 bg-base-200 gap-2">
                            <h1 className="text-2xl font-bold -mb-5 text-center">Add Experience</h1>
                            <div className="divider"></div>
                            <form onSubmit={handleExperienceSubmit} action="/awbibib" className="">
                                <label className="form-control w-full -mt-5">
                                    <div className="label">
                                        <span className="label-text">Role</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        className="input input-bordered"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Year</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Year"
                                        className="input input-bordered"
                                        value={exYear}
                                        onChange={(e) => setExYear(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Work type</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Work type"
                                        className="input input-bordered"
                                        value={workType}
                                        onChange={(e) => setWorkType(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Company</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        className="input input-bordered"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Work Summary</span>
                                    </div>
                                    <textarea
                                        className="textarea textarea-bordered" rows={5}
                                        placeholder="Work Summary"
                                        value={workSumm}
                                        onChange={(e) => setWorkSumm(e.target.value)} />
                                </label>
                                <button type="submit" className="btn btn-outline btn-accent w-full mt-5 mb-2" disabled={submitting}>Submit</button>
                            </form>
                            {showExAlert && (
                                <AlertSubmit message="All fields are required." progress={progress} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl w-full gap-4 flex flex-col mx-auto">
                    {/* Education */}
                    <div className="mockup-browser border bg-base-300 h-fit w-full">
                        <div className="mockup-browser-toolbar">
                            <div className="input">Education</div>
                        </div>
                        <div className="grid grid-cols-1 gap-5 w-full p-5">
                            {educationData.map((edu) => (
                                <div key={edu._id} className="mockup-code h-fit text-lg bg-gray-800">
                                    <pre data-prefix="$"><code>University</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{edu.university}</code></pre>
                                    <pre data-prefix="$"><code>Year</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{edu.year}</code></pre>
                                    <pre data-prefix="$"><code>Major</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{edu.major}</code></pre>
                                    <pre data-prefix="$"><code>Degree</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{edu.degree}</code></pre>
                                    <div className="text-center mt-5">
                                        <button className="btn btn-outline btn-error" onClick={() => handleEduDelete(edu._id)}>Delete</button>
                                    </div>
                                    {showToastDel && (
                                        <div className="text-base">
                                            <ToastAlert message="Entry Deleted!" type="error" onClose={handleCloseToast} />
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Experience */}
                    <div className="mockup-browser border bg-base-300 h-fit mb-10">
                        <div className="mockup-browser-toolbar">
                            <div className="input">Experience</div>
                        </div>
                        <div className="grid grid-cols-1 gap-5 w-full p-5">
                            {experienceData.map((exp) => (
                                <div key={exp._id} className="mockup-code h-fit text-lg">
                                    <pre data-prefix="$"><code>Role</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{exp.role}</code></pre>
                                    <pre data-prefix="$"><code>Year</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{exp.year}</code></pre>
                                    <pre data-prefix="$"><code>Work Type</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{exp.workType}</code></pre>
                                    <pre data-prefix="$"><code>Company</code></pre>
                                    <pre data-prefix=" " className="font-bold"><code >{exp.company}</code></pre>
                                    <p className="mx-5 font-semibold mt-2 underline">Work Summary</p>
                                    <p className="text-pretty px-5 text-base">{exp.workSummary}</p>
                                    <div className="text-center mt-5">
                                        <button className="btn btn-outline btn-error"
                                            onClick={() => handleExpDelete(exp._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AwAbout