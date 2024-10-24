import * as pc from "playcanvas";
import {Camera} from "../Entity/Camera";
import {Light} from "../Entity/Light";
import {Ground} from "../Entity/Ground";
import {Rock} from "../Entity/Rock";
import {Wrech} from "../Entity/Wrech";
import {Fuel} from "../Entity/Fuel";
import {Player} from "../Entity/Player/Player";
import {AssetManager} from "./AssetManager";
import {ParticlesSystem} from "../Effect/Particles";
import {SkyboxManager} from "./SkyboxSetup";
import {PlayerManager} from "../Entity/Player/PlayerManager";

export class SceneGameManager {
  private app: pc.Application;
  private camera: Camera;
  private light: Light;
  private ground: Ground;
  private rock: Rock;
  private wrech: Wrech;
  private fuel: Fuel;
  private player: Player;
  private playerManager: PlayerManager;
  private skybox: SkyboxManager;

  constructor(app: pc.Application) {
    this.app = app;
    this.app.start();
    this.init();
    this.setupPhysics();
    this.setupEventListeners();
  }

  private init() {
    this.camera = new Camera();
    this.RootChild(this.camera);

    this.light = new Light();
    this.RootChild(this.light);

    this.skybox = new SkyboxManager(this.app);

    const assetManager = AssetManager.getInstance();
    assetManager.on("assetsLoaded", this.assetsLoaded, this);
    assetManager.LoadAsset(this.app);
  }

  private assetsLoaded() {
    this.ground = new Ground();
    this.RootChild(this.ground);

    this.playerManager = new PlayerManager(this.app);
    this.RootChild(this.playerManager);

    this.player = new Player();
    this.playerManager.addChild(this.player);

    this.rock = new Rock();
    this.RootChild(this.rock);

    this.wrech = new Wrech();
    this.RootChild(this.wrech);

    this.fuel = new Fuel();
    this.RootChild(this.fuel);
  }

  private RootChild(entity: pc.Entity) {
    return this.app.root.addChild(entity);
  }

  private setupEventListeners() {
    window.addEventListener("resize", () => this.app.resizeCanvas());
    this.app.on("update", this.updateEvents.bind(this));
  }

  private updateEvents(dt: number) {
    this.playerManager?.update(dt);
    this.fuel?.update(dt);
    this.rock?.update(dt);
    this.wrech?.update(dt);
  }

  private setupPhysics() {
    this.app.systems.rigidbody?.gravity.set(0, -3, 0);
  }
}
