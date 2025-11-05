const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const apiKey = process.env.NEXT_PUBLIC_API_KEY;

async function getDataHeading() {
  try {
    const response = await fetch(`${baseUrl}/api/home`, {
      method: "GET",
      headers: {},
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
      headers: {},
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.error("Error fetching stats data:", e);
    throw new Error("Failed to fetch stats data");
  }
}

export { getDataHeading, getDataStats };
