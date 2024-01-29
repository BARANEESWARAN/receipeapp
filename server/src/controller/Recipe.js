const recipesModel=require("../model/Recipe");
const userModel = require("../model/Users");


exports.getRecipes=async(req,res)=>{
   
try{
    const recipes=await recipesModel.find({});
    if(!recipes){
        res.status(201).json({
            success:true,
            message:"Data Unavailable"
        })
    }

    res.status(200).json({
        success:true,
        recipes
    })
}
catch(err){
    console.log(err.message)
    res.status(500).json("internal server error")
}
}
exports.createRecipes=async(req,res)=>{
   const recipe=await new recipesModel(req.body)
try{
    const responce=await recipe.save();
  res.status(200).json(responce)

   
}
catch(err){
    console.log(err.message)
    res.status(500).json({
        status:"internal server error",
        error:err.message
    })
}
}


// Save a Recipe
exports.saveRecipe=async (req, res) => {
    const recipe = await recipesModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    try {
      user.savedRecipes.push(recipe);
      await user.save();
      res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  // Get id of saved recipes
  exports.getSavedRecipesIds=async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId);
     let savedRecipe=user?.savedRecipes
    

      res.status(201).json( savedRecipe );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  
  // Get saved recipes
 exports.allsavedRecipes=async (req, res) => {
    try {
      const user = await userModel.findById(req.params.userId);
      const savedRecipes = await recipesModel.find({
        _id: { $in: user.savedRecipes },
      });
  
   
      res.status(201).json({ savedRecipes });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

