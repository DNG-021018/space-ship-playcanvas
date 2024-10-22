import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class Rock extends pc.Entity {
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelObstacleRock);
  private rockPosition: pc.Vec3 = new pc.Vec3(-5, 2, -10);
  private scale: number = 1;
  private radius: number = 1.75;
  private collisionOffset: pc.Vec3 = new pc.Vec3(-0.3, 1.31, 0);
  private damage: number = 1;
  private charRotY: number = 0;
  private charRot: number = 0.3;

  constructor() {
    super();
    this.init();
  }

  public getRockDamage() {
    return this.damage;
  }

  private init() {
    this.setPosition(this.rockPosition);
    this.setLocalScale(this.scale, this.scale, this.scale);
    this.loadModel();
    this.setRigidbody();
    this.setCollision();

    return this;
  }

  private loadModel() {
    this.name = "obstacle";

    this.addComponent("model", {
      type: "asset",
      asset: this.charModelAsset,
    });
  }

  private setRigidbody() {
    this.addComponent("rigidbody", {type: "kinematic"});
    if (this.rigidbody == null) return;
    this.rigidbody.mass = 0;
    this.rigidbody.restitution = 0;
    this.rigidbody.friction = 0;
    this.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    this.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  private setCollision() {
    this.addComponent("collision", {type: "sphere"});
    if (this.collision == null) return;
    this.collision.radius = this.radius;
    this.collision.linearOffset = this.collisionOffset;
  }

  public update(dt) {
    this.charRotY -= this.charRot * dt;
    this.setEulerAngles(0, this.charRotY * pc.math.RAD_TO_DEG, 0);
  }
}
