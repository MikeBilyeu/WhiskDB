import React from "react";
import { shallow } from "enzyme";
import { Button } from "./Button";
import { checkProps } from "../utils/testingUtils";

describe("<Button />", () => {
  it("should render a button element", () => {
    const component = shallow(<Button onClick={() => {}}>Test Button</Button>);
    expect(component.type()).toEqual("button");
  });

  describe("Checking PropTypes", () => {
    it("should not throw a warning", () => {
      const expectedProps = {
        onClick: () => {},
        className: "test string",
        children: "test string"
      };
      const propsErr = checkProps(Button, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
});
