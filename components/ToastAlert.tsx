import React, { useEffect } from 'react'
interface ToastAlertProps {
    message: string;
    type: string;
    onClose: () => void;
}
const ToastAlert: React.FC<ToastAlertProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);
    return (
        <>
            <div className="toast toast-top toast-center z-[30] toast-fade-out">
                <div className={`alert alert-${type}`}>
                    <span>{message}</span>
                </div>
            </div>
            <style jsx>{`
    .toast {
        animation: fadeInOut 4s ease-out forwards;
    }

    @keyframes fadeInOut {
        0% {
            opacity: 1; 
        }
        90% {
            opacity: 1; 
        }
        100% {
            opacity: 0; 
            visibility: hidden;
        }
    }
`}</style>
        </>
    )
}

export default ToastAlert