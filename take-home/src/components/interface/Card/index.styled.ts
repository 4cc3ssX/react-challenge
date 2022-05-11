import React from "react";
import styled, { css } from "styled-components";

interface Button extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Card = styled.div`
  width: 294px;
  background-color: transparent;
`;
export const SelectButton = styled.button<Button>`
  font-size: 18px;
  color: var(--text-color);
  background: #fdce29;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.07);
  border-radius: 25px;
  ${(props) =>
    props.selected &&
    css`
      background: var(--text-color);
      color: #fdce29;
    `}
`;
