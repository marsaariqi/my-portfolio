

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getDataHeading() {
    try {
        const response = await fetch(`${baseUrl}/api/home`, {
            method: "GET",
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.error("Error fetching heading data:", e);
        throw new Error("Failed to fetch heading data");
    }
}

async function getDataStats() {
    try {
        const response = await fetch(`${baseUrl}/api/stats`, {
            method: "GET",
        });

        const result = await response.json();

        return result;
    } catch (e) {
        console.error("Error fetching stats data:", e);
        throw new Error("Failed to fetch stats data");
    }
}

export { getDataHeading, getDataStats };
