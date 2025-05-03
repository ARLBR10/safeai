// Imports/Libs
import WebServer from "./Structures/Server";
import Config from "./config/Config";
import { ServerConfigSchema } from "./Structures/Config";
import Logger from './Tools/logger'
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT as keyof typeof Config;

if (!ENVIRONMENT || !(ENVIRONMENT in Config)) {
  throw new Error("ENVIRONMENT variable is not set or is invalid.");
}

const Server = new WebServer(Config[ENVIRONMENT] as ServerConfigSchema);

(async () => {
  // Webserver loading
  Server.LoadModules(Server.Config.WebServer.Modules.Path)
  await Server.ConnectToPrisma()

  // Start port of ExpressJS
  Server.App.listen(
    Server.Config.WebServer.Port,
    () => {
      Logger(
        "ready",
        `Started Webserver at port '${Server.Config.WebServer.Port}'`
      );
    }
  );
})();

