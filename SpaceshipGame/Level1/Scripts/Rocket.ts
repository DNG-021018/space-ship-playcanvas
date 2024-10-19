import * as pc from "playcanvas";
import * as gameManager from "./GameManager";
import {getRockDamage} from "./Rock";
import {HealthSystem} from "./HealthSystem";
import {getTrapDamage} from "./Trap";
import {getHealth} from "./Wrech";

// assets
const assets = {
  charModelAsset: new pc.Asset("Rocketship", "model", {url: "./Assets/Rocketship.glb"}),
};

//player stats
const charLife = 3;
var playerHeath = new HealthSystem(charLife);

// player movement stats
const charSpeed = 3;
const charRot = 3;
const charJumpPower = 8;
var charRotZ = 0;
const minRotZ = -40 * pc.math.DEG_TO_RAD;
const maxRotZ = 40 * pc.math.DEG_TO_RAD;

// player movement condition
var _isGround = false;

export function generatorPlayer(app) {
  if (app == null) {
    return;
  }

  const player = RenderPlayer(app);
  particlesSystem(player);
  checkGround(player);
  Movement(app, player);
  PickFuels(player);
  HitObstacle(player);
  HitTrap(player);
  PickWrech(player);
}

function RenderPlayer(app) {
  const player = new pc.Entity();
  app.root.addChild(player);
  let scale = 0.1;

  player.setPosition(0, -2, -10);
  player.setLocalScale(scale, scale, scale);

  const assetListLoader = new pc.AssetListLoader(Object.values(assets), app.assets);
  assetListLoader.load(() => {
    player.addComponent("model", {
      type: "asset",
      asset: assets.charModelAsset,
    });
  });

  player.addComponent("rigidbody", {type: "dynamic", mass: 1, restitution: 0, friction: 1});
  player.addComponent("collision", {
    type: "box",
    halfExtents: new pc.Vec3(0.5, 1, 0.5),
    linearOffset: new pc.Vec3(0, 1, 0),
  });

  if (player.rigidbody) {
    player.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    player.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  return player;
}

function particlesSystem(mainObject) {
  if (mainObject == null) {
    return;
  }
  // particles system
  const particlesEntity = new pc.Entity();
  const color = new pc.Color(235 / 255, 134 / 255, 0 / 255);

  particlesEntity.addComponent("particlesystem", {
    numParticles: 100,
    lifetime: 0.5,
    rate: 0.1,
    rate2: 0.02,
    emitterShape: pc.EMITTERSHAPE_BOX,
    blendType: pc.BLEND_ADDITIVEALPHA,
    emitterExtents: new pc.Vec3(0, 0, 0),
    initialVelocity: 1,
    loop: true,
    autoPlay: false,
    localSpace: true,
    // LOCAL VELOCITY GRAPH
    localVelocityGraph: new pc.CurveSet([
      [0, 0],
      [0, -5],
      [0, 0],
    ]),
    localVelocityGraph2: new pc.CurveSet([
      [1, 0],
      [1, 5],
      [1, 0],
    ]),
    // RADIANT SPEED
    RadialSpeedGraph: new pc.CurveSet([0.333, 1.625]),
    RadialSpeedGraph2: new pc.CurveSet([1, 5]),
    // SCALE
    scaleGraph: new pc.Curve([0.05, 0.6, 1, 0.4]),
    colorGraph: new pc.CurveSet([
      [0, color.r],
      [0.5, color.g],
      [1, color.b],
    ]),
    colorGraph2: new pc.CurveSet([
      [0, color.r],
      [0.5, color.g],
      [1, color.b],
    ]),
  });
  mainObject.addChild(particlesEntity);
  particlesEntity.setPosition(0, -2.5, -10);

  particlesEntity.particlesystem?.play();
}

function PickFuels(mainObject) {
  if (mainObject == null) {
    return;
  }
  mainObject.collision.on("collisionstart", function (result) {
    if (result.other.name == "fuel") {
      result.other.destroy();
    }
  });
}

function PickWrech(mainObject) {
  if (mainObject == null) {
    return;
  }

  mainObject.health = playerHeath;

  mainObject.collision.on("collisionstart", function (result) {
    if (result.other.name == "wrech") {
      result.other.destroy();
      mainObject.health.heal(getHealth());
    }
  });
}

function HitObstacle(mainObject) {
  if (mainObject == null) {
    return;
  }

  mainObject.health = playerHeath;

  mainObject.collision.on("collisionstart", function (result) {
    if (result.other.name == "obstacle") {
      mainObject.health.takeDamage(getRockDamage());
      if (mainObject.health.onDeath()) {
        gameManager.ReloadLevel();
      }
    }
  });
}

function HitTrap(mainObject) {
  if (mainObject == null) {
    return;
  }

  mainObject.health = playerHeath;

  mainObject.collision.on("collisionstart", function (result) {
    if (result.other.name == "trap") {
      mainObject.health.takeDamage(getTrapDamage());
      if (mainObject.health.onDeath()) {
        gameManager.ReloadLevel();
      }
    }
  });
}

function checkGround(mainObject) {
  if (mainObject == null) {
    return;
  }
  mainObject.collision.on("collisionstart", function (result) {
    if (result.other.name == "ground") {
      _isGround = true;
    }
  });

  mainObject.collision.on("collisionend", function () {
    _isGround = false;
  });
}

function Movement(app, mainObject) {
  if (app == null || mainObject == null || mainObject.rigidbody == null) {
    return;
  }

  app.on("update", (dt) => {
    let newMovement = new pc.Vec3(0, 0, 0);

    if (app.keyboard.isPressed(pc.KEY_A) && !_isGround) {
      newMovement.x += charSpeed;
      if (charRotZ > minRotZ) {
        charRotZ -= charRot * dt;
      }
    }

    if (app.keyboard.isPressed(pc.KEY_D) && !_isGround) {
      newMovement.x -= charSpeed;
      if (charRotZ < maxRotZ) {
        charRotZ += charRot * dt;
      }
    }

    if (app.keyboard.isPressed(pc.KEY_SPACE)) {
      newMovement.y += charJumpPower;
    }

    mainObject.rigidbody.applyForce(newMovement.x, newMovement.y, 0);
    mainObject.setEulerAngles(0, 180, charRotZ * pc.math.RAD_TO_DEG);
  });
}
