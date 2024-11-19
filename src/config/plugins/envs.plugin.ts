import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_ADDRESS: env.get("MAILER_ADDRESS").required().asEmailString(),
  MAILER_SECRET: env.get("MAILER_SECRET").required().asString(),
  PROD: env.get("PROD").required().asString(),

  //MONGO DB
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),
};
