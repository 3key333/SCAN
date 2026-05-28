import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/authSlice'
import searchReducer from './search/searchSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer
    }
})

export type RootState = ReturnType<typeof store.getState> // тип для всего store
export type AppDispatch = typeof store.dispatch // тип для dispatch (поддерживает thunk)