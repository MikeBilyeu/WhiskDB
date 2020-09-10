const { formateTotalTime, formatServings } = require("./utils");

describe("Format the google recipe schema data", () => {
  it("should format long XML duration into total time format", () => {
    const expectedInput = "P0Y0M0DT1H10M0.000S";
    const expectedOutput = { hours: "1", minutes: "10" };

    expect(formateTotalTime(expectedInput)).toEqual(expectedOutput);
  });

  it("should format short XML duration into total time format", () => {
    const expectedInput = "PT30M";
    const expectedOutput = { hours: "", minutes: "30" };

    expect(formateTotalTime(expectedInput)).toEqual(expectedOutput);
  });

  it("should parse the servings from the yeild", () => {
    const expectedInput = "4 cookies";
    const expectedOutput = "4";

    expect(formatServings(expectedInput)).toBe(expectedOutput);
  });

  it("should return empty string when it can't match a servings", () => {
    const expectedInput = "four cookies";
    const expectedOutput = "";

    expect(formatServings(expectedInput)).toBe(expectedOutput);
  });

  it("should return empty string when servings is 0", () => {
    const expectedInput = "0 servings";
    const expectedOutput = "";

    expect(formatServings(expectedInput)).toBe(expectedOutput);
  });
});
