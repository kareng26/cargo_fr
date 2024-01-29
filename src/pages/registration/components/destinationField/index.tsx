import React, { forwardRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { getAddresses } from "../../api.ts";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { useOutside } from "@/hooks/useOutside.ts";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { List } from "@/components/list";
import { useAppSelector } from "@/hooks/useAppSelector.ts";

type Props = TextFieldProps & {
    handleItemListener: (hint: any) => void;
};

export const DestinationField: React.FC<Props> = forwardRef((props, _ref) => {
    const { addresses } = useAppSelector((state) => state.addresses);
    const [searchValue, setSearchValue] = useState<string>("");
    const { isShow, setIsShow, ref } = useOutside({
        initialIsVisible: false,
    });

    const { handleItemListener, ...rst } = props;

    const dispatch = useAppDispatch();

    const handleClick = (value: string, hint: any) => {
        setSearchValue(value);
        setIsShow(false);
        handleItemListener(hint);
    };

    const onSearch = (input: string) => {
        setIsShow(true);
        setSearchValue(input);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getAddresses(searchValue ?? ""));
        }, 200);

        return () => clearTimeout(timer);
    }, [searchValue]);

    return (
        <div ref={ref}>
            <TextField
                label={"destination point"}
                {...rst}
                value={searchValue}
                onChange={(event) => onSearch(event.target.value)}
            />

            {isShow && !!addresses?.length && (
                <List
                    keyValue={"value"}
                    hintValue={"value"}
                    data={addresses}
                    handleClick={handleClick}
                />
            )}
        </div>
    );
});

DestinationField.displayName = "Search";
