import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';
import baseBrushSlice from './slices/baseBrushSlice';
import lineSlice from './slices/lineSlice';
import squareSlice from './slices/squareSlice';
import connectionSlice from './slices/connectionSlice';

export const store = configureStore({
	reducer: { controlSlice, baseBrushSlice, lineSlice, squareSlice, connectionSlice },
});

export default store;
export type AppDispatch = typeof store.dispatch