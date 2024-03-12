const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getResumeData() {
    try {
        const response = await fetch(`${baseUrl}/api/resume`, {
            method: "GET",
        });

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error fetching resume data:", error);
        throw new Error("Failed to fetch resume data");
    }
}

export { getResumeData };