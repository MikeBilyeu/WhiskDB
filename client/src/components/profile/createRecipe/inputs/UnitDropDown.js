import React from "react";

const RenderDropDown = ({ input }) => {
  //Drop down select

  return (
    <div className="field four wide">
      <label>Unit</label>
      <select className="ui fluid dropdown" {...input}>
        <option value="">None</option>
        <option disabled>————Weight————</option>
        <option value="gram">Gram</option>
        <option value="kilogram">Kilogram</option>
        <option value="ounce">Ounce(28g)</option>
        <option value="pound">Pound(454g)</option>

        <option disabled>————Volume————</option>
        <option value="milliliter">Milliliter</option>
        <option value="liter">Liter</option>
        <option value="teaspoon">Teaspoon(5ml)</option>
        <option value="tablespoon">Tablespoon(15ml)</option>
        <option value="cup">Cup(237ml)</option>

        <option disabled>————Approximate————</option>
        <option value="drop">Drop</option>
        <option value="smidgen">Smidgen</option>
        <option value="pinch">Pinch</option>
        <option value="dash">Dash</option>
        <option value="handful">Handful</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="slice">Slice</option>
        <option value="stalk">Stalk</option>
        <option value="clove">Clove</option>
      </select>
    </div>
  );
};

export default RenderDropDown;
