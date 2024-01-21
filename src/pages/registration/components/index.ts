import styled from "styled-components";

import { Box as BC, Container as CC, Typography } from "@mui/material";

const Container = styled(CC)`
    display: flex !important;
    //background: aqua;
    margin: 70px 0;
    flex-direction: column;
    align-items: center;
    //height: 100vh !important;
    justify-content: center;

    //@media (max-width: 550px) {
    //    height: 100%;
    //}
    //
    //button {
    //    margin: 10px 0;
    //    align-self: center;
    //}
`;

const Content = styled(CC)`
    display: flex !important;
    flex-direction: column;
    align-items: center;
    //height: 100vh !important;
    justify-content: center;

    @media (max-width: 550px) {
        height: 100%;
    }

    button {
        margin: 10px 0;
        align-self: center;
    }
`;

const Box = styled(BC)`
    display: flex;
    padding: 10px 0;
    flex-direction: column;
`;

const Fields = styled(BC)`
    display: flex;
    gap: 20px;
    //margin-bottom: 20px;

    @media (max-width: 550px) {
        //gap: 0;
        flex-direction: column;
    }
`;

const Cell = styled.div`
    height: 65px;
    width: 360px;
    padding: 7px;

    @media (max-width: 850px) {
        width: initial;
        max-width: 200px;
    }

    @media (max-width: 550px) {
        max-width: initial;
    }
`;

const Group = styled.div`
    gap: 20px;
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const Title = styled(Typography)`
    font-size: 22px !important;
    font-weight: bold !important;
`;

const GroupTitle = styled(Typography).attrs(() => ({
    fontSize: 18,
    fontWeight: "bold",
}))`
    //opacity: 0.9;
`;

export {
    Container,
    Box,
    Fields,
    Cell,
    Group,
    Section,
    Content,
    Title,
    GroupTitle,
};
