export const formatDate = (date: string | undefined) => {
  if (!date) return;

  return date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
};
