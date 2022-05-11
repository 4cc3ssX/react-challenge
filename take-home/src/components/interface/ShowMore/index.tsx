import React from "react";
import SearchLogo from '../../../svgs/search.svg';

interface IShowMore {
    canShowMore?: boolean;
    onClick?: () => void;
}

const ShowMore = (props: IShowMore) => {
    const { canShowMore, onClick } = props;
    if (!canShowMore) {
        return null;
    }
    return (
        <div onClick={onClick} className="flex flex-row items-center gap-2 cursor-pointer">
            <SearchLogo />
            <p className="text-[#6A6969] text-base">show more</p>
        </div>
    )
}

export default ShowMore;