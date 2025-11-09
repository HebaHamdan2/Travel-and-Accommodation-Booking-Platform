export const normalizeAmenityName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/free|24[-\s]?hour|service|available/g, "") // remove common filler words
    .replace(/[^a-z]/g, ""); // remove spaces, dashes, etc.
};
