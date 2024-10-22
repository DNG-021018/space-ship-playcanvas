import * as pc from "playcanvas";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

export class Ground extends pc.Entity {
  private MapTextureAssets = AssetManager.getInstance().getAsset(AssetKey.TextureGround);
  private scaleX: number = 200;
  private scaleY: number = 1;
  private scaleZ: number = 300;
  private groundPosition: pc.Vec3 = new pc.Vec3(0, -4, 0);

  constructor() {
    super();
    this.init;
  }

  private init() {
    this.setPosition(this.groundPosition);
    this.setLocalScale(this.scaleX, this.scaleY, this.scaleZ);
    this.loadModel();
    this.setRigidbody();
    this.setCollision();

    return this;
  }

  private loadModel() {
    this.name = "ground";
    this.addComponent("render", {type: "box"});

    const material = new pc.StandardMaterial();
    const assetTexure = this.MapTextureAssets;
    material.diffuseMap = assetTexure?.resource;
    material.update();
    const meshInstance = this.model?.meshInstances[0];
    if (meshInstance) {
      meshInstance.material = material;
    }
  }

  private setRigidbody() {
    this.addComponent("rigidbody");
    if (this.rigidbody == null) return;
    this.rigidbody.type = pc.BODYTYPE_STATIC;
    this.rigidbody.mass = 1;
    this.rigidbody.restitution = 0;
    this.rigidbody.friction = 1;
  }

  private setCollision() {
    this.addComponent("collision");
    if (this.collision == null) return;
    this.collision.type = "box";
    this.collision.halfExtents = new pc.Vec3(this.scaleX / 2, this.scaleY / 2, this.scaleZ / 2);
  }
}
