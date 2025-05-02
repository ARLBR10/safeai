// Modules and Packages
import APIModule from "../Structures/Modules";
import WebServer from "../Structures/Server";
import Express from "express";
import { APIModule_Routes } from "../Structures/Modules";

// Interfaces/Types

// Module Class
export default class extends APIModule {
  constructor(Webserver: WebServer) {
    super(Webserver, {
      About: {
        Description: "Root PATH for the API",
      },
      RootPath: true,
    });
  }

  /**
   * Add Routes to the JSON to be later add to the Express Router
   *
   * @remarks
   * This method is made FOR being created after an class extends not to the Main Class
   *
   * @returns An list of routes with it Method and Callbacks
   *
   */
  RegisterRoutes(): APIModule_Routes[] {
    this.Routes = [
      {
        Route: "/status",
        Method: "GET",
        Callback: (req: Express.Request, res: Express.Response) => {
          res.json({ message: "All system working fine!" });
        },
      },
    ];

    return this.Routes;
  }
}
