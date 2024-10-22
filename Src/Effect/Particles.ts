function particlesSystem() {
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
      [0, -20],
      [0, 0],
    ]),
    localVelocityGraph2: new pc.CurveSet([
      [1, 0],
      [1, 20],
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

  particlesEntity.setPosition(0, -2.5, -10);

  particlesEntity.particlesystem?.play();
}
