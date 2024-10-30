import * as pc from "playcanvas";
import {IUIController} from "../IUIController";
import {BtnPauseGame} from "./PauseButton";
import {PauseMenu} from "./PauseMenu";

export class UIInGame extends pc.Entity implements IUIController {
  private app: pc.Application;
  private btnPause: BtnPauseGame;
  private pauseMenu: PauseMenu;

  constructor(app: pc.Application) {
    super();
    this.app = app;
    this.setElement();
    this.setUpBegin();
  }

  private setElement() {
    this.addComponent("element", {
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: this.app.graphicsDevice.width,
      height: this.app.graphicsDevice.height,
      type: pc.ELEMENTTYPE_GROUP,
    });
  }

  private setUpBegin() {
    this.pauseMenu = new PauseMenu(this.app);
    this.addChild(this.pauseMenu);

    this.btnPause = new BtnPauseGame(this.app, this.pauseMenu);
    this.addChild(this.btnPause);
  }

  private init() {}

  Open(): void {
    this.init();
    this.enabled = true;
  }

  Close(): void {
    this.enabled = false;
  }
}
