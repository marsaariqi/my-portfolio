const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Define the type for the form data
interface LoginForm {
  username: string;
  password: string;
}

const awbibib = async (formData: LoginForm) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Network response was not ok");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Awbibib data:", error);
    throw error;
  }
};

export { awbibib };
