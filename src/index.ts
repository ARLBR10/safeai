import WebServer from "./Structures/Server";
import Config from "./config/Config";
import { ServerConfigSchema } from "./Structures/Config";
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT as keyof typeof Config;

if (!ENVIRONMENT || !(ENVIRONMENT in Config)) {
  throw new Error("ENVIRONMENT variable is not set or is invalid.");
}

const Server = new WebServer(Config[ENVIRONMENT] as ServerConfigSchema);

Server.LoadModules(Server.Config.WebServer.Modules.Path)

Server.App.listen(
  Server.Config.WebServer.Port,
  () => {
    console.log(`server running on port ${Server.Config.WebServer.Port}`)
  }
);
