export const formatDateWithDay = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
