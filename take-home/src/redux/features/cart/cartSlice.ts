import { createSlice } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  stocks: number;
  isSelected: boolean;
  count: number;
  timestamp: number;
}

export interface ICartState {
  cards: ICartItem[];
}

const initialState: ICartState = {
  cards: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // const { id, image, name, rarity, price, stocks, isSelected, count } = action.payload;
      state.cards.push({...action.payload, count: 1, stocks: action.payload.stocks -= 1, timestamp: new Date().getTime()});
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cards = state.cards.filter((e) => e.id !== id);
    },
    addQuantity: (state, action) => {
      const { id } = action.payload;
      // Filter matched item and increased by 1
      const getCardById = state.cards
        .filter((e) => e.id === id)
        .map((e) => {
          const hasStocks = e.stocks > 0;
          return { 
            ...e,
            count: e.count + 1,
            stocks: e.stocks - 1,
          }
        });
      // Have to filter cuz it can duplicate the cart item while arrary destructuring.
      const removeCardById = [...state.cards].filter((e) => e.id !== id);
      state.cards = [...getCardById, ...removeCardById].sort((x, y) => x.timestamp - y.timestamp);
    },
    removeQuantity: (state, action) => {
      const { id } = action.payload;
      // Filter matched item and decreased by 1
      const getCardById = state.cards
        .filter((e) => e.id === id)
        .map((e) => {
          const isGreaterThanOne = e.count > 1
          return { ...e,
            count: e.count - 1,
            stocks: e.stocks + 1
          }
        });
      // Have to filter cuz it can duplicate the cart item while arrary destructuring.
      const removeCardById = [...state.cards].filter((e) => e.id !== id);
      state.cards = [...getCardById, ...removeCardById].sort((x, y) => x.timestamp - y.timestamp);
    },
    removeAllQuantity: (state) => {
      state.cards = []
    }
  },
});

export const { addToCart, removeFromCart, addQuantity, removeQuantity, removeAllQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
