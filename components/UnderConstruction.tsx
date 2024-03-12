
const UnderConstruction = () => {
    return (
        <>
            <div className="toast toast-top toast-end px-32 z-[100]">
                <div className="alert alert-success -mt-16 flex pt-11 font-semibold cursor-cell">
                    <span className="">Still under construction.</span>
                    <span className="loading loading-ring loading-md"></span>
                </div>
            </div>
        </>
    )
}

export default UnderConstruction