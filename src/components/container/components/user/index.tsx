import { styled } from "styled-components";

const UserInfo = styled.div`
    position: fixed;
    right: 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
        font-size: 10px;
        color: #2f364233;
    }
`;

export { UserInfo };
