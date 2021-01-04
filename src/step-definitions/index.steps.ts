import { binding, given, then, when } from "cucumber-tsflow";
import { assert } from "chai";
import add from "../index";

@binding()
export class IndexSteps {
  private result: number | null = null;
  private param1: number = 0;
  private param2: number = 0;

  @given(/Two number equal to (\d*) and (\d*)/)
  public given2NumberBothEqualTo(x: number, y: number) {
    this.param1 = Number(x);
    this.param2 = Number(y);
  }

  @when(/The function add is call/)
  public whenTheFunctionAddIsCalled() {
    this.result = add(this.param1, this.param2);
  }

  @then(/The result should be (\d*)/)
  public accountBalanceShouldEqual(expectedAmount: number) {
    assert.equal(expectedAmount, this.result);
  }
}
