import { getContactsData } from "@/services/ContactsData"


const AwContact = () => {
    const contactData = getContactsData();

    return (
        <>
            <div className="flex flex-col gap-4 mt-44 w-full mb-10 justify-center">
                {contactData.toReversed().map((c) => {
                    const createdAtDate = new Date(c.createdAt);
                    const day = createdAtDate.getDate();
                    const monthAbbreviation = createdAtDate.toLocaleString('en-us', { month: 'long' });
                    const year = createdAtDate.getFullYear();
                    const date = `${day} ${monthAbbreviation} ${year}`;
                    return (
                        <div key={c._id} className="mockup-window border border-gray-500 w-full  mx-auto xl:mx-0 xl:mr-auto max-w-3xl">
                            <div className="flex justify-start px-4 py-5 border-t border-base-300 flex-col">
                                <div className="text-primary text-xl mx-2">
                                    {date}
                                </div>
                                <div className="label -mb-2">
                                    <span className="label-text">Name</span>
                                </div>
                                <div className="text-warning text-xl mx-5">
                                    {c.name}
                                </div>
                                <div className="label -mb-2">
                                    <span className="label-text">Email</span>
                                </div>
                                <div className="text-warning text-xl mx-5">
                                    {c.email}
                                </div>
                                <div className="label -mb-2">
                                    <span className="label-text">Phone</span>
                                </div>
                                <div className={` text-xl mx-5 ${c.phone ? 'text-success' : 'text-error'}`}>
                                    {c.phone ? c.phone : 'none'}
                                </div>
                                <div className="label -mb-2">
                                    <span className="label-text">Message</span>
                                </div>
                                <div className="text-warning text-xl mx-5">
                                    {c.message}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <span className="mb-10"></span>
            </div>
        </>
    )
}

export default AwContact