import {v4 as uuidv4} from "uuid";
import {useRef, useState} from "react";

const useToast = () => {
    const [, setToastRerender] = useState(false);
    const toasts = useRef([]);

    const deleteToast = (id) => {
        toasts.current = toasts.current.filter((toast) => {
            return toast.id !== id;
        });
        setToastRerender(prev => !prev);
    }

    const addToast = (toast) => {
        const id = uuidv4();
        const toastWithId = {
            ...toast,
            id
        };
        toasts.current = [...toasts.current, toastWithId];
        setToastRerender(prev => !prev);

        setTimeout(() => {
            deleteToast(id);
        }, 5000);
    }

    return [
        toasts.current,
        addToast,
        deleteToast
    ];
};

export default useToast;