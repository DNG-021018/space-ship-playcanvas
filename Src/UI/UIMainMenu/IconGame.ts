import * as pc from "playcanvas";
import {AssetManager} from "../../Core/AssetManager";
import {AssetKey} from "../../Enum/AssetKey";

export class IconGame extends pc.Entity {
  constructor() {
    super();
    this.Init();
  }

  private Init() {
    this.BackGround();
  }

  private BackGround() {
    this.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: [0.5, 0.7, 0.5, 0.7],
      pivot: [0.5, 0.5],
      width: 560,
      height: 323,
      textureAsset: AssetManager.getInstance().getAsset(AssetKey.IMGIconPurusGame),
    });
  }
}
