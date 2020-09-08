import formatIngredientList from "./formatIngredientList";
import {
  splitIngredientStr,
  replaceFractionSymbols,
  getMetricAmount
} from "./formatIngredientList";

describe("formatIngredientList", () => {
  describe("replaceFractionSymbols", () => {
    it("converts amount with fraction symbol to regular string fractions", () => {
      const expectedInput = "1½";
      const expectedOutput = "1 1/2";
      expect(replaceFractionSymbols(expectedInput)).toEqual(expectedOutput);
    });
  });

  describe("getMetricAmount", () => {
    it("converts pound amount and unit to metric", () => {
      const expectedAmountInput = "1";
      const expectedUnitInput = "lb";
      const expectedOutput = {
        decimalAmount: 453.592,
        metricUnit: "g"
      };
      expect(getMetricAmount(expectedAmountInput, expectedUnitInput)).toEqual(
        expectedOutput
      );
    });

    it("converts liter amount and unit to metric", () => {
      const expectedAmountInput = "1";
      const expectedUnitInput = "liter";
      const expectedOutput = {
        decimalAmount: 1000,
        metricUnit: "ml"
      };
      expect(getMetricAmount(expectedAmountInput, expectedUnitInput)).toEqual(
        expectedOutput
      );
    });
  });

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
      "1 1/2 tsp water",
      "1 egg",
      "900 g olive oil"
    ];
    const expectedOutput = [
      { amount: "1360.7759999999998", unit: "g", ingredient: "rice" },
      { amount: "7.5", unit: "ml", ingredient: "water" },
      { amount: "1", unit: "", ingredient: "egg" },
      { amount: "900", unit: "g", ingredient: "olive oil" }
    ];
    expect(formatIngredientList(expectedInput)).toEqual(expectedOutput);
  });
});
