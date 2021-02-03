import Random from "./Random";
class Rand implements Random {
  /**
   * nextInt
   * Generates a non-negative random integer uniformly distributed in the range from 0,
   * inclusive, to max, exclusive.
   */
  public nextInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
export default Rand;
