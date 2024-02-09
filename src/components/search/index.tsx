import React, { forwardRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useOutside } from "@/hooks/useOutside.ts";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { List } from "@/components/list";
import { useGetAddressesQuery } from "@/store/api/address.ts";
import { Address } from "@/types.ts";

type Props = TextFieldProps & {
    handleItemListener: (data: Address, value: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Search: React.FC<Props> = forwardRef((props, _ref) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const { data } = useGetAddressesQuery(searchValue);
    const { isShow, setIsShow, ref } = useOutside({
        initialIsVisible: false,
    });

    const addresses = data?.suggestions;

    const { handleItemListener, ...rst } = props;

    const handleClick = (value: string, { data }: { data: Address }) => {
        setSearchValue(value);
        setIsShow(false);
        handleItemListener(data, value);
    };

    const onSearch = (input: string) => {
        setIsShow(true);
        setSearchValue(input);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchValue(searchValue);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchValue]);

    return (
        <div ref={ref}>
            <TextField
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

Search.displayName = "Search";
