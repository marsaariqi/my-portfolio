import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
interface Contacts {
	_id: string;
	name: string;
	email: string;
	phone: string;
	message: string;
	createdAt: Date;
}

const getContactsData = () => {
	const [contactData, setContactData] = useState<Contacts[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/contact`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${apiKey}`,
					},
				});
				if (res.ok) {
					const data = await res.json();
					const contactsWithCreateDate = data.contact.map(
						(contact: Contacts) => ({
							...contact,
							createDate: new Date(contact.createdAt),
						})
					);
					setContactData(contactsWithCreateDate);
				} else {
					throw new Error("Failed to fetch education data");
				}
			} catch (error) {
				console.error("Error fetching education data:", error);
			}
		};
		fetchData();
	}, []);

	return contactData;
};

export { getContactsData };
