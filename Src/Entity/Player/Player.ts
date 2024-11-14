import * as pc from "playcanvas";
import {AssetManager} from "../../Core/AssetManager";
import {AssetKey} from "../../Enum/AssetKey";
import {PlayerManager} from "./PlayerManager";
import {SoundManager} from "../../Sound/SoundManager";

export class Player extends pc.Entity {
  // Init
  private app: pc.Application;
  private playerPos: pc.Vec3 = new pc.Vec3(0, -2, -10);
  private playerScale: number = 0.1;
  private playerMangager: PlayerManager;
  private soundManager: SoundManager;

  // assets
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelPlayerRocket);

  constructor(app, soundManager: SoundManager) {
    super();
    this.app = app;
    this.soundManager = soundManager;
    this.init();
  }

  private init() {
    this.playerMangager = new PlayerManager(this.app, this, this.soundManager);
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

  private CollisionDetection(result) {
    if (result.other && result.other.name == "obstacle") {
      if (!this.rigidbody) return;
      this.soundManager.playSFXExplosion();
      this.app.timeScale = 0;
      setTimeout(() => {
        window.location.reload();
        return;
      }, 200);
    }
  }

  private CollisionUpdate() {
    if (this.collision == null) return;
    this.collision.on(pc.CollisionComponent.EVENT_COLLISIONSTART, (result) => {
      this.CollisionDetection(result);
    });
  }

  private resetZPosition() {
    const currentPosition = this.getPosition();
    currentPosition.z = -10;
    this.setPosition(currentPosition);
  }

  public update() {
    this.app.on("update", (dt) => {
      this.playerMangager.update(dt);
      this.CollisionUpdate();
      this.resetZPosition();
    });
  }
}
