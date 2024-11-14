import * as pc from "playcanvas";
import {BaseButton} from "../BaseButton";
import {AssetKey} from "../../Enum/AssetKey";
import {EventManager} from "../../Utils/EventEmiter";

export class BtnHome extends BaseButton {
  constructor() {
    super({
      width: 100,
      height: 100,
      textureAsset: AssetKey.IMGIconHome,
    });
    this.setAnchorPivot();
    this.setButtonOnClick();
    this.setLocalPosition(new pc.Vec3(150, 0, 0));
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
    EventManager.emit("CloseUIInGame");
    EventManager.emit("OpenUiMainMenu");
  }
}
