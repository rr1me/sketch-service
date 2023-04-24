import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './slices/controlSlice';
import baseBrushSlice from './slices/baseBrushSlice';
import lineSlice from './slices/lineSlice';
import squareSlice from './slices/squareSlice';
import connectionSlice from './slices/connectionSlice';
import notificationSlice from './slices/notificationSlice';

const mySliceLogger = () => (next: any) => <A extends { type: string }>(action: A) => {
	if (action.type.startsWith('connectionSlice')) console.log('Dispatching:', action.type);
	return next(action);
};

export const store = configureStore({
	reducer: { controlSlice, baseBrushSlice, lineSlice, squareSlice, connectionSlice, notificationSlice },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mySliceLogger),
});

export default store;
export type AppDispatch = typeof store.dispatch