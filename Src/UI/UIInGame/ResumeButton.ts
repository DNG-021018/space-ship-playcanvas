import * as pc from "playcanvas";
import {BaseButton} from "../BaseButton";
import {AssetKey} from "../../Enum/AssetKey";
import {PauseMenu} from "./PauseMenu";

export class BtnResumeGame extends BaseButton {
  private app: pc.Application;
  private pauseMenu: PauseMenu;

  constructor(app: pc.Application, pauseMenu: PauseMenu) {
    super({
      width: 100,
      height: 100,
      textureAsset: AssetKey.IMGIconPlay,
    });
    this.pauseMenu = pauseMenu;
    this.app = app;
    this.setAnchorPivot();
    this.setButtonOnClick();
    this.setLocalPosition(new pc.Vec3(-150, 0, 0));
  }

  private setAnchorPivot() {
    if (this.element == null) return;
    this.element.anchor = new pc.Vec4(0.5, 0.5, 0.5, 0.5);
    this.element.pivot = new pc.Vec2(0.5, 0.5);
  }

  private setButtonOnClick() {
    if (this.button == null) return;
    this.button.on("click", this.togglePause.bind(this));
  }

  private togglePause() {
    this.pauseMenu.enabled = false;
    this.app.timeScale = 1;
  }
}
