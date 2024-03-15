const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface LoginForm {
	username: string;
	password: string;
}

const awbibib = async (formData: LoginForm) => {
	try {
		const response = await fetch(`${baseUrl}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching Awbibib data:", error);
		throw error;
	}
};

export { awbibib };
