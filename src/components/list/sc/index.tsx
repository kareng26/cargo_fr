import styled from "@emotion/styled";

const ListWrap = styled.ul`
    width: 100%;
    height: 200px;
    position: relative;
    z-index: 667;
    overflow: scroll;
    background: white;
    scrollbar-gutter: unset;
    border: 0.5px solid #2f3642;
    border-radius: 4px;
    //border-bottom-right-radius: 4px;
    //border-bottom-left-radius: 4px;
    box-shadow: 0 3px 5px rgba(47, 54, 66, 0.2); /* Add box shadow */
    //border-radius: 4px;
`;

const Item = styled.div`
    cursor: pointer;
    margin: 10px 0;
    padding: 5px 15px;
    &:hover {
        background: rgba(47, 54, 66, 0.1);
    }
`;

export { Item, ListWrap };
