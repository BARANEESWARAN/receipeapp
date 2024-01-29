import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


export const recipeAdapter = createEntityAdapter({
    selectId:(recipe)=>recipe.id
})

const initialState = recipeAdapter.getInitialState()
export const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
      addRecipe: (state, action) => {
        // Add the recipe data to the adapter using the recipeAdapter's addOne function
        recipeAdapter.setAll(state, action.payload);
      },
 
    },
  });







export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getRecipes:builder.query({

            query:()=>"recipes",  //get allrecipes with  api url
            transformResponse: (response) => {
                // Transform the response data and update the state using recipeAdapter.setAll
                const loadedData = response.recipes.map((recipe) => {
                    recipe.id = recipe._id
                    return recipe
                });
        
                // Use recipeAdapter.setAll to update the state
                recipeAdapter.addOne(initialState,{id:1,name:"barani"})
                return loadedData;
              },
           
            
            
            providesTags: (result, error, arg) =>
            result
              ? [...result.map(({ _id }) => ({ type: 'Post', _id })), 'recipes']
              : ['recipes'],
       
 
        }),
        


        getRecipeById: builder.query ({
            query: ({userId}) => ({
                url: `recipes/savedRecipes/ids/${userId}`,
                method: "GET",
              }),
              providesTags: (result, error, arg) =>
              result
                ? [...result.map(({ _id }) => ({ type: 'Post',"id": _id })), 'recipeid']
                : ['recipeid'],
         
    
        }),
          
          

        saveRecipe:builder.mutation({
            query:({recipeID,userID})=>({
                url:"recipes",
                method:"PUT",
                body:{recipeID,userID}
               }),
               transformResponse:(response)=>response.recipes,
               invalidatesTags: (result,error,arg)=>
               result
               ? [...result.map(({ _id }) => ({ type: 'Post',"id": _id })), 'recipeid']:
               ["recipeid"]
           
        }),
        addRecipe:builder.mutation({
            query:({name,description,ingredients,instructions,imageUrl,cookingTime,userOwner})=>({
url:"recipes",
method:"POST",
body:{name,description,ingredients,instructions,imageUrl,cookingTime,userOwner}
 }),
 transformResponse:(recipe)=>recipe.data
        })
})
})


// Export selectors for the recipe adapter
export const {
    selectAll: selectAllRecipes,
    selectById: selectRecipeById,
    selectIds: selectRecipeIds,
    selectEntities: selectRecipeEntities,
  } = recipeAdapter.getSelectors((state) => state.recipes);
  export const { addRecipe } = recipeSlice.actions;

  export default recipeSlice.reducer











export const {useGetRecipeByIdQuery,useSaveRecipeMutation,useGetRecipesQuery,useAddRecipeMutation}=extendedApiSlice;