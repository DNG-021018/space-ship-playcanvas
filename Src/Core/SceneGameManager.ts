import * as pc from "playcanvas";

export class SceneGameManager {
  private app: pc.Application;

  constructor(app: pc.Application) {
    this.app = app;
    this.app.start();
    this.setupPhysics();
  }

  private setupPhysics() {
    this.app.systems.rigidbody?.gravity.set(0, -3, 0);
  }
}
