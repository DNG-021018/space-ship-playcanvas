import * as pc from "playcanvas";
import {Player} from "./Player/Player";

export class Camera extends pc.Entity {
  private app: pc.Application;
  private player: Player;
  private colorBackground: pc.Color = new pc.Color(66 / 255, 135 / 255, 245 / 255);
  private offset: pc.Vec3 = new pc.Vec3(0, 1, -35);
  private angles: pc.Vec3 = new pc.Vec3(10, 180, 0);

  constructor(player: Player, app: pc.Application) {
    super();
    this.app = app;
    this.player = player;
    this.setupEventListeners();
    this.init();
  }

  private init() {
    this.name = "camera";
    this.addComponent("camera", {
      clearColor: this.colorBackground,
    });
    this.setPosition(this.offset);
    this.setEulerAngles(this.angles);
    return this;
  }

  public followPlayer() {
    if (!this.player) return;
    const playerPos = this.player.getPosition();
    this.setPosition(playerPos.x + this.offset.x, playerPos.y + this.offset.y, playerPos.z + this.offset.z);
  }

  private setupEventListeners() {
    window.addEventListener("resize", () => this.app.resizeCanvas());
    this.app.on("update", this.update.bind(this));
  }

  private update(dt: number) {
    this.followPlayer();
  }
}
