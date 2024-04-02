import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface Item {
  id: number
  name: string
  amount: number
  url: string
}

interface EcommerceSliceState {
  items: Item[]
  carts: number[]
}

const initialState: EcommerceSliceState = {
  items: [],
  carts: [],
}

let nextId = 0

export const ecommerceSlice = createAppSlice({
  name: "ecommerce",
  initialState,
  reducers: create => ({
    addNewItem: create.reducer(
      (state = initialState, action: PayloadAction<Item>) => {
        state.items.push({
          ...action.payload,
          id: nextId++,
        })
      },
    ),
    addToCart: create.reducer(
      (state = initialState, action: PayloadAction<number>) => {
        state.carts = [...new Set([...state.carts, action.payload])]
      },
    ),
    removeFromCart: create.reducer(
      (state = initialState, action: PayloadAction<number>) => {
        state.carts = state.carts.filter(
          cartItem => cartItem !== action.payload,
        )
      },
    ),
  }),
  selectors: {
    items: ecommerce => ecommerce.items,
    carts: ecommerce => ecommerce.carts,
  },
})

export const { addNewItem, addToCart, removeFromCart } = ecommerceSlice.actions

export const { items, carts } = ecommerceSlice.selectors
