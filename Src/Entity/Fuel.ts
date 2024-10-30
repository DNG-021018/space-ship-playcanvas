import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";
import {SoundManager} from "../Sound/SoundBase";

export class Fuel extends pc.Entity {
  private app: pc.Application;
  private charModelAsset = AssetManager.getInstance().getAsset(AssetKey.ModelItemsFuel);
  // private fuelPosition: pc.Vec3 = new pc.Vec3(0, 2, -10);
  private scale: number = 0.7;
  private charRotY: number = 0;
  private charRot: number = 1;
  private pickUpItems: SoundManager;
  private posX: number;
  private posY: number;
  private posZ: number;

  constructor(app: pc.Application, fuelPosX: number, fuelPosY: number, fuelPosZ: number) {
    super();
    this.app = app;
    this.posX = fuelPosX;
    this.posY = fuelPosY;
    this.posZ = fuelPosZ;
    this.init();
  }

  private init() {
    this.setPosition(this.posX, this.posY, this.posZ);
    this.setLocalScale(this.scale, this.scale, this.scale);
    this.loadModel();
    this.setupEventListeners();
    this.setCollision();
    this.pickUpItems = new SoundManager(this.app);
    this.pickUpItems.loadAndPlaySoundFromURL("../../../Assets/Sound/item-pick-up.mp3", "pickupFuel", false, 1);
    this.CollisionUpdate();
    return this;
  }

  private loadModel() {
    this.name = "item_fuel";

    this.addComponent("model", {
      type: "asset",
      asset: this.charModelAsset,
    });
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
        this.pickUpItems.playSound("pickupFuel");
        this.destroy();
      }
    });
  }

  private setupEventListeners() {
    window.addEventListener("resize", () => this.app.resizeCanvas());
    this.app.on("update", this.update.bind(this));
  }

  public update(dt) {
    this.charRotY -= this.charRot * dt;
    this.setEulerAngles(0, this.charRotY * pc.math.RAD_TO_DEG, 0);
  }
}
