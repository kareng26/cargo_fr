import { styled } from "styled-components";
import { Colors } from "@/assets/colors";

const UserInfo = styled.div`
    position: fixed;
    right: 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
        font-size: 10px;
        color: ${Colors.DIAPHANE_OCTIVE};
    }
`;

export { UserInfo };
