import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";
import {SoundManager} from "../Sound/SoundManager";

export class Wrech extends pc.Entity {
  private app: pc.Application;
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelItemsWrech);
  private scale: number = 5;
  private health: number = 1;
  private charRotY: number = 0;
  private charRot: number = 1;
  private posX: number;
  private posY: number;
  private posZ: number;
  private soundManager: SoundManager;

  constructor(app: pc.Application, soundManager: SoundManager, wrechPosX: number, wrechPosY: number, wrechPosZ: number) {
    super();
    this.app = app;
    this.soundManager = soundManager;
    this.posX = wrechPosX;
    this.posY = wrechPosY;
    this.posZ = wrechPosZ;
    this.init();
  }

  public getHealth() {
    return this.health;
  }

  private init() {
    this.setPosition(this.posX, this.posY, this.posZ);
    this.setLocalScale(this.scale, this.scale, this.scale);
    this.loadModel();
    this.setupEventListeners();
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
        this.soundManager.playSFXItemPickUp();
        this.destroy();
      }
    });
  }

  private setupEventListeners() {
    window.addEventListener("resize", () => this.app.resizeCanvas());
    this.app.on("update", this.update.bind(this));
  }

  public update(dt) {
    this.CollisionUpdate();
    this.charRotY -= this.charRot * dt;
    this.setEulerAngles(90, this.charRotY * pc.math.RAD_TO_DEG, 0);
  }
}
