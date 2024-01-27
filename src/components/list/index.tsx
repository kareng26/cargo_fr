import React from "react";
import { Item, ListWrap } from "./sc";
import DOMPurify from "dompurify";

type Props = {
    hintValue: string;
    data: Array<any>;
    handleClick: (value: string, hint: any) => void;
    keyValue?: number | string;
};

const sanitizer = DOMPurify.sanitize;

export const List: React.FC<Props> = ({
    data,
    handleClick,
    hintValue,
    keyValue = "id",
}) => {
    return (
        <ListWrap>
            {data?.map((hint) => (
                <Item
                    key={hint?.[keyValue]}
                    onMouseDown={(event) => {
                        const p =
                            event.currentTarget.querySelector("p")?.textContent;

                        handleClick(p ?? "", hint);
                    }}
                >
                    <p
                        dangerouslySetInnerHTML={{
                            __html: sanitizer(hint?.[hintValue]),
                        }}
                    />
                </Item>
            ))}
        </ListWrap>
    );
};
