import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import "../setupTests";

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});

describe("Describe the test group", () => {
  it("Do addition", () => {
    expect(1 + 1).toEqual(2);
    expect(2 + 1).toEqual(3);
  });
});
