import getIngredientListUs from "./getIngredientListUs";

describe("getIngredientListUs", () => {
  it("converts an array of ingredients from metric to US", () => {
    const expectedInput = [
      { amount: 237, unit: "ml.", ingredient: "water" },
      { amount: 6.88, unit: "ml.", ingredient: "salt" },
      { amount: 1, unit: "", ingredient: "egg" }
    ];
    const expectedOutput = [
      { amount: [{ amount: 1, unit: "cup" }], ingredient: "water" },
      { amount: [{ amount: "1¼", unit: "tsp." }], ingredient: "salt" },
      { amount: 1, ingredient: "egg" }
    ];
    expect(getIngredientListUs(expectedInput)).toEqual(expectedOutput);
  });
});
