import React from "react";
import styled from "styled-components";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {

}

const Button = styled.button<IButton>`
    color: #ffffff;
    padding: 10px;
    background: #298BFD;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.07);
    border-radius: 25px;
`
export default Button;