import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_ADDRESS: env.get("MAILER_ADDRESS").required().asEmailString(),
  MAILER_SECRET: env.get("MAILER_SECRET").required().asString(),
  PROD: env.get("PROD").required().asString(),
};
