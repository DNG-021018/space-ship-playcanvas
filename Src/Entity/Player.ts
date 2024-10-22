import * as pc from "playcanvas";
import {HealthSystem} from "../Module/HealthSystem";
import {AssetManager} from "../Core/AssetManager";
import {AssetKey} from "../Enum/AssetKey";

// assets
const assets = {
  charModelAsset: AssetManager.getInstance().getAsset(AssetKey.ModelPlayerRocket),
};

//player stats
const charLife = 3;
var playerHeath = new HealthSystem(charLife);

// player movement stats
const charSpeed = 3;
const charRot = 3;
const charJumpPower = 8;
var charRotZ = 0;
const minRotZ = -130 * pc.math.DEG_TO_RAD;
const maxRotZ = 130 * pc.math.DEG_TO_RAD;

// player movement condition
var _isGround = false;

export function generatorPlayer(app) {
  if (app == null) {
    return;
  }

  const player = RenderPlayer(app);
  checkGround(player);
  Movement(app, player);
  PickFuels(player);
  HitObstacle(player);
  PickWrech(player);
}

function RenderPlayer(app) {
  const player = new pc.Entity();
  app.root.addChild(player);
  let scale = 0.1;

  player.setPosition(0, -2, -10);
  player.setLocalScale(scale, scale, scale);

  player.addComponent("model", {
    type: "asset",
    asset: assets.charModelAsset,
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
      mainObject.health.heal();
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
      mainObject.health.takeDamage();
      if (mainObject.health.onDeath()) {
        window.location.reload();
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
