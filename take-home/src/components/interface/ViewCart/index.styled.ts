import React from 'react';
import styled, {css} from 'styled-components';

interface IButton extends React.HTMLAttributes<HTMLDivElement> {
    disabled: boolean;
}

export const Button = styled.div<IButton>`
    background: #298BFD;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    cursor: pointer;
    ${props => props.disabled && css`
        background: #1D1C1C;
    `}
`