import { IoAlertCircleOutline } from "react-icons/io5";

interface AlertSubmitProps {
    message: string;
    progress: number;
}

const AlertSubmit: React.FC<AlertSubmitProps> = ({ message, progress }) => {
    return (
        <>
            <div>
                <div role="alert" className="alert alert-error mb-2">
                    <IoAlertCircleOutline size={24} />
                    <span>{message}</span>
                </div>
                <div className="-mt-3">
                    <progress className="progress progress-error w-full" value={`${progress}`} max="50"></progress>
                </div>
            </div>
        </>
    )
}

export default AlertSubmit