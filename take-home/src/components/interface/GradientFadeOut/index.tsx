import styled from "styled-components";

interface IGradientFadeOut {
    degree?: number;
}

const GradientFadeOut = styled.div<IGradientFadeOut>`
    height: 58px;
    width: 100%;
    align-self: stretch;
    background: linear-gradient(${props => props.degree || '180deg'}, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`
export default GradientFadeOut;