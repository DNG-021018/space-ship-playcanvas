import * as pc from "playcanvas";
import {BackGround} from "./Background";
import {PlayButton} from "./PlayButton";
import {IconGame} from "./IconGame";
import {EventManager} from "../../Utils/EventEmiter";

export class UIMainMenu extends pc.Entity {
  private app: pc.Application;
  private background: BackGround;
  private playButton: PlayButton;
  private iconGame: IconGame;

  constructor(app: pc.Application) {
    super();
    this.app = app;
    this.setElement();
    this.setUpBegin();
    this.setButtonOnClick();
  }

  private setUpBegin() {
    this.background = new BackGround(this.app);
    this.addChild(this.background);

    this.playButton = new PlayButton();
    this.addChild(this.playButton);

    this.iconGame = new IconGame();
    this.addChild(this.iconGame);
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

  private setButtonOnClick() {
    if (this.playButton.button == null) return;
    this.playButton.button.on("click", this.togglePlayBtn.bind(this));
  }

  private togglePlayBtn() {
    EventManager.emit("OpenUIInGame");
    this.enabled = false;
  }
}
