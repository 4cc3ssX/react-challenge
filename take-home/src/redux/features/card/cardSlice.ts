import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useApiBackend } from "../../../hooks/services/useApi";

export interface ICardState {
  data: any[];
  totalCount: number | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: ICardState = {
  data: [],
  totalCount: null,
  isLoading: false,
  error: null,
};

export const fetchCards = createAsyncThunk('card/fetchCards', async (payload: any) => {
  const {Request} = useApiBackend();
  const { page, pageSize = 12 } = payload;
  return Request({
    method: "get",
    url: `/cards?page=${page}&pageSize=${pageSize}`,
  }).then(data => data.data)
})

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(fetchCards.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      const { data, totalCount } = action.payload;
      return {...state, data: [...state.data, ...data], totalCount, isLoading: false}
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      return {...state, isLoading: false, error: `${action.payload}`}
    });
  }
});

export default cardSlice.reducer;
