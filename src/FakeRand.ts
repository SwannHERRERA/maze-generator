import Random from "./Random";

class FakeRand implements Random {
  value: number[] = [
    7,
    6,
    9,
    7,
    6,
    9,
    0,
    9,
    4,
    8,
    9,
    7,
    6,
    5,
    8,
    8,
    7,
    0,
    3,
    1,
    0,
    1,
    5,
    3,
    1,
    3,
    3,
    6,
    9,
    1,
    1,
    5,
    2,
    0,
    3,
    8,
  ];
  cursor: number = 0;

  /**
   * nextInt
   * Generates a non-negative random integer uniformly distributed in the range from 0,
   * inclusive, to max, exclusive.
   */
  public nextInt(max: number) {
    if (this.cursor >= this.value.length) {
      this.cursor = 0;
    }
    const res = this.value[this.cursor] % max;
    this.cursor += 1;
    return res;
  }
}
export default FakeRand;
