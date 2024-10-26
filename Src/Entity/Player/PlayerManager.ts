import * as pc from "playcanvas";
import {HealthSystem} from "../../Module/HealthSystem";
import {ParticlesSystem} from "../../Effect/Particles";
import {Player} from "./Player";
import {Rock} from "../Rock";
import {Fuel} from "../Fuel";
import {Wrech} from "../Wrech";

export class PlayerManager extends pc.Entity {
  private app: pc.Application;
  private player: Player;
  private particle: ParticlesSystem;
  private obstacle: Rock;
  private fuel: Fuel;
  private wrench: Wrech;
  private healSystem: HealthSystem;

  //player life
  private charLife: number = 3;

  // player movement stats
  private charSpeed: number = 10;
  private charRot: number = 3;
  private charThrustPower: number = 30;
  private charRotZ: number = 0;
  private minRotZ: number = -50 * pc.math.DEG_TO_RAD;
  private maxRotZ: number = 50 * pc.math.DEG_TO_RAD;
  private newMovement = new pc.Vec3(0, 0, 0);

  // player movement condition
  private _isGround = true;

  constructor(app, player) {
    super();
    this.app = app;
    this.player = player;
    this.init();
  }

  private init() {
    this.obstacle = new Rock();
    this.fuel = new Fuel();
    this.wrench = new Wrech();
    this.healSystem = new HealthSystem(this.charLife);

    this.particle = new ParticlesSystem();
    this.player.addChild(this.particle);

    this.CollisionUpdate();
  }

  private CollisionDetection(result) {
    if (result == null) {
      console.log("Result not found");
      return;
    }

    if (result.other.name == "obstacle") {
      if (!this.player.rigidbody) return;
      this.player.rigidbody.linearVelocity = pc.Vec3.ZERO;
      this.healSystem.takeDamage(this.obstacle.getRockDamage());

      if (this.healSystem.onDeath()) {
        console.log("Player dead");
        // window.location.reload();
      }
      return;
    }
  }

  private CollisionUpdate() {
    if (this.player.collision == null) return;
    this.player.collision.on(pc.CollisionComponent.EVENT_COLLISIONSTART, this.CollisionDetection.bind(this));
  }

  private Movement(dt: number) {
    if (this.app == null) return;

    const movementForce = new pc.Vec3(0, 0, 0);

    // left right movement
    if (this.app.keyboard.isPressed(pc.KEY_D)) {
      movementForce.x -= this.charSpeed; // Tạo lực di chuyển theo chiều x (sang trái)
      this.charRotZ = Math.min(this.charRotZ + this.charRot * dt, this.maxRotZ);
    } else if (this.app.keyboard.isPressed(pc.KEY_A)) {
      movementForce.x += this.charSpeed; // Tạo lực di chuyển theo chiều x (sang phải)
      this.charRotZ = Math.max(this.charRotZ - this.charRot * dt, this.minRotZ);
    } else {
      // Giảm độ xoay khi không di chuyển
      if (this.charRotZ > 0) {
        this.charRotZ = Math.max(this.charRotZ - this.charRot * dt, 0);
      } else if (this.charRotZ < 0) {
        this.charRotZ = Math.min(this.charRotZ + this.charRot * dt, 0);
      }
    }

    // Thrust movement (nhảy)
    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
      movementForce.y += this.charThrustPower; // Tạo lực đẩy lên
      this.particle.playParticles();
    } else {
      this.particle.stopParticles();
    }

    // Giới hạn tốc độ tối đa
    const maxSpeed = 10;
    if (!this.player.rigidbody) return;
    const currentVelocity = this.player.rigidbody.linearVelocity;
    if (currentVelocity.length() < maxSpeed) {
      this.player.rigidbody.applyForce(movementForce); // Áp dụng lực di chuyển
    }

    // Cập nhật góc quay
    this.player.setEulerAngles(0, 180, this.charRotZ * pc.math.RAD_TO_DEG);
  }

  public update(dt: number) {
    this.Movement(dt);
  }
}
