import { main as notifyRelease } from "./lib/notify-release";
import { main as validateHcl } from "./lib/validate-hcl";

async function run() {
  try {
    await validateHcl();
  } catch (err) {
    // don't throw this error to avoid having GitHub actions
    // print the minified dist/index.js code
    return;
  }

  await notifyRelease();
}

run();
