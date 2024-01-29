import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hook/useGetUserId';
import { Base_Url } from '../config/BaseUrl';

import { addRecipe, recipeAdapter, selectAllRecipes, useGetRecipeByIdQuery, useGetRecipesQuery, useSaveRecipeMutation } from '../RtkQuery/Reduxtoolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function Home() {
  const dispatch = useDispatch();
  let userID=useGetUserId()
  const newData=useSelector((state)=>state)

    const {data:recipes=[]}=useGetRecipesQuery(undefined,{

    });
    const{data:savedRecipes,refetch}=useGetRecipeByIdQuery({userId:userID},{
      skip:!userID,
      refetchOnMountOrArgChange:true,
      // pollingInterval:10000
    }) //or    const{data:savedRecipes,refetch}=useGetRecipeByIdQuery(userId) 
    const [SaveRecipe, { isLoading, isError, isSuccess }] = useSaveRecipeMutation(undefined, {
      pollingInterval: 5000, // Set your desired polling interval in milliseconds (e.g., every 5 seconds).
      refetchOnReconnect: true, // Enable refetching when the connection is re-established.
      refetchOnMountOrArgChange:true,
      // If you want to skip polling in a certain case (e.g., when a specific condition is met):
      skip: !userID, // `someCondition` should be a boolean expression that decides whether to skip polling.
    });
    
  




const saveRecipe=async(recipeid)=>{
const responce= await SaveRecipe({
    recipeID:recipeid,
    userID
})

// setSavedRecipes(responce.data.savedRecipes)
// refetch()
alert("Recipe Saved Successfuly")

}



const isRecipeSaved=(id)=>{

  return savedRecipes&&savedRecipes.includes(id);
}
console.log("newData",newData)
// savedRecipes?savedRecipes.includes(id):""
  return (
    <div>
    <h1 className='header'>Recipes</h1>

    <ul>
    <div  className='home-recipes'>
      <button onClick={()=>  dispatch(addRecipe(recipes))}>Next UserId</button>
      {recipes?recipes.map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className={isRecipeSaved(recipe._id) ? "saved-btn":"save-btn"}
            >
           
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </div>
          <div className="instructions">
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name} />
          <p>Cooking Time: {recipe.cookingTime} minutes</p>
        </li>
      )):""
    
    }
      </div>
    </ul>
  
  </div>
  )
}

export default Home