import Random from "./Random";

class FakeRand implements Random {
  value: number[] = [7, 6, 9, 7, 6, 5, 0, 4, 8, 1, 2, 3];
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
