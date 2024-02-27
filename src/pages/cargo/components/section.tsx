import { styled } from "styled-components";

const Section = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 100px;

    @media (max-width: 900px) {
        gap: 100px;
        flex-direction: column;
    }
`;

export { Section };
