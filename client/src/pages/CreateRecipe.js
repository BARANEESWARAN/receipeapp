import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../config/BaseUrl';
import { useGetUserId } from '../hook/useGetUserId';
import { useAddRecipeMutation } from '../RtkQuery/Reduxtoolkit';

function CreateRecipe() {
  const userID=useGetUserId()
    const [cookies, _] = useCookies(["access_token"]);
  
    const [addRecipe, { isLoading, isError, isSuccess }] = useAddRecipeMutation(undefined, {
      pollingInterval: 5000, // Set your desired polling interval in milliseconds (e.g., every 5 seconds).
      refetchOnReconnect: true, // Enable refetching when the connection is re-established.
      refetchOnMountOrArgChange:true,
      // If you want to skip polling in a certain case (e.g., when a specific condition is met):
      skip: !userID, // `someCondition` should be a boolean expression that decides whether to skip polling.
    });
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner:userID
      });
      const navigate = useNavigate();

      const handleAddIngredient = () => {
        const ingredients = [...recipe.ingredients,""]
        setRecipe({...recipe,ingredients:ingredients})
       
      };

      const handleIngredientChange=(event,index)=>{

        const {value}=event.target;
        const ingredients=[...recipe.ingredients]
        ingredients[index]=value

        setRecipe({...recipe,ingredients:ingredients})

      }

      const handleChange=(event)=>{
const{value,name}=event.target;
setRecipe({...recipe,[name]:value})
      }

      const handleSubmit = async (event) => {
        event.preventDefault();

        try{

       const responce=await addRecipe({
        name: recipe.name,
        description:recipe.description,
        ingredients: recipe.ingredients,
        instructions:recipe.instructions,
        imageUrl: recipe.imageUrl,
        cookingTime:recipe.cookingTime,
        userOwner:userID
       })

            alert("Recipe created")
setRecipe({...recipe,
    
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner:userID
      

})
            console.log(responce,"res")

        }

        catch(err){
            console.log(err)
        }

      }
  return (
    <div className='create-recipe-container'>
        <form >
        <h2 className='header'>Create Recipes</h2>

        <div className='form-group'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        </div>
        <div className='form-group'>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        </div>

        <div className='form-group'>
        <label htmlFor="ingredients">Ingredients</label>
       {recipe.ingredients.map((ingredient,index)=>(
   <input type='text' 
   id='ingredients' 
   name='ingredients'
   key={index} 
   value={ingredient}
   onChange={(event) => handleIngredientChange(event, index)}
   />

       ))}
        <button type="button" onClick={handleAddIngredient} className='add-ingredient-btn'>
          Add Ingredient
        </button>
        </div>

        <div className='form-group'>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        </div>
        <div className='form-group'>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        </div>
        <div className='form-group'>
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit" className='create-recipe-btn' onClick={handleSubmit}>Create Recipe</button>
        </div>


        </form>


    </div>
  )
}

export default CreateRecipe