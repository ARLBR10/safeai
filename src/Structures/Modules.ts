// Modules and Packages
import Express from "express";
import Webserver from "./Server";

// Interfaces/Types

interface APIModule_Config {
  RootPath?: boolean; // They are going to use an /endpoint/route or /route
  Path?: string;
  About: APIModule_About;
}

export interface APIModule_Routes {
  Route: string;
  Method:
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "TRACE"
    | "PATCH";
  Callback: any; // res, req
}

interface APIModule_About {
  Version?: string;
  Description: string;
}

// API Module Class
export default class APIModule {
  Path?: string;
  App: Webserver;
  About?: APIModule_About;
  Routes: APIModule_Routes[];
  Router?: Express.Router;

  constructor(App: Webserver, config?: APIModule_Config) {
    this.App = App;
    this.Routes = [];
    if (config) {
      this.Path = config.Path ? config.Path : "/";
      this.About = config.About;
    }
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
  /* RegisterRoutes(): APIModule_Routes[] {
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
  } */

  /**
   * Create a Express Router from a LIST
   *
   * @param Routes - List of HTTP Routes from type APIModule_Routes
   *
   * @returns An Express router full of routes
   *
   */
  CreateRouter(Routes?: APIModule_Routes[]): Express.Router {
    Routes = Routes ? Routes : this.Routes
    const Router = Express.Router();

    // List routes and add to Router
    const HTTPMethods = {
      GET: Router.get,
      HEAD: Router.head,
      POST: Router.post,
      PUT: Router.put,
      DELETE: Router.delete,
      CONNECT: Router.connect,
      TRACE: Router.trace,
      PATCH: Router.patch,
    };

    for (const Route of Routes) {
      HTTPMethods[Route.Method](Route.Route, Route.Callback); // Route add to Router
    }

    // Return
    this.Router = Router;
    return this.Router;
  }
}
