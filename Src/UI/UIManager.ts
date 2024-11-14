import * as pc from "playcanvas";
import {UIInGame} from "./UIInGame/UIInGame";
import {UIMainMenu} from "./UIMainMenu/UIMainMenu";
import {EventManager} from "../Utils/EventEmiter";

export class UIManager extends pc.Entity {
  private app: pc.Application;
  private uiInGame: UIInGame;
  private uiMainMenu: UIMainMenu;

  constructor(app) {
    super();
    this.app = app;
    this.registerEvent();
    this.setUp();
  }

  private registerEvent() {
    EventManager.on("OpenUIInGame", this.OpenUiInGame.bind(this));
    EventManager.on("CloseUIInGame", this.CloseUiInGame.bind(this));
    EventManager.on("OpenUiMainMenu", this.OpenUiMainMenu.bind(this));
    EventManager.on("CloseUiMainMenu", this.CloseUiMainMenu.bind(this));
  }

  public SetUpUiInGame() {
    this.uiInGame = new UIInGame(this.app);
    this.addChild(this.uiInGame);
  }

  public SetupUiMainMenu() {
    this.uiMainMenu = new UIMainMenu(this.app);
    this.addChild(this.uiMainMenu);
  }

  private setUp() {
    this.addComponent("screen", {
      referenceResolution: new pc.Vec2(this.app.graphicsDevice.width, this.app.graphicsDevice.height),
      scaleBlend: 0,
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
    });
  }

  public OpenUiInGame() {
    if (this.uiInGame == null) return;
    this.uiInGame.enabled = true;
  }

  public CloseUiInGame() {
    if (this.uiInGame == null) return;
    this.uiInGame.enabled = false;
  }

  public OpenUiMainMenu() {
    if (this.uiMainMenu == null) return;
    this.uiMainMenu.enabled = true;
  }

  public CloseUiMainMenu() {
    if (this.uiMainMenu == null) return;
    this.uiMainMenu.enabled = false;
  }
}
