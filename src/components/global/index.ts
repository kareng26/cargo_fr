import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Montserrat",serif;
        //font-family: 'Playfair Display', serif;
        letter-spacing: -0.8px;
    }
`;

export { Global };
