import React, { FunctionComponent } from "react"
import { IconContainer } from "../index.styled"
import {CardItems, ICardItems} from '.';

interface IInputIcons {
    items?: ICardItems[]
    style?: React.CSSProperties
    activeIconName?: string | null;
}

const InputIcons = ({ items = CardItems, activeIconName, style }: IInputIcons) => {
    return (
        <div
            style={{
                position: "absolute",
                right: 15,
                top: "30%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                ...style,
            }}
        >
            {items.map((v, i) => {
                const { Logo, name, backgroundColor } = v
                return (
                    <IconContainer key={i.toString()} style={{ backgroundColor, opacity: activeIconName === name ? 1 : 0.3 }}>
                        <Logo />
                    </IconContainer>
                )
            })}
        </div>
    )
}

export default InputIcons;