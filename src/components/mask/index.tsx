import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@mui/material";

export const Mask: React.FC = () => {
    const [card, setCard] = useState();
    const inputCard = useRef();

    const handleChange = () => {
        console.log("inputCard", inputCard.current.value);
        // const cardValue = inputCard?.current?.value
        //     .replace(/\D/g, "")
        //     .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
        // inputCard?.current?.value = !cardValue[2]
        //     ? cardValue[1]
        //     : `${cardValue[1]}-${cardValue[2]}${`${
        //           cardValue[3] ? `-${cardValue[3]}` : ""
        //       }`}${`${cardValue[4] ? `-${cardValue[4]}` : ""}`}`;
        // const numbers = inputCard?.current?.value.replace(/(\D)/g, "");
        // setCard(numbers);
    };

    useEffect(() => {
        handleChange();
    }, [card]);

    return (
        <>
            <TextField type={"text"} ref={inputCard} onChange={handleChange} />
        </>
    );
};
