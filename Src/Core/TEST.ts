import * as pc from "playcanvas";

export class BoxEntity extends pc.Entity {
  private boxPosition: pc.Vec3 = new pc.Vec3(0, 1, 0); // Vị trí của box
  private boxScale: number = 1; // Kích thước của box

  constructor() {
    super();
    this.init();
  }

  private init() {
    // Đặt vị trí và tỉ lệ cho box
    this.setPosition(this.boxPosition);
    this.setLocalScale(this.boxScale, this.boxScale, this.boxScale);

    // Tạo box model
    this.addComponent("model", {
      type: "box",
    });

    // Thêm rigidbody
    this.addComponent("rigidbody", {
      type: "dynamic", // Loại rigidbody: 'static', 'dynamic', hoặc 'kinematic'
      mass: 1, // Khối lượng của box
    });

    // Thêm collision
    this.addComponent("collision", {
      type: "box", // Kiểu collision (box, sphere, capsule, ...)
      halfExtents: new pc.Vec3(0.5, 0.5, 0.5), // Kích thước của collision box
    });
  }
}
