import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const apiSlice=createApi({
reducerPath:"api",
tagTypes:["recipes","recipeid"],
baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/"}),
endpoints:()=>({})

    

})

export const {useGetRecipesQuery,useGetRecipeByIdQuery,useSaveRecipeMutation}=apiSlice