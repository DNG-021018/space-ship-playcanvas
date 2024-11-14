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
import {SoundManager} from "../Sound/SoundManager";

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
  private soundManager: SoundManager;

  constructor(app: pc.Application) {
    this.app = app;
    this.setupPhysics();
    this.app.start();
    this.init();
  }

  private init() {
    this.light = new Light();
    this.app.root.addChild(this.light);

    this.skybox = new SkyboxManager(this.app);
    this.skybox.init();

    this.soundManager = new SoundManager();
    this.app.root.addChild(this.soundManager);
    this.soundManager.playBackgroundTheme();

    const assetManager = AssetManager.getInstance();
    assetManager.on("assetsLoaded", this.Loaded, this);
    assetManager.LoadAsset(this.app);
  }

  private Loaded() {
    this.uiManager = new UIManager(this.app);
    this.app.root.addChild(this.uiManager);
    this.uiManager.SetupUiMainMenu();

    this.LevelTest();
  }

  private LevelTest() {
    this.uiManager.SetUpUiInGame();

    this.ground = new Ground();
    this.app.root.addChild(this.ground);

    this.player = new Player(this.app, this.soundManager);
    this.app.root.addChild(this.player);
    this.player.update();

    this.camera = new Camera(this.player, this.app);
    this.app.root.addChild(this.camera);

    this.rock = new Rock(-10, -3.5, -10);
    this.app.root.addChild(this.rock);
    this.app.root.addChild(new Rock(10, -3.5, -10));

    this.wrech = new Wrech(this.app, this.soundManager, -10, 4, -10);
    this.app.root.addChild(this.wrech);
    this.app.root.addChild(new Wrech(this.app, this.soundManager, 10, 4, -10));

    this.fuel = new Fuel(this.app, this.soundManager, 15, 4, -10);
    this.app.root.addChild(this.fuel);
    this.app.root.addChild(new Fuel(this.app, this.soundManager, -15, 4, -10));
  }

  private setupPhysics() {
    if (this.app.systems.rigidbody == null) return;
    this.app.systems.rigidbody.gravity = new pc.Vec3(0, -9.8, 0);
  }
}
