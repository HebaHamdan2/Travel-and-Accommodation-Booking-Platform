export const mockOnSubmit = jest.fn<Promise<boolean>, [string, string]>();
export const validCity = {
  name: "New York",
  description: "Big city",
};
export const mockOnSubmitUpdate = jest
  .fn<Promise<boolean>, [{ name: string; description: string }]>()
  .mockResolvedValue(true);
export const selectedCity = {
  id: 1,
  name: "Paris",
  description: "City of lights",
};
