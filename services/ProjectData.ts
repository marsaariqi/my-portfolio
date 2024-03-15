import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
export type Project = {
	_id: string;
	title: string;
	desc: string;
	githubLink: string;
	projectLink: string;
	image: string;
};

const getProjectData = () => {
	const [projectData, setProjectData] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/project`, {
					headers: {
						Authorization: `Bearer ${apiKey}`,
					},
				});
				if (res.ok) {
					const data = await res.json();
					setProjectData(data.project);
				} else {
					throw new Error("Failed to fetch project data");
				}
			} catch (error) {
				console.error("Error fetching project data:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return { projectData, isLoading };
};

export { getProjectData };
