import React, { forwardRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useOutside } from "../../../../hooks/useOutside.ts";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { useAppSelector } from "../../../../hooks/useAppSelector.ts";
import { getAllPoints } from "../../api.ts";
import { useAppDispatch } from "../../../../hooks/useAppDispatch.ts";
import { List } from "../../../../components/list";

type Props = TextFieldProps & {
    handleItemListener: (hint: any) => void;
};

export const SendField: React.FC<Props> = forwardRef((props, _ref) => {
    const { points } = useAppSelector((state) => state.points);
    const [searchValue, setSearchValue] = useState<string>("");
    const { isShow, setIsShow, ref } = useOutside({
        initialIsVisible: false,
    });

    const dispatch = useAppDispatch();

    const { handleItemListener, ...rst } = props;

    const getPoints = async () => dispatch(getAllPoints({}));

    useEffect(() => {
        getPoints();
    }, []);

    const handleClick = (value: string, hint: any) => {
        setSearchValue(value);
        setIsShow(false);
        handleItemListener(hint);
    };

    return (
        <div ref={ref}>
            <TextField
                label={"send point"}
                {...rst}
                value={searchValue}
                onClick={() => setIsShow(true)}
            />

            {isShow && !!points?.length && (
                <List
                    hintValue={"name"}
                    data={points}
                    handleClick={handleClick}
                />
            )}
        </div>
    );
});

SendField.displayName = "SendField";
