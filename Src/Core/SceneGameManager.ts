import * as pc from "playcanvas";
import {Camera} from "../Entity/Camera";
import {Light} from "../Entity/Light";
import {Ground} from "../Entity/Ground";
import {Rock} from "../Entity/Rock";
import {Wrech} from "../Entity/Wrech";
import {Fuel} from "../Entity/Fuel";
import {Player} from "../Entity/Player/Player";
import {AssetManager} from "./AssetManager";
import {SkyboxManager} from "./SkyboxSetup";
import {UIManager} from "../UI/UIManager";
import {SoundManager} from "../Sound/SoundBase";

export class SceneGameManager {
  private app: pc.Application;
  private camera: Camera;
  private light: Light;
  private ground: Ground;
  private rock: Rock;
  private wrech: Wrech;
  private fuel: Fuel;
  private player: Player;
  private uiManager: UIManager;
  private skybox: SkyboxManager;
  private themeSound: SoundManager;

  constructor(app: pc.Application) {
    this.app = app;
    this.setupPhysics();
    this.setupEventListeners();
    this.app.start();
    this.init();
  }

  private init() {
    this.light = new Light();
    this.RootChild(this.light);

    this.skybox = new SkyboxManager(this.app);
    this.skybox.init();

    const assetManager = AssetManager.getInstance();
    assetManager.on("assetsLoaded", this.Loaded, this);
    assetManager.LoadAsset(this.app);
  }

  private Loaded() {
    this.themeSound = new SoundManager(this.app);
    this.themeSound.loadAndPlaySoundFromURL("../../../Assets/Sound/theme.wav", "theme", true, 0.4);
    this.themeSound.playSound("theme");
    this.RootChild(this.themeSound);

    this.uiManager = new UIManager(this.app);
    this.RootChild(this.uiManager);

    this.ground = new Ground();
    this.RootChild(this.ground);

    this.player = new Player(this.app);
    this.RootChild(this.player);
    this.player?.update();

    this.camera = new Camera(this.player);
    this.RootChild(this.camera);

    this.rock = new Rock(-10, -3.5, -10);
    this.RootChild(this.rock);
    this.RootChild(new Rock(10, -3.5, -10));

    this.wrech = new Wrech(this.app, -10, 4, -10);
    this.RootChild(this.wrech);
    this.RootChild(new Wrech(this.app, 10, 4, -10));

    this.fuel = new Fuel(this.app, 15, 4, -10);
    this.RootChild(this.fuel);
    this.RootChild(new Fuel(this.app, -15, 4, -10));
  }

  private RootChild(entity: pc.Entity) {
    return this.app.root.addChild(entity);
  }

  private setupEventListeners() {
    window.addEventListener("resize", () => this.app.resizeCanvas());
    this.app.on("update", this.updateEvents.bind(this));
  }

  private updateEvents(dt: number) {
    this.camera?.update(dt);
  }

  private setupPhysics() {
    if (this.app.systems.rigidbody == null) return;
    this.app.systems.rigidbody.gravity = new pc.Vec3(0, -9.8, 0);
  }
}
