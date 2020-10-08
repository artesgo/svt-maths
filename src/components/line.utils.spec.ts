import { UID } from "../utils/uid";
import { getPosition, getDigits, appendUid } from "./line.utils";

describe("line utils", () => {
  beforeEach(() => {
    let i = 0;
    UID.createId = jest.fn().mockImplementation(() => {
      return i++;
    });
  });

  describe("getPosition", () => {
    it("should retrieve digit position", () => {
      let arr = [1, 2, 3, 4, 5];
      let ind = 2;
      let position = getPosition(arr, ind);

      expect(position).toBe("hundreds");
    });
  });

  describe("getDigits", () => {
    it("should retrieve digit position", () => {
      let num = 123;
      let digits = getDigits(num);

      expect(digits).toEqual([
        { id: 0, digit: "1" },
        { id: 1, digit: "2" },
        { id: 2, digit: "3" },
      ]);
    });
  });

  describe("appendUid", () => {
    it("should retrieve digit position", () => {
      let withId = appendUid(["1"]);
      expect(withId).toEqual([
        {
          id: 0,
          digit: "1",
        },
      ]);
    });
  });
});
