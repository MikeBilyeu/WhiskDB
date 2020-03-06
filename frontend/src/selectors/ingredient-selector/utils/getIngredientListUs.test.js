import getIngredientListUs from "./getIngredientListUs";

describe("getIngredientListUs", () => {
  it("converts an array of ingredients from metric to US", () => {
    const expectedInput = [
      { amount: 240, unit: "ml", ingredient: "water" },
      { amount: 7.5, unit: "ml", ingredient: "salt" },
      { amount: 1, unit: "", ingredient: "egg" }
    ];
    const expectedOutput = [
      { amount: [{ amount: 1, unit: "cup" }], ingredient: "water" },
      { amount: [{ amount: "½", unit: "Tbsp" }], ingredient: "salt" },
      { amount: 1, ingredient: "egg" }
    ];
    expect(getIngredientListUs(expectedInput)).toEqual(expectedOutput);
  });
});
