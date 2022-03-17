export const checkExpired = (eventDate) => {
  const today = new Date().getTime();
  const targetDate = new Date(eventDate).getTime();

  return today > targetDate ? "expired" : "ongoing";
}