import { main as notifyRelease } from "./lib/notify-release";
import { main as validateHcl } from "./lib/validate-hcl";

async function run() {
  try {
    await validateHcl();
  } catch (err) {
    throw err;
  }

  await notifyRelease();
}

run();
