import * as pc from "playcanvas";
import {HealthSystem} from "../../Module/HealthSystem";
import {Player} from "./Player";
import {ParticlesSystem} from "../../Effect/Particles";

export class PlayerManager extends pc.Entity {
  private app: pc.Application;
  private player: Player;
  private particle: ParticlesSystem;

  //player stats
  private charLife: number = 3;
  private healSystem;

  // player movement stats
  private charSpeed: number = 3;
  private charRot: number = 3;
  private charThrustPower: number = 10;
  private charRotZ: number = 0;
  private minRotZ: number = -180 * pc.math.DEG_TO_RAD;
  private maxRotZ: number = 180 * pc.math.DEG_TO_RAD;
  private newMovement = new pc.Vec3(0, 0, 0);

  // player movement condition
  private _isGround = false;

  constructor(app) {
    super();

    this.player = new Player();
    this.addChild(this.player);

    this.particle = new ParticlesSystem();
    this.player.addChild(this.particle);

    this.app = app;
    this.init();
  }

  private init() {
    this.playerLife();
  }

  private playerLife() {
    this.healSystem = new HealthSystem(this.charLife);
    return this.healSystem;
  }

  private PickFuels() {
    if (this.player.collision == null) return;
    this.player.collision.on("collisionstart", function (result) {
      if (result.other.name == "fuel") {
        result.other.destroy();
      }
    });
  }

  private PickWrech() {
    if (this.player.collision == null) return;
    this.player.collision.on("collisionstart", function (result) {
      if (result.other.name == "wrech") {
        result.other.destroy();
        this.healSystem.heal(1);
      }
    });
  }

  private HitObstacle() {
    if (this.player.collision == null) return;
    this.player.collision.on("collisionstart", function (result) {
      if (result.other.name == "obstacle") {
        this.health?.takeDamage(1);
        if (this.health.onDeath()) {
          window.location.reload();
        }
      }
    });
  }

  private checkGround() {
    if (this.player.collision == null) {
      return;
    }
    this.player.collision.on("collisionstart", function (result) {
      if (result.other.name == "ground") {
        this._isGround = true;
      }
    });

    this.player.collision.on("collisionend", function () {
      this._isGround = false;
    });
  }

  private Movement(dt: number) {
    if (this.app == null) return;

    if (this.app.keyboard.isPressed(pc.KEY_D)) {
      this.newMovement.x -= this.charSpeed;

      if (this.charRotZ < this.maxRotZ) {
        this.charRotZ += this.charRot * dt;
      }
    }
    if (this.app.keyboard.isPressed(pc.KEY_A)) {
      this.newMovement.x += this.charSpeed;
      if (this.charRotZ > this.minRotZ) {
        this.charRotZ -= this.charRot * dt;
      }
    }
    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
      this.newMovement.y += this.charThrustPower * dt;
      this.particle.playParticles();
    } else {
      this.particle.stopParticles();
    }

    this.player.rigidbody?.applyForce(this.newMovement.x, this.newMovement.y, 0);
    this.player.setEulerAngles(0, 180, this.charRotZ * pc.math.RAD_TO_DEG);
  }

  public update(dt: number) {
    this.Movement(dt);
    this.checkGround();
    this.HitObstacle();
    this.PickFuels();
    this.PickWrech();
  }
}
