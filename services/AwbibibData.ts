// AwbibibData.ts

import { useState, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface AwbibibData {
    success: boolean;
    message: string;
    // Add other properties as needed
}

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
            },
            body: JSON.stringify(formData)
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

export { awbibib }; // Export the awbibib function
