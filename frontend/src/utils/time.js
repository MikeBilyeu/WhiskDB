const renderTime = ({ hours, minutes }) => {
  const hr =
    hours && !minutes
      ? `${hours}Hour${hours > 1 ? "s" : ""}`
      : hours && minutes
      ? `${hours}Hr`
      : "";
  const min =
    !hours && minutes
      ? `${minutes}Minute${minutes > 1 ? "s" : ""}`
      : hours && minutes
      ? `${minutes}Min`
      : "";
  return `${hr} ${min}`;
};

export default renderTime;
