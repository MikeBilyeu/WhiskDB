import axios from "axios";
import { reset } from "redux-form";
import imageUpload from "../../image";

// Create Recipe
const createRecipe = (recipeForm, history) => dispatch => {
	console.log(recipeForm);
	return new Promise(async (resolve, reject) => {
    	let imageURL = await dispatch(imageUpload(recipeForm.imageFile));
		if(!imageURL) reject('Image upload error');	

    	let res = await axios.post("/recipes/create", {
      		...recipeForm,
      		image_url: imageURL
    	});
		
		if(res.statusCode === '400') reject('Recipe upload error');
			
    	let recipe_id = res.data.recipe_id;

    	// clear the recipe form after successful submit
    	dispatch(reset("create-recipe"));
    	// redirect to recipe after successful submit
		history.push(`/recipe/${recipe_id}`);
  		resolve();
	});
};

export default createRecipe;
