import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';

export const store = configureStore({
	reducer: { controlSlice },
});

// export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch