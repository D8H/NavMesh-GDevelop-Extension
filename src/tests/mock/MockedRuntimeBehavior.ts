import { MockedRuntimeObject } from "./MockedRuntimeObject";

export class MockedRuntimeBehavior {
  owner: MockedRuntimeObject;

  constructor(owner: MockedRuntimeObject) {
    this.owner = owner;
  }

  activated() {
    return true;
  }
}
