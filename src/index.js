import { initRouterDriver } from "./api/routes/drivers.tourist.js";

async function main() {
  const app = await  initRouterDriver();
  app.listen(4000);
}

main();
