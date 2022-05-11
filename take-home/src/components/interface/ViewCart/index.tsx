import React from "react";
import { Button } from "./index.styled";
import Cart from '../../../svgs/cart.svg';

interface IViewCart {
    title: string;
    badge?: number | string;
    style?:React.CSSProperties;
    visible?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

const ViewCart = (props: IViewCart) => {
    const {title, badge = 0, visible = true, onClick, disabled = false, ...rest} = props;
    if (!visible) {
        return null;
    }
    return (
        <Button {...rest} onClick={() => !disabled && onClick && onClick()} disabled={disabled} className="relative flex flex-row items-center gap-2 px-2 py-2">
            <div className="absolute -top-2 -left-2 rounded-full bg-[#FF6363] w-4 h-4">
                <p className="text-white text-center text-xs">{badge}</p>
            </div>
            <Cart />
            <p className="text-white text-xs font-medium">{title}</p>
        </Button>
    )
}

export default ViewCart;