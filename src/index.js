import { initRouterDriver } from "./api/app.js";
// import { serverless } from "serverless-http";

async function main() {
  const app = await  initRouterDriver();
  app.listen(4000);
}

main();

// let sls = null
// export async function handler(event) {
//   if(sls === null) {
//     const app = await  initRouterDriver();
//     sls = serverless(app)
//   }
//   sls(event)
// }
  