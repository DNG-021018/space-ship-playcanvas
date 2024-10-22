import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class Fuel extends pc.Entity {
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelItemsWrech);
  private fuelPosition: pc.Vec3 = new pc.Vec3(0, 2, -10);
  private scale: number = 5;
  private health: number = 1;
  private charRotY: number = 0;
  private charRot: number = 1;

  constructor() {
    super();
    this.init();
  }

  public getHealth() {
    return this.health;
  }

  private init() {
    this.setPosition(this.fuelPosition);
    this.setLocalScale(this.scale, this.scale, this.scale);
    this.loadModel();
    this.setRigidbody();
    this.setCollision();

    return this;
  }

  private loadModel() {
    this.name = "item_wrech";

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
    this.addComponent("collision", {type: "capsule"});
    if (this.collision == null) return;
    this.collision.radius = this.scale / 4;
    this.collision.height = this.scale;
  }

  public update(dt) {
    this.charRotY -= this.charRot * dt;
    this.setEulerAngles(0, this.charRotY * pc.math.RAD_TO_DEG, 0);
  }
}
