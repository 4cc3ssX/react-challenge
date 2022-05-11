import Image from 'next/image';
import React from 'react';
import {Card as SCCard, SelectButton} from './index.styled';

interface ICard {
    title: string;
    image: string;
    subtitle: string;
    price: number;
    stocks: number;
    onClick?: () => void;
    selected?: boolean;
    buttonLabel?: string;
}

const Card = (props: ICard) => {
    const { title, image, subtitle, price, stocks, buttonLabel, onClick, selected } = props
    return (
        <SCCard className="relative flex flex-col justify-center items-center">
            <div className="z-10 flex flex-col justify-center items-center gap-2">
            <div style={{width: 194, height: 265}} className="relative rounded-md overflow-hidden">
                <Image src={image} alt={`${title}`} objectFit="contain" layout="fill" quality={100}/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-2xl">{title}</p>
                <span className="text-[#0F6DB0] text-base">{subtitle}</span>
            </div>
            <div className="flex flex-row justify-around items-center self-stretch">
                <p className="text-[#6A6969] text-lg">${price}</p>
                <p className="text-[#6A6969] text-lg">{stocks} left</p>
            </div>
            <SelectButton className="self-stretch py-2" onClick={onClick} selected={selected}>{buttonLabel}</SelectButton>
            </div>
            <div style={{height: 204}} className="absolute inset-x-0 bottom-5 w-full bg-white rounded-[20px] shadow-[0px_4px_10px_#00000008]"/>
        </SCCard>
    )
}

export default Card;