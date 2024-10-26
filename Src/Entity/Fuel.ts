import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class Fuel extends pc.Entity {
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelItemsFuel);
  private fuelPosition: pc.Vec3 = new pc.Vec3(0, 2, -10);
  private scale: number = 0.7;
  private charRotY: number = 0;
  private charRot: number = 1;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.setPosition(this.fuelPosition);
    this.setLocalScale(this.scale, this.scale, this.scale);
    this.loadModel();
    // this.setRigidbody();
    this.setCollision();

    return this;
  }

  private loadModel() {
    this.name = "item_fuel";

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
    this.collision.halfExtents = new pc.Vec3(0.4, 0.4, 0.4);
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
    this.setEulerAngles(0, this.charRotY * pc.math.RAD_TO_DEG, 0);
  }
}
