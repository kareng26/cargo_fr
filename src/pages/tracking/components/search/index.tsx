import React from "react";

import { styled } from "styled-components";
import { InputAdornment, TextField } from "@mui/material";
import { I18 } from "@/i18n.ts";
import { Search } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { useOutside } from "@/hooks/useOutside.ts";

type Props = {
    onSearch: () => void;
    onFieldChange: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch, onFieldChange }) => {
    const { t } = useTranslation();

    const { isShow, setIsShow, ref } = useOutside({
        initialIsVisible: false,
    });

    return (
        <Container onClick={() => setIsShow(true)}>
            {isShow ? (
                <TextField
                    ref={ref}
                    placeholder={t(I18.SEARCH_BY)}
                    onChange={(e) => onFieldChange(e.target.value.trim())}
                    InputProps={{
                        style: {
                            height: "25px",
                            fontSize: "12px",
                            paddingLeft: "6px",
                        },
                        startAdornment: (
                            <Adornment position={"start"} onClick={onSearch}>
                                <Search />
                            </Adornment>
                        ),
                    }}
                />
            ) : (
                <Search />
            )}
        </Container>
    );
};

const Adornment = styled(InputAdornment)`
    padding-left: -16px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

export { SearchBar };
