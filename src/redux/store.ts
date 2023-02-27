import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';
import baseBrushSlice from './slices/baseBrushSlice';
import lineSlice from './slices/lineSlice';

export const store = configureStore({
	reducer: { controlSlice, baseBrushSlice, lineSlice },
});

export default store;
export type AppDispatch = typeof store.dispatch