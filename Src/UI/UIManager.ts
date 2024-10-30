import * as pc from "playcanvas";
import {UIInGame} from "./UIInGame/UIInGame";
import {PauseMenu} from "./UIInGame/PauseMenu";

export class UIManager extends pc.Entity {
  private app: pc.Application;
  private uiInGame: UIInGame;

  constructor(app) {
    super();
    this.app = app;
    this.setUp();
    this.init();
  }

  public init() {
    this.uiInGame = new UIInGame(this.app);
    this.addChild(this.uiInGame);
  }

  private setUp() {
    this.addComponent("screen", {
      referenceResolution: new pc.Vec2(this.app.graphicsDevice.width, this.app.graphicsDevice.height),
      scaleBlend: 0,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });
  }
}
