import {
    Dispatch,
    Ref,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";

type TypeOut = {
    ref: Ref<HTMLDivElement>;
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
};

type Props = {
    initialIsVisible: boolean;
    buttonRef?: RefObject<HTMLDivElement>;
    externalState?: boolean;
    setExternalState?: Dispatch<SetStateAction<boolean>>;
};

export const useOutside = ({
    setExternalState,
    initialIsVisible,
    externalState,
    buttonRef,
}: Props): TypeOut => {
    const [isShow, setIsShow] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current) {
            return null;
        }

        if (!ref.current.contains(event.target as HTMLElement)) {
            externalState ? setExternalState?.(false) : setIsShow(false);
        }

        if (buttonRef?.current?.contains(event.target as HTMLElement)) {
            event.stopPropagation();
        }

        return null;
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });
    return {
        ref,
        isShow,
        setIsShow,
    };
};
