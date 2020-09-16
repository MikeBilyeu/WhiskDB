const renderTime = ({ hours: hrs, minutes: mins }) => {
  if (hrs && mins) {
    return `${hrs}Hr ${mins}Min`;
  } else if (!mins) {
    return `${hrs} Hour${hrs > 1 ? "s" : ""}`;
  }
  return `${mins} Minute${mins > 1 ? "s" : ""}`;
};

export default renderTime;
