import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';
import baseBrushSlice from './slices/baseBrushSlice';

export const store = configureStore({
	reducer: { controlSlice, baseBrushSlice },
});

export default store;
export type AppDispatch = typeof store.dispatch