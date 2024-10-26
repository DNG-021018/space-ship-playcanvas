import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class Wrech extends pc.Entity {
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelItemsWrech);
  private wrechPosition: pc.Vec3 = new pc.Vec3(5, 2, -10);
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
    this.setPosition(this.wrechPosition);
    this.setLocalScale(this.scale, this.scale, this.scale);
    this.loadModel();
    // this.setRigidbody();
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
    this.addComponent("rigidbody", {type: pc.BODYTYPE_STATIC});
    if (this.rigidbody == null) return;
    this.rigidbody.restitution = 0;
    this.rigidbody.friction = 0;
  }

  private setCollision() {
    this.addComponent("collision", {type: "box"});
    if (this.collision == null) return;
    this.collision.halfExtents = new pc.Vec3(0.16, 0.16, 0.9);
    this.collision.linearOffset = new pc.Vec3(0, 0, 0.63);
  }

  private CollisionUpdate() {
    if (this.collision == null) return;
    this.collision.on(pc.CollisionComponent.EVENT_TRIGGERENTER, (result) => {
      if (result.name === "Player") {
        this.destroy();
      }
    });
  }

  public update(dt) {
    this.CollisionUpdate();
    this.charRotY -= this.charRot * dt;
    this.setEulerAngles(90, this.charRotY * pc.math.RAD_TO_DEG, 0);
  }
}
