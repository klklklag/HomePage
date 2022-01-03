import { createReducer } from "@reduxjs/toolkit";
// import { increment, decrement } from './worker.action';

const INITIAL_STATE = {
  
};

export const workerReducer = createReducer(INITIAL_STATE, builder => 
  builder
  // .addCase(increment, (state) => state + 1)
);