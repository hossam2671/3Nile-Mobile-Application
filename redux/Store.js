import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';

export const Store = configureStore({
    reducer: {
        UserSlice
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
});



// const middleware = [thunk];

// export const storee = createStore(

//   composeWithDevTools(applyMiddleware(...middleware)),

// );

