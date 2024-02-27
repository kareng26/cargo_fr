import { styled } from "styled-components";

const Documents = styled.div`
    display: flex;
    flex: 1;
    gap: 30px;
    align-items: center;
    flex-direction: column;
    height: 100px;
`;

const DocItems = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: center;
`;

const DocItemInfo = styled.div`
    color: #2f364233;
    font-size: 11px;
`;

export { Documents, DocItems, DocItemInfo };
