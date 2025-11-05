import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const apiKey = process.env.NEXT_PUBLIC_API_KEY;
interface Education {
  _id: string;
  university: string;
  year: string;
  major: string;
  degree: string;
}

interface Experience {
  _id: string;
  role: string;
  year: string;
  company: string;
  workType: string;
  workSummary: string;
}

const useEducationData = () => {
  const [educationData, setEducationData] = useState<Education[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/education`, {
          method: "GET",
          headers: {},
        });
        if (res.ok) {
          const data = await res.json();
          setEducationData(data.education);
        } else {
          throw new Error("Failed to fetch education data");
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchData();
  }, []);

  return educationData;
};

const useExperienceData = () => {
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/experience`, {
          method: "GET",
          headers: {},
        });
        if (res.ok) {
          const data = await res.json();
          setExperienceData(data.experience);
        } else {
          throw new Error("Failed to fetch experience data");
        }
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    };
    fetchData();
  }, []);

  return experienceData;
};

export { useEducationData, useExperienceData };
