import Image from "next/image";
import React from "react";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import _ from 'lodash';
import { theme } from "../../../configs";
import { addQuantity, ICartItem, removeQuantity } from "../../../redux/features/cart/cartSlice";
import { CloseIcon } from "../../icons";

const CartItem = (props: ICartItem) => {
  const { id, image, title, price, stocks, count } = props;
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-center items-start self-stretch">
      <div
        style={{ width: 77, height: 106 }}
        className="relative rounded-md overflow-hidden"
      >
        <Image
          src={image}
          alt={`${title}`}
          objectFit="contain"
          layout="fill"
          quality={100}
        />
      </div>
      <div className="flex flex-1 flex-col justify-around items-start mx-4 gap-3">
        <div className="flex flex-col items-start">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-xs text-[#6A6969]">
            <span className="text-[#1D1C1C]">{price}</span> per card
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-content items-center mt-2">
          <p className="text-sm text-[#6A6969]">
            <span className="text-[#FD2929]">{stocks}</span> cards left
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end gap-2">
        <div className="flex flex-row justify-center items-start gap-1">
          <div className="mt-1">
            <p
              style={{ color: theme.colors.primary }}
              className="font-semibold text-lg"
            >
              {count}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 self-start">
            <div className="cursor-pointer" onClick={() => stocks > 0 && dispatch(addQuantity({id}))}>
              {stocks > 0 ? (
                <IoChevronUpOutline size={10} color={theme.colors.primary} />
              ) : (
                <CloseIcon color={theme.colors.danger} size={10} />
              )}
            </div>
            <div className="cursor-pointer"onClick={() => count > 1 && dispatch(removeQuantity({id}))}>
              {count > 1 ? (
                <IoChevronDownOutline size={10} color={theme.colors.primary} />
              ) : (
                <CloseIcon color={theme.colors.danger} size={10} />
              )}
            </div>
          </div>
        </div>
        <p className="text-xs">price</p>
        <div>
          <p
            style={{ color: theme.colors.primary }}
            className="text-sm font-bold"
          >
            ${(price * count).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
