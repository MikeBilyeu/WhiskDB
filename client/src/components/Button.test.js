import React from "react";
import { shallow } from "enzyme";
import { Button } from "./Button";
import checkPropTypes from "check-prop-types";

//import getTestId from "./utils/testUtils.js";

describe("<Button />", () => {
  it("should render a button element", () => {
    const component = shallow(<Button />);
    expect(component.type()).toEqual("button");
  });

  describe("Checking PropTypes", () => {
    it("should not throw a warning", () => {
      const expectedProps = {
        onClick: () => {},
        className: "test string",
        children: "test string"
      };
      const propsErr = checkPropTypes(Button.propTypes, expectedProps, "props");
      expect(propsErr).toBeUndefined();
    });
  });
});
