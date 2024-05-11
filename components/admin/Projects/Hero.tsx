"use client"
import AlertSubmit from "@/components/AlertSubmit";
import { getProjectData } from "@/services/ProjectData";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";

const AwProjects = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [github, setGithub] = useState("");
    const [link, setLink] = useState("");
    const [imageUrl, setImageUrl] = useState("")

    const { projectData } = getProjectData();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_AWBIBIB;

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim() || !github.trim() || !link.trim() || !imageUrl.trim()) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            setProgress(50);
            return;
        } try {
            const formData = { title, desc, githubLink: github, projectLink: link, image: imageUrl };
            const res = await fetch(`${baseUrl}/api/project`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setTitle("");
                setDesc("");
                setGithub("");
                setLink("");
                setImageUrl("");

                window.location.reload();
                // router.refresh();
            } else {
                throw new Error("Failed to submit education data");
            }
        } catch (error) {
            console.error("Error submitting education data:", error);
        }
    }

    const handleProjectDelete = async (id: string, image: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this project entry?');
        if (!confirmDelete) {
            return;
        }
        try {
            const res = await fetch(`${baseUrl}/api/project?id=${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }
            });
            if (!res.ok) {
                throw new Error('Failed to delete project entry');
            }

            const response = await fetch('/api/uploadthing', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: image })
            });
            if (!response.ok) {
                throw new Error('Failed to delete project image');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    async function deleteImage(url: string) {
        try {
            const response = await fetch('/api/uploadthing', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ url: url })
            });

            if (!response.ok) {
                throw new Error('Failed to delete file');
            }

            const data = await response.json();
            console.log(data.message);
            setImageUrl("");
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }


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

        if (showAlert) {
            animationId = requestAnimationFrame(() => animateProgress(Date.now()));
        }

        return () => cancelAnimationFrame(animationId);
    }, [showAlert, progress]);


    return (
        <>
            <div className="flex gap-5 flex-col md:flex-col sm:flex-col lg:flex-row mt-44">
                <div className="flex flex-col gap-4 mb-10">
                    <div className="mockup-browser border bg-base-300">
                        <div className="mockup-browser-toolbar">
                            <div className="input">.myProjects</div>
                        </div>
                        <div className="flex flex-col px-6 py-2 bg-base-200 gap-2">
                            <h1 className="text-2xl font-bold -mb-5 text-center">Add Project</h1>
                            <div className="divider"></div>
                            <form onSubmit={handleSubmit} action="/awbibib" className="">
                                <label className="form-control w-full -mt-5">
                                    <div className="label">
                                        <span className="label-text">Title</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="input input-bordered"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Description</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="input input-bordered"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">GitHub Link</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="GitHub"
                                        className="input input-bordered"
                                        value={github}
                                        onChange={(e) => setGithub(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Project Link</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Project Link"
                                        className="input input-bordered"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </label>
                                <div className="divider"></div>
                                <span className="label-text text-lg font-semibold">Project Preview</span>

                                <label className="form-control w-max my-2 rounded-xl p-4">
                                    {imageUrl ? (
                                        <div className="p-2 mx-auto">
                                            <Image src={imageUrl} width={400} height={500}
                                                alt='project preview'>
                                            </Image>
                                        </div>
                                    ) :
                                        <UploadButton
                                            endpoint="imageUploader"
                                            appearance={{
                                                button:
                                                    "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 text-lg",
                                                container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                                                allowedContent:
                                                    "flex h-8 flex-col text-sm items-center justify-center px-2 text-white",
                                            }}

                                            onClientUploadComplete={(res: any) => {
                                                setImageUrl(res[0].url);
                                            }}
                                            onUploadError={(error: Error) => {
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    }{imageUrl && (
                                        <button type='reset' className="btn btn-outline btn-primary w-2/4 mx-auto my-3"
                                            onClick={() => deleteImage(imageUrl)}
                                        >
                                            Change Image
                                        </button>
                                    )}
                                </label>

                                <button type="submit" className="btn btn-outline btn-accent w-full mt-5 mb-2">Submit</button>
                            </form>
                            {showAlert && (
                                <AlertSubmit message="All fields are required." progress={progress} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid xl:grid-cols-1 2xl:grid-cols-2 gap-5 w-full mb-10">
                    {projectData.map((prj) => (
                        <div key={prj._id} className="mockup-code h-fit ">
                            <h1 className="px-5 text-lg font-semibold">{prj.title}</h1>
                            <div className="">
                                <p className="text-balance mx-5">{prj.desc}</p>
                                <pre data-prefix="$"><code><a href={prj.githubLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-gray-50">{prj.githubLink.includes('https://www.') || prj.githubLink.includes('http://www.') ? prj.githubLink.replace('https://www.', '').replace('http://www.', '') : (prj.githubLink.includes('https://') || prj.githubLink.includes('http://') ? prj.githubLink.replace('https://', '').replace('http://', '') : prj.githubLink)}</a></code></pre>
                                <pre data-prefix="$"><code><a href={prj.projectLink}
                                    target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-gray-50">{prj.projectLink.includes('https://www.') || prj.projectLink.includes('http://www.') ? prj.projectLink.replace('https://www.', '').replace('http://www.', '') : (prj.projectLink.includes('https://') || prj.projectLink.includes('http://') ? prj.projectLink.replace('https://', '').replace('http://', '') : prj.projectLink)}</a></code></pre>
                            </div>
                            <div className="text-center mt-5">
                                <button className="btn btn-outline btn-error "
                                    onClick={() => handleProjectDelete(prj._id, prj.image)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AwProjects