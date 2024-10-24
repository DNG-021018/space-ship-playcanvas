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
  private charThrustPower: number = 8;
  private charRotZ: number = 0;
  private minRotZ: number = -130 * pc.math.DEG_TO_RAD;
  private maxRotZ: number = 130 * pc.math.DEG_TO_RAD;

  // player movement condition
  private _isGround = false;

  constructor(app) {
    super();
    this.player = new Player();

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
    if (this.collision == null) return;
    this.collision.on("collisionstart", function (result) {
      if (result.other.name == "fuel") {
        result.other.destroy();
      }
    });
  }

  private PickWrech() {
    if (this.collision == null) return;
    this.collision.on("collisionstart", function (result) {
      if (result.other.name == "wrech") {
        result.other.destroy();
        this.healSystem.heal(1);
      }
    });
  }

  private HitObstacle() {
    if (this.collision == null) return;
    this.collision.on("collisionstart", function (result) {
      if (result.other.name == "obstacle") {
        this.health.takeDamage(1);
        if (this.health.onDeath()) {
          window.location.reload();
        }
      }
    });
  }

  private checkGround() {
    if (this.collision == null) {
      return;
    }
    this.collision.on("collisionstart", function (result) {
      if (result.other.name == "ground") {
        this._isGround = true;
      }
    });

    this.collision.on("collisionend", function () {
      this._isGround = false;
    });
  }

  private Movement(dt: number) {
    if (this.app == null) return;
    let newMovement = new pc.Vec3(0, 0, 0);

    if (this.app.keyboard.isPressed(pc.KEY_A) && !this._isGround) {
      newMovement.x += this.charSpeed;
      if (this.charRotZ > this.minRotZ) {
        this.charRotZ -= this.charRot * dt;
        //debug
        console.log(this.charRotZ);
      }
    }

    if (this.app.keyboard.isPressed(pc.KEY_D) && !this._isGround) {
      newMovement.x -= this.charSpeed;
      if (this.charRotZ < this.maxRotZ) {
        this.charRotZ += this.charRot * dt;
        //debug
        console.log(this.charRotZ);
      }
    }

    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
      newMovement.y += this.charThrustPower;
      this.particle.playParticles();
      //debug
      console.log(newMovement.y + " " + this.particle.getParticlePlaying());
    }

    if (this.rigidbody == null) return;
    this.rigidbody.applyForce(newMovement.x, newMovement.y, 0);
    this.setEulerAngles(0, 180, this.charRotZ * pc.math.RAD_TO_DEG);
  }

  public update(dt: number) {
    this.Movement(dt);
    this.checkGround();
    this.HitObstacle();
    this.PickFuels();
    this.PickWrech();
  }
}
