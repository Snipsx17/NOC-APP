import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  EMAIL_ADDRESS: env.get("EMAIL_ADDRESS").required().asEmailString(),
  PROD: env.get("PROD").required().asString(),
};
