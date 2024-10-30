import * as pc from "playcanvas";
import {BtnResumeGame} from "./ResumeButton";
import {BtnRestartGame} from "./RestartButton";
import {BtnHome} from "./HomeButton";

export class PauseMenu extends pc.Entity {
  private app: pc.Application;
  private ResumeBtn: BtnResumeGame;
  private ReplayBtn: BtnRestartGame;
  private HomeBtn: BtnHome;

  constructor(app: pc.Application) {
    super();
    this.app = app;
    this.enabled = false;
    this.Init();
  }

  private Init() {
    this.BackGround();
    this.SetUp();
  }

  private SetUp() {
    this.ResumeBtn = new BtnResumeGame(this.app, this);
    this.addChild(this.ResumeBtn);

    this.ReplayBtn = new BtnRestartGame();
    this.addChild(this.ReplayBtn);

    this.HomeBtn = new BtnHome();
    this.addChild(this.HomeBtn);
  }

  private BackGround() {
    this.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      width: this.app.graphicsDevice.width,
      height: this.app.graphicsDevice.height,
      color: new pc.Color(0, 0, 0),
      opacity: 0.5,
    });
  }
}
