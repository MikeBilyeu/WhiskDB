const { getTotalTime } = require("./utils");

describe("Format the google recipe schema data", () => {
  it("should format XML duration into total time format", () => {
    const expectedInput = "P0Y0M0DT0H10M0.000S";
    const expectedOutput = { hours: "", minutes: "10" };

    expect(getTotalTime(expectedInput)).toEqual(expectedOutput);
  });
});
