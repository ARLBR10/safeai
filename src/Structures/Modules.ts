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
  Path: string;
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
  Router: Express.Router;

  constructor(App: Webserver, config?: APIModule_Config) {
    this.App = App;
    this.Routes = [];
    if (config) {
      this.Path = config.Path ? config.Path : "/";
      this.About = config.About;
    }
    this.Router = Express.Router();
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
        Path: "/status",
        Method: "GET",
        Callback: (req: Express.Request, res: Express.Response) => {
          res.json({ message: "All system working fine!" });
        },
      },
    ];

    return this.Routes;
  }

  /**
   * Create a Express Router from a LIST
   *
   * @param Routes - List of HTTP Routes from type APIModule_Routes
   *
   * @returns An Express router full of routes
   *
   */
  CreateRouter(Routes: APIModule_Routes[]): Express.Router {
    Routes = Routes ? Routes : this.Routes

    // List routes and add to Router
    const HTTPMethods = {
      GET: this.Router.get,
      HEAD: this.Router.head,
      POST: this.Router.post,
      PUT: this.Router.put,
      DELETE: this.Router.delete,
      CONNECT: this.Router.connect,
      TRACE: this.Router.trace,
      PATCH: this.Router.patch,
    };

    for (const Route of Routes) {
      (this.Router as any)[Route.Method.toLowerCase()](Route.Path, Route.Callback); // Add route to Router
    }

    // Return
    return this.Router;
  }
}
