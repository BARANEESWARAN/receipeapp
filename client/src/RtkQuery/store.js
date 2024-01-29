import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { extendedApiSlice } from "./Reduxtoolkit"
import recipeReducer from "./Reduxtoolkit"

export const store =configureStore({
reducer:{
    [extendedApiSlice.reducerPath]:extendedApiSlice.reducer,
    recipes:recipeReducer

},
middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(extendedApiSlice.middleware),
})