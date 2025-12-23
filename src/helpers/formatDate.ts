export const formatDate = (obj: any) => {
  if (!obj || obj == null) return "";

  const year = obj.year;
  const month = String(obj.month).padStart(2, "0");
  const day = String(obj.day).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
