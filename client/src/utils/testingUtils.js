import checkPropTypes from "check-prop-types";

export const getByTestId = (component, id) => {
  return component.find(`[date-test="${id}"]`);
};

export const checkProps = (component, expectedProps) => {
  return checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
};
