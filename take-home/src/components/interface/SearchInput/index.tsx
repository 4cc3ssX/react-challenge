import React, { CSSProperties } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface ISearchInput extends React.HTMLAttributes<HTMLInputElement> {
  containerStyle?: CSSProperties;
  filters?: {
    name: string;
    icon?: (props: { size: number; color: string }) => React.ReactNode;
    onClick?: () => void;
  }[];
}

const SearchInput = (props: ISearchInput) => {
  const { containerStyle, filters, ...rest } = props;
  const ICON_SIZE = 12;
  const COLOR = "#BCBBBB";
  return (
    <div className="px-[20px] bg-white rounded-3xl flex flex-row items-center shadow-[0px_4px_10px_#00000008]">
      <input
        {...rest}
        type="text"
        name="search"
        className="border-none bg-transparent outline-none flex-1 text-sm"
        style={{color: COLOR}}
      />
      <div className="flex flex-row items-center gap-3">
        {filters?.map((e, i) => {
          const { name, icon, onClick } = e;
          return (
            <div
              key={i.toString()}
              onClick={onClick}
              className="flex flex-row items-center border-[#E5E5E5] border-l pl-3 py-3 gap-1 cursor-pointer"
            >
              <p style={{color: COLOR }} className="text-[11px]">{name}</p>
              {icon ? (
                icon({ size: ICON_SIZE, color: COLOR })
              ) : (
                <IoChevronDownOutline size={ICON_SIZE} color={COLOR} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchInput;
