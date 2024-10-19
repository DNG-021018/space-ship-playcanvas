import {setupApp} from "./AppSetup.js";
import {setupCamera} from "./CameraControl.js";
import {setupLight, generatorMap} from "./MapManager.js";
import {generatorPlayer} from "./Rocket.js";
import {generatorFuel} from "./Fuel.js";
import {generatorRock} from "./Rock.js";
import {setupSkybox} from "./SkyboxSetup.js";
// import {generatorTrap} from "./Trap.js";
import {generatorWrech} from "./Wrech.js";

async function main() {
  const app = await setupApp();
  setupCamera(app);
  setupLight(app);
  setupSkybox(app);
  generatorMap(app);
  generatorFuel(app);
  generatorRock(app);
  generatorPlayer(app);
  // generatorTrap(app);
  generatorWrech(app);
}

main().catch(console.error);
