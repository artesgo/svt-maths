import { Difficulties } from "../models/difficulties";
import { Operations } from "../models/operations";
import { generateNumber, generateQuestion } from "./generator";
describe("generator", () => {
  Math.random = jest.fn().mockImplementation(() => {
    return 1;
  });

  it("should generate random number given difficulty", () => {
    const rand = generateNumber(Difficulties.easy);
    expect(Math.random).toHaveBeenCalled();
    expect(rand).toBe(10);
  });

  describe("should generate terms and answer", () => {
    it("given add operation and difficulty", () => {
      const question = generateQuestion(Difficulties.easy, Operations.add);
      expect(question.terms).toEqual([10, "+10"]);
      expect(question.answer).toBe(20);
    });
    it("given subtract operation and difficulty", () => {
      const question = generateQuestion(Difficulties.easy, Operations.subtract);
      expect(question.terms).toEqual([10, "-10"]);
      expect(question.answer).toBe(0);
    });
    it("given multiply operation and difficulty", () => {
      const question = generateQuestion(Difficulties.easy, Operations.multiply);
      expect(question.terms).toEqual([10, "x10"]);
      expect(question.answer).toBe(100);
    });
    it("given divide operation and difficulty", () => {
      const question = generateQuestion(Difficulties.easy, Operations.divide);
      expect(question.terms).toEqual([10, 100]);
      expect(question.answer).toBe(10);
    });
  });
});
