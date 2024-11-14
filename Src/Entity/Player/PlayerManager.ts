import * as pc from "playcanvas";
import {ParticlesSystem} from "../../Effect/Particles";
import {Player} from "./Player";
import {SoundManager} from "../../Sound/SoundManager";

export class PlayerManager extends pc.Entity {
  private app: pc.Application;
  private player: Player;
  private particle: ParticlesSystem;
  // player movement stats
  private charSpeed: number = 10;
  private charRot: number = 3;
  private charThrustPower: number = 30;
  private charRotZ: number = 0;
  private minRotZ: number = -50 * pc.math.DEG_TO_RAD;
  private soundManager: SoundManager;
  private maxRotZ: number = 50 * pc.math.DEG_TO_RAD;

  constructor(app, player, soundManager: SoundManager) {
    super();
    this.app = app;
    this.player = player;
    this.soundManager = soundManager;
    this.init();
  }

  private init() {
    this.particle = new ParticlesSystem();
    this.player.addChild(this.particle);
  }

  private Movement(dt: number) {
    if (this.app == null) return;

    const movementForce = new pc.Vec3(0, 0, 0);

    if (this.app.keyboard.isPressed(pc.KEY_D) || this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
      movementForce.x -= this.charSpeed;
      this.charRotZ = Math.min(this.charRotZ + this.charRot * dt, this.maxRotZ);
    } else if (this.app.keyboard.isPressed(pc.KEY_A) || this.app.keyboard.isPressed(pc.KEY_LEFT)) {
      movementForce.x += this.charSpeed;
      this.charRotZ = Math.max(this.charRotZ - this.charRot * dt, this.minRotZ);
    } else {
      if (this.charRotZ > 0) {
        this.charRotZ = Math.max(this.charRotZ - this.charRot * dt, 0);
      } else if (this.charRotZ < 0) {
        this.charRotZ = Math.min(this.charRotZ + this.charRot * dt, 0);
      }
    }

    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
      movementForce.y += this.charThrustPower;
      this.soundManager.playSFXEngine();
      this.particle.playParticles();
    } else {
      this.soundManager.stopSFXEngine();
      this.particle.stopParticles();
    }
    if (!this.player.rigidbody) return;

    this.player.rigidbody.applyForce(movementForce);

    this.player.setEulerAngles(0, 180, this.charRotZ * pc.math.RAD_TO_DEG);
  }

  public update(dt: number) {
    this.Movement(dt);
  }
}
