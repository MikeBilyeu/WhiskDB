import renderTime from "./time.js";

describe("Convert the totalTime object into a string", () => {
  it("Returns a string of 1Hr 20Min", () => {
    const expectedInput = { hours: 1, minutes: 20 };
    const expectedOutput = "1Hr 20Min";

    expect(renderTime(expectedInput)).toEqual(expectedOutput);
  });

  it("Returns a string of 2 Hours", () => {
    const expectedInput = { hours: 2, minutes: 0 };
    const expectedOutput = "2 Hours";

    expect(renderTime(expectedInput)).toEqual(expectedOutput);
  });

  it("Returns a string of 1 Hour", () => {
    const expectedInput = { hours: 1, minutes: 0 };
    const expectedOutput = "1 Hour";

    expect(renderTime(expectedInput)).toEqual(expectedOutput);
  });

  it("Returns a string of 30 Minutes", () => {
    const expectedInput = { hours: 0, minutes: 30 };
    const expectedOutput = "30 Minutes";

    expect(renderTime(expectedInput)).toEqual(expectedOutput);
  });
});
