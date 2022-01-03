import { createReducer } from "@reduxjs/toolkit";
import { increment, decrement } from './test.action';

const count = 0;

export const testReducer = createReducer(count, builder => 
  builder
  .addCase(increment, (state) => state + 1)
  .addCase(decrement, (state) => state - 1)
);