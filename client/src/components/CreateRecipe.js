import React from 'react';
import InputField from './InputField';

class CreateRecipe extends React.Component {
  state = {
    title: '',
    ingredients: ['', '', ''],
    tips: '',
    servings: '',
    time: '',
    directions: '',
    imageURL: '',
    ingredientNum: 3
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.putData(this.state)
  }

  //Update state on input change
    onInputChange = (key, value, i) => {
      if(Array.isArray(this.state[key])) {
        let keyCopy = [...this.state[key]];
        keyCopy[i] = value;
        this.setState({ [key]: keyCopy });
      } else {
        this.setState({ [key]: value });
      }
    }

  //Add an Ingredient input
    onAddClick = () => {
      if(this.state.ingredientNum < 15) {
        this.setState({
          ingredientNum: this.state.ingredientNum + 1,
          ingredients: [...this.state.ingredients, '']
        });
      }
    }

  //Remove Ingredient input
    onRemoveClick = () => {
      if(this.state.ingredientNum > 1) {
        let removeIngredient = [...this.state.ingredients]
          .slice(0, this.state.ingredients.length-1);
        this.setState({
          ingredientNum: this.state.ingredientNum - 1,
          ingredients: removeIngredient
        });
      }
    }

  render() {
    let ingredientComponent = [];
    for(let i = 0; i < this.state.ingredientNum; i++) {
      ingredientComponent.push(<InputField
        key={i}
        inputLabel="Ingredient"
        stateKey="ingredients"
        inputType="text"
        placeholder="Ingredient"
        onInputChange={this.onInputChange}
        index={i}
      />);
    }
    
    return (
      <form className="ui form" onSubmit={this.onFormSubmit} style={{padding: '2rem'}}>
      <h2 className="ui header">Create Recipe</h2>
        <InputField
          inputLabel="Title"
          stateKey="title"
          inputType="text"
          placeholder="Recipe Title"
          onInputChange={this.onInputChange}
        />
        {ingredientComponent}
        <div className="ui buttons">
          <button
            type="button"
            className="ui button"
            onClick={this.onRemoveClick}
            >Remove</button>
          <div className="or"></div>
          <button
            type="button"
            className="ui positive button"
            onClick={this.onAddClick}
            >Add Ingredient</button>
        </div>

        <InputField
          inputLabel="Servgins"
          stateKey="servings"
          inputType="number"
          placeholder="Servgins"
          onInputChange={this.onInputChange}
        />
        <InputField
          inputLabel="Directions"
          stateKey="directions"
          inputType="textArea"
          placeholder="Directions..."
          onInputChange={this.onInputChange}
        />
        <InputField
          inputLabel="Tips"
          stateKey="tips"
          inputType="textArea"
          placeholder="Extra Tips"
          onInputChange={this.onInputChange}
        />
        <InputField
          inputLabel="Time"
          stateKey="time"
          inputType="number"
          placeholder="Time in minutes"
          onInputChange={this.onInputChange}
        />
        <InputField
          inputLabel="Image"
          stateKey="imageURL"
          inputType="url"
          placeholder="Image URL"
          onInputChange={this.onInputChange}
        />

        <button className="ui button" type="submit">Submit Recipe</button>
      </form>
    );
  }
}

export default CreateRecipe;
