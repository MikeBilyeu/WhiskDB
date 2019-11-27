import getIngredientListUs from "./getIngredientListUs";

describe("getIngredientListUs", () => {
  it("converts an array of ingredients from metric to US", () => {
    const expectedInput = ["237 ml water", "7 ml salt", "1 egg"];
    const expectedOutput = ["1 c water", "1/2 tbsp salt", "1 egg"];
    expect(getIngredientListUs(expectedInput)).toHaveReturnedWith(
      expectedOutput
    );
  });
});
