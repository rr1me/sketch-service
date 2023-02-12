import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';

export const store = configureStore({
	reducer: { controlSlice },
});

export default store;
export type AppDispatch = typeof store.dispatch