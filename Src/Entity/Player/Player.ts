import * as pc from "playcanvas";
import {AssetManager} from "../../Core/AssetManager";
import {AssetKey} from "../../Enum/AssetKey";
import {PlayerManager} from "./PlayerManager";

export class Player extends pc.Entity {
  // Init
  private playerPos: pc.Vec3 = new pc.Vec3(0, -2, -10);
  private playerScale: number = 0.1;

  // assets
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelPlayerRocket);

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.setPosition(this.playerPos);
    this.setLocalScale(this.playerScale, this.playerScale, this.playerScale);
    this.loadPlayer();
    this.setRigidbody();
    this.setCollision();

    return this;
  }

  private loadPlayer() {
    this.name = "player";

    this.addComponent("model", {
      type: "asset",
      asset: this.charModelAsset,
    });
  }

  private setRigidbody() {
    this.addComponent("rigidbody", {type: "dynamic"});
    if (this.rigidbody == null) return;
    this.rigidbody.mass = 1;
    this.rigidbody.restitution = 0;
    this.rigidbody.friction = 1;
    this.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    this.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  private setCollision() {
    this.addComponent("collision", {type: "box"});
    if (this.collision == null) return;
    this.collision.halfExtents = new pc.Vec3(0.5, 1, 0.5);
    this.collision.linearOffset = new pc.Vec3(0, 1, 0);
  }
}
