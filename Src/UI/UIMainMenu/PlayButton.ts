import * as pc from "playcanvas";
import {AssetKey} from "../../Enum/AssetKey";
import {BaseButton} from "../BaseButton";

export class PlayButton extends BaseButton {
  constructor() {
    super({
      width: 260,
      height: 123,
      textureAsset: AssetKey.IMGButtonPlayRectDefault,
    });

    this.Init();
  }

  private Init() {
    this.setAnchorPivot();
  }

  private setAnchorPivot() {
    if (this.element == null) return;
    this.element.anchor = new pc.Vec4(0.5, 0.4, 0.5, 0.4);
    this.element.pivot = new pc.Vec2(0.5, 0.5);
  }
}
