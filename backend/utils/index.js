function convertTimeToMin(time) {
  const timeHours = time.hours > 0 ? time.hours : 0;
  const timeMinutes = time.minutes > 0 ? parseInt(time.minutes) : 0;
  return timeHours * 60 + timeMinutes;
}
module.exports = { convertTimeToMin };
