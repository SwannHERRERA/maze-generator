import add from "../index";

test("should check 2 + 2 = 4", () => {
  const result = add(2, 2);
  const expectedResult = 4;
  expect(result).toBe(expectedResult);
});
