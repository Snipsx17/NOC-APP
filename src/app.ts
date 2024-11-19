import { Server } from "@/presentation/server";
import { MongoDB } from "./data/mongo/init";
import { envs } from "./config/plugins/envs.plugin";

const main = async (): Promise<void> => {
  try {
    await MongoDB.connect({
      dbUri: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  } catch (error) {
    console.error(error);
  }

  Server.start();
};

(async () => {
  await main();
})();
