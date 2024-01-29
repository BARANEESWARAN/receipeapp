const express=require("express");
const { getRecipes, createRecipes, saveRecipe, getSavedRecipesIds, allsavedRecipes } = require("../controller/Recipe");

const router=express.Router();

router.route("/").get(getRecipes)
.post(createRecipes)

.put(saveRecipe)

router.route("/savedRecipes/ids/:userId").get(getSavedRecipesIds)
router.route("/savedRecipes/:userId").get(allsavedRecipes)



module.exports={recipeRouter:router}