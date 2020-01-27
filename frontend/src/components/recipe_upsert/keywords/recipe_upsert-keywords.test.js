import Keywords from "../keywords";
import { checkProps } from "../../../utils/testingUtils";

describe("<Keywords />", () => {
  describe("Checking PropTypes", () => {
    it("should not throw a warning", () => {
      const expectedProps = {
        className: "test string"
      };
      const propsErr = checkProps(Keywords, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
});
