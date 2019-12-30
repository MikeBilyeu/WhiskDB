import formatIngredientList from "./formatIngredientList";
import { splitIngredientStr } from "./formatIngredientList";

describe("formatIngredientList", () => {
  describe("splitIngredientStr", () => {
    it("converts string to object with amount, unit, and ingredient", () => {
      const expectedInput = "1.5 tsp water";
      const expectedOutput = {
        amount: "1.5",
        unit: "tsp",
        ingredient: "water"
      };
      expect(splitIngredientStr(expectedInput)).toEqual(expectedOutput);
    });
  });

  it("converts ingredients into a metric objects", () => {
    const expectedInput = [
      "3 lb rice",
      "1.5 tsp water",
      "1 egg",
      "900 g olive oil"
    ];
    const expectedOutput = [
      { amount: "1360.7759999999998", unit: "g.", ingredient: "rice" },
      { amount: "7.3935", unit: "ml.", ingredient: "water" },
      { amount: "1", unit: "", ingredient: "egg" },
      { amount: "900", unit: "g.", ingredient: "olive oil" }
    ];
    expect(formatIngredientList(expectedInput)).toEqual(expectedOutput);
  });
});
