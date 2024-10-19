import * as pc from "playcanvas";

var damage = 3;

export function getTrapDamage() {
  return damage;
}

export function generatorTrap(app) {
  if (app == null) {
    return;
  }
  const shape = "cone";
  const scale = 1;
  const trap = new pc.Entity();
  app.root.addChild(trap);
  trap.name = "trap";

  trap.setPosition(5, -3, -10);
  trap.setLocalScale(scale, scale, scale);

  trap.addComponent("render", {type: shape});
  trap.addComponent("rigidbody", {type: "kinematic", mass: 0, restitution: 0, friction: 0});
  trap.addComponent("collision", {type: shape, radius: scale / 2, height: scale});

  if (trap.rigidbody) {
    trap.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    trap.rigidbody.angularFactor = new pc.Vec3(1, 1, 0);
  }

  return trap;
}
