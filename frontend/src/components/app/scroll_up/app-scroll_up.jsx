import React, { useEffect } from "react";
import { withRouter } from "react-router";

const ScrollUp = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return props.children;
};

export default withRouter(ScrollUp);
