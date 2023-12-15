import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./modules/TodoSlice";

const store = configureStore({
  reducer: { TodoSlice },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
