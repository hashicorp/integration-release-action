import { main as notifyRelease } from "./lib/notify-release";
import { main as validateHcl } from "./lib/validate-hcl";

async function run() {
  await validateHcl();
  await notifyRelease();
}

run();
