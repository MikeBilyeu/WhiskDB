import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateRecipe from './CreateRecipe';

class Profile extends React.Component {



    render() {
      const CreateRecipeROUTE = () => <CreateRecipe />;
      return(
        <div>
          <Link to={`/profile/create-recipe`}>Create Recipe</Link>
          <Route path={`/profile/create-recipe`} component={CreateRecipeROUTE} />
        </div>
      );
    }
}

export default Profile;
