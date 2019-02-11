return (
  <div className="fields">
    <Field
      name="ingredient"
      component={this.renderInput}
      label="Ingredient"
      placeholder="E.g. All Purpose Flour"
    />
    <div className="six wide field">
      <label>Ingredient</label>
      <input
        type="text"
        name="ingredient"
        autoComplete="off"
        placeholder="E.g. All Purpose Flour"
      />
    </div>
    <div className="two wide field">
      <label>Amount</label>
      <input type="text" name="amount" placeholder="1-1/4" autoComplete="off" />
    </div>
    <div className="four wide field">
      <label>Unit of Measurement</label>
      <select className="ui fluid dropdown">
        <option value="">Select a unit</option>
        <option value="tsp">Teaspoon</option>
        <option value="tbsp">Tablespoon</option>
        <option value="floz">Fluid Ounce</option>
        <option value="c">Cup</option>
        <option value="pt">Pint</option>
        <option value="qt">Quart</option>
        <option value="gal">Gallon</option>
        <option value="lb">Pound</option>
        <option value="oz">Ounce</option>
        <option value="ml">Milliliter</option>
        <option value="l">Liter</option>
      </select>
    </div>
  </div>
);
