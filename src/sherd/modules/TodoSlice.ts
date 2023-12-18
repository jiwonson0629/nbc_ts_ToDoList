// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";
import { Todos } from "../../types/global.d";

const initialState: Todos[] = [];

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    deletedTodo: (state, action) => {
      return state.filter((list) => {
        return list.id !== action.payload;
      });
    },
    changeTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
    },
  },
});

export const { addTodo, deletedTodo, changeTodo } = todoSlice.actions;
export default todoSlice.reducer;
