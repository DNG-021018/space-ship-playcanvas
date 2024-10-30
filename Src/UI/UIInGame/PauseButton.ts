import * as pc from "playcanvas";
import {BaseButton} from "../BaseButton";
import {AssetKey} from "../../Enum/AssetKey";
import {PauseMenu} from "./PauseMenu";

export class BtnPauseGame extends BaseButton {
  private app: pc.Application;
  private pauseMenu: PauseMenu;

  constructor(app: pc.Application, pauseMenu: PauseMenu) {
    super({
      width: 80,
      height: 80,
      textureAsset: AssetKey.IMGIconPause,
    });
    this.pauseMenu = pauseMenu;
    this.app = app;
    this.enabled = true;
    this.setAnchorPivot();
    this.setButtonOnClick();
    this.setButtonOnPress();
    this.setLocalPosition(-30, -30, 0);
  }

  private setAnchorPivot() {
    if (this.element == null) return;
    this.element.anchor = new pc.Vec4(1, 1, 1, 1);
    this.element.pivot = new pc.Vec2(1, 1);
  }

  private setButtonOnClick() {
    if (this.button == null) return;
    this.button.on("click", this.togglePause.bind(this));
  }

  private setButtonOnPress() {
    this.app.keyboard.on("keydown", (event) => {
      if (event.key === pc.KEY_ESCAPE) {
        this.togglePause();
      }
    });
  }

  private togglePause() {
    if (this.enabled) {
      this.pauseMenu.enabled = true;
      this.enabled = false;
      this.app.timeScale = 0;
    } else {
      this.pauseMenu.enabled = false;
      this.enabled = true;
      this.app.timeScale = 1;
    }
  }
}
