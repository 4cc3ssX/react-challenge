import React, { useCallback, useState, useEffect, useRef } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  Card,
  NavBar,
  SearchInput,
  ShowMore,
  ViewCart,
  Modal,
  CartItem,
  GradientFadeOut,
  Button,
} from "../src/components/interface";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  ICartItem,
  removeAllQuantity,
  removeFromCart,
} from "../src/redux/features/cart/cartSlice";
import { fetchCards } from "../src/redux/features/card/cardSlice";
import Success from "../src/svgs/success.svg";
import _ from "lodash";

const Home: NextPage = (props: { [key: string]: any }) => {
  const { title } = props;
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 12,
  });
  const [state, setState] = useState({
    modal: {
      visible: false,
    },
    paid: false,
  });

  const cards = useSelector((state: any) => state.card);
  const carts = useSelector((state: any) => state.cart.cards);

  const dispatch = useDispatch<any>();
  const handleShowMore = useCallback(() => {
    setPaginate({
      ...paginate,
      page: paginate.page + 1,
    });
  }, [paginate]);
  const onDismissHandler = useCallback(() => {
    setState({ ...state, modal: { visible: false }, paid: false });
  }, [state]);
  const onPayClickHandler = useCallback(() => {
    _.delay(() => {
      setState({ ...state, paid: true });
    }, 1000)
  }, [state]);
  React.useEffect(() => {
    dispatch(fetchCards(paginate));
  }, [dispatch, paginate]);
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title={title} />
      <Modal
        visible={state.modal.visible}
        onDismiss={onDismissHandler}
        className={`${state.paid ? "h-[362px]" : "h-auto"}`}
      >
        {state.paid ? (
          <div className="flex flex-col justify-center items-center gap-6">
            <Success />
            <p className="text-xl font-medium">Payment success!</p>
          </div>
        ) : (
          <>
            <div className="relative">
              <div className="flex flex-col justify-start items-center gap-5 h-[320px] lg:h-[370px] overflow-y-auto">
                {carts.map((v: ICartItem, i: number) => {
                  return <CartItem key={i.toString()} {...v} />;
                })}
              </div>
              <GradientFadeOut className="absolute inset-x-0 bottom-0" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div
                className="underline text-[#6A6969] text-xs cursor-pointer"
                onClick={() => {
                  dispatch(removeAllQuantity());
                  onDismissHandler();
                }}
              >
                Clear all
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-11/12 lg:w-9/12 mx-auto">
              <div className="my-6 self-stretch">
                <div className="flex flex-row items-center">
                  <div className="font-semibold text-base flex-1">
                    Total cards
                  </div>
                  <div className="font-semibold text-base text-[#FD2929]">
                    {carts
                      .map((e: any) => e.count)
                      .reduce((a: number, b: number) => a + b, 0)}
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="font-bold text-xl flex-1">Total price</div>
                  <div className="font-bold text-xl text-[#FD2929]">
                    $
                    {carts
                      .map((e: any) => e.price * e.count)
                      .reduce((a: number, b: number) => a + b, 0)
                      .toFixed(2)}
                  </div>
                </div>
              </div>
              <Button
                className="self-stretch"
                onClick={() => onPayClickHandler()}
              >
                Pay now
              </Button>
            </div>
          </>
        )}
      </Modal>
      <main className="container mx-auto mt-28 flex flex-col justify-center items-center">
        <SearchInput
          placeholder="Name.."
          filters={[
            {
              name: "Type",
            },
            {
              name: "Rarity",
            },
            {
              name: "Set",
            },
          ]}
        />
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-cols-auto gap-12 transition-all">
          {cards.data?.length > 0 &&
            cards.data.map((v: any, i: number) => {
              const { id, name, images, cardmarket, rarity, set } = v;
              const data = {
                id,
                title: name,
                subtitle: rarity,
                image: images?.large || images?.small,
                price: cardmarket.prices.averageSellPrice,
                stocks: set.total,
              };
              const selected =
                carts.filter((e: any) => e.isSelected && e.id === id).length >
                0;
              return (
                <Card
                  key={`${id}-${i.toString()}`}
                  {...data}
                  selected={selected}
                  buttonLabel={selected ? "Selected" : "Select Card"}
                  onClick={() => {
                    if (selected) {
                      dispatch(removeFromCart({ id }));
                    } else {
                      dispatch(addToCart({ ...data, isSelected: true }));
                    }
                  }}
                />
              );
            })}
        </div>
      </main>
      <div className="fixed bottom-4 inset-x-0 z-20 w-[104px] mx-auto">
          <ViewCart
            title="View cart"
            badge={carts?.length}
            visible={!state.modal.visible}
            disabled={!carts?.length}
            onClick={() => setState({ ...state, modal: { visible: true } })}
          />
        </div>
      <GradientFadeOut className="fixed z-10 inset-x-0 -bottom-2" />
      <footer className="flex flex-col justify-center items-center gap-6 mb-20">
        <ShowMore
          canShowMore={Math.ceil(cards.totalCount || 0 / 12) >= paginate.page}
          onClick={handleShowMore}
        />
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const title = process.env.APP_TITLE || "";
  return {
    props: {
      title,
    },
  };
};

export default Home;
