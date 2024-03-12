import { BsFillPatchCheckFill } from "react-icons/bs";


const AboutSkeleton = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                    <div className="timeline-middle text-base-100 ">
                        <BsFillPatchCheckFill size={24} />
                    </div>
                    <div className="timeline-start md:text-end mb-10 flex flex-col gap-2">
                        <div className="skeleton h-4 w-28 ml-auto" />
                        <div className="skeleton h-4 w-56 ml-auto" />
                        <div className="skeleton h-4 w-56 ml-auto" />
                        <div className="skeleton h-4 w-36 ml-auto" />
                    </div>
                    <hr className="bg-base-200" />
                </li>
                <li>
                    <div className="timeline-middle text-base-100 -mt-[0.519rem]">
                        <BsFillPatchCheckFill size={24} />
                    </div>
                    <div className="timeline-end md:text-end mb-10 flex flex-col gap-2">
                        <div className="skeleton h-4 w-28 mr-auto" />
                        <div className="skeleton h-4 w-56 mr-auto" />
                        <div className="skeleton h-4 w-56 mr-auto" />
                        <div className="skeleton h-4 w-36 mr-auto" />
                    </div>
                    <hr className="bg-base-200" />
                </li>
            </ul>
        </div>
    );
};

export default AboutSkeleton