import * as pc from "playcanvas";
import {AssetManager} from "../../Core/AssetManager";
import {AssetKey} from "../../Enum/AssetKey";
import {PlayerManager} from "./PlayerManager";

export class Player extends pc.Entity {
  // Init
  private playerPos: pc.Vec3 = new pc.Vec3(0, 0, -10);
  private playerScale: number = 0.1;
  private playerMangager: PlayerManager;
  private app: pc.Application;

  // assets
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelPlayerRocket);

  constructor(app) {
    super();
    this.app = app;
    this.init();
  }

  private init() {
    this.playerMangager = new PlayerManager(this.app, this);
    this.root.addChild(this.playerMangager);
    this.setPosition(this.playerPos);
    this.setLocalScale(this.playerScale, this.playerScale, this.playerScale);
    this.loadPlayer();
    this.setRigidbody();
    this.setCollision();
    return this;
  }

  private loadPlayer() {
    this.name = "Player";

    this.addComponent("model", {
      type: "asset",
      asset: this.charModelAsset,
    });
  }

  private setRigidbody() {
    this.addComponent("rigidbody", {type: pc.BODYTYPE_DYNAMIC});
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
    this.collision.halfExtents = new pc.Vec3(0.5, 0.8, 0.5);
    this.collision.linearOffset = new pc.Vec3(0, 1, 0);
  }

  public update() {
    this.app.on("update", (dt) => {
      this.playerMangager.update(dt);
    });
  }
}
