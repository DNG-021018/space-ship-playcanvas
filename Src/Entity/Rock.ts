import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";
import {SoundManager} from "../Sound/SoundManager";

export class Rock extends pc.Entity {
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelObstacleRock);
  // private rockPosition: pc.Vec3 = new pc.Vec3(-5, 2, -10);
  private posX: number;
  private posY: number;
  private posZ: number;
  private scale: number = 1;
  private damage: number = 1;
  // private charRotY: number = 0;
  // private charRot: number = 0.3;

  constructor(rockPosX: number, rockPosY: number, rockPosZ: number) {
    super();
    this.posX = rockPosX;
    this.posY = rockPosY;
    this.posZ = rockPosZ;
    this.init();
  }

  public getRockDamage() {
    return this.damage;
  }

  private init() {
    this.setPosition(this.posX, this.posY, this.posZ);
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
    this.addComponent("rigidbody", {type: pc.BODYTYPE_KINEMATIC});
    if (this.rigidbody == null) return;
    this.rigidbody.restitution = 0;
    this.rigidbody.friction = 0;
  }

  private setCollision() {
    this.addComponent("collision", {type: "sphere"});
    if (this.collision == null) return;
    this.collision.radius = 1.75;
    this.collision.linearOffset = new pc.Vec3(-0.3, 1.31, 0);
  }

  // public update(dt) {
  //   this.charRotY -= this.charRot * dt;
  //   this.setEulerAngles(0, this.charRotY * pc.math.RAD_TO_DEG, 0);
  // }
}
