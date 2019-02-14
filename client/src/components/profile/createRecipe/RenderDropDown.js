import React from "react";

const RenderDropDown = ({ input }) => {
  //Drop down select

  return (
    <div className="field">
      <label>Unit</label>
      <select className="ui fluid dropdown" {...input}>
        <option value="">None</option>
        <option disabled>———Volume———</option>
        <option value="teaspoon">Teaspoon</option>
        <option value="tablespoon">Tablespoon</option>
        <option value="fluid ounce">Fluid Ounce</option>
        <option value="gill">Gill</option>
        <option value="cup">Cup</option>
        <option value="pint">Pint</option>
        <option value="quart">Quart</option>
        <option value="gallon">Gallon</option>
        <option value="milliliter">Milliliter</option>
        <option value="liter">Liter</option>
        <option value="deciliter">Deciliter</option>
        <option disabled>———Approximate———</option>
        <option value="drop">Drop</option>
        <option value="smidgen">Smidgen</option>
        <option value="pinch">Pinch</option>
        <option value="dash">Dash</option>
        <option value="handful">Handful</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option disabled>———Mass & Weight———</option>
        <option value="pound">Pound</option>
        <option value="ounce">Ounce</option>
        <option value="milligram">Milligram</option>
        <option value="gram">Gram</option>
        <option value="kilogram">Kilogram</option>
      </select>
    </div>
  );
};

export default RenderDropDown;
