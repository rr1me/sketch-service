import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';
import baseBrushSlice from './slices/baseBrushSlice';
import lineSlice from './slices/lineSlice';
import squareSlice from './slices/squareSlice';

export const store = configureStore({
	reducer: { controlSlice, baseBrushSlice, lineSlice, squareSlice },
});

export default store;
export type AppDispatch = typeof store.dispatch