import styled from "styled-components";

const Content = styled.div`
    display: flex;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

export { Content };
