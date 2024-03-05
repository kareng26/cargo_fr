import styled from "@emotion/styled";
import { Colors } from "@/assets/colors";

const List = styled.ul`
    width: 100%;
    height: 200px;
    position: relative;
    z-index: 667;
    overflow: scroll;
    background: ${Colors.BLANC};
    scrollbar-gutter: unset;
    border: 0.5px solid ${Colors.OCTAVE};
    border-radius: 4px;
    box-shadow: 0 3px 5px ${Colors.DIAPHANE_OCTIVE};
`;

export { List };
