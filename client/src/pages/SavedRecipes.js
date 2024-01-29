import React, { useEffect, useState } from "react";

import axios from "axios";
import { useGetUserId } from "../hook/useGetUserId";
import { Base_Url } from "../config/BaseUrl";

function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserId();
  
    useEffect(() => {
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(
            `${Base_Url}recipes/savedRecipes/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchSavedRecipes();
    }, []);
  return (
    <div>
    <h1 className='header'>Saved Recipes</h1>
    <ul>
      {savedRecipes.map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
          </div>
          <p>{recipe.description}</p>
          <img src={recipe.imageUrl} alt={recipe.name} />
          <p>Cooking Time: {recipe.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default SavedRecipes