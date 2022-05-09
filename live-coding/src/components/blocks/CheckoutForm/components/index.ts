import React from "react"
import { ReactComponent as MasterLogo } from "../../../svgs/master-logo.svg"
import { ReactComponent as VisaLogo } from "../../../svgs/visa-logo.svg"
import InputIcons from "./InputIcons"

export interface ICardItems {
    Logo: React.FunctionComponent
    backgroundColor?: string
    name: string;
}

export const CardItems: ICardItems[] = [
    {
        Logo: VisaLogo,
        backgroundColor: "#171E6C",
        name: "visa",
    },
    {
        Logo: MasterLogo,
        name: "mastercard"
    },
]

export { InputIcons }
