const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
async function getResumeData() {
	try {
		const response = await fetch(`${baseUrl}/api/resume`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Error fetching resume data:", error);
		throw new Error("Failed to fetch resume data");
	}
}

export { getResumeData };
