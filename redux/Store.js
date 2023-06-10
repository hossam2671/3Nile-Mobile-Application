import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slices/UserSlice';

export const Store = configureStore({
    reducer: {
        UserSlice
    }
});



// const middleware = [thunk];

// export const storee = createStore(

//   composeWithDevTools(applyMiddleware(...middleware)),

// );

