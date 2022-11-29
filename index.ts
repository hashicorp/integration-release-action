import { main as notifyRelease } from "./notify-release";

async function run() {
  await notifyRelease();
}

run();
