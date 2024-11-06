import { Server } from "./presentation/server";

const main = (): void => {
  Server.start();
};

(async () => {
  main();
})();
