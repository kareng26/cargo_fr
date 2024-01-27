import { YMaps } from "@pbe/react-yandex-maps";
import styled from "@emotion/styled";

const Container = styled.div`
    [class*="copyrights-pane"] {
        display: none !important;
    }

    [class*="ground-pane"] {
        //filter: grayscale(1);
    }

    [class*="ymaps-2-1-79-inner-panes"] {
        border-radius: 8px;
    }

    [class*="ymaps-2-1-79-i-ua_js_yes"] {
        width: 100% !important;
    }

    [class*="ymaps-2-1-79-map"] {
        width: 100% !important;
    }
`;

export { Container };
