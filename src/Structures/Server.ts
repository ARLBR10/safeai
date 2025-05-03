// Modules and Packages
import Express from "express";
import { PrismaClient } from "@prisma/client";
import APIModule from "./Modules";
import * as fs from "fs";
import * as path from "path";
import { ServerConfigSchema } from "./Config";

const prisma = new PrismaClient();

// Interfaces/Types

// Main Class
export default class WebServer {
  App!: Express.Application;
  Config: ServerConfigSchema;

  constructor(Config: ServerConfigSchema) {
    this.Config = Config;
    this.Init();
    this.ConnectToPrisma();
  }

  /**
   * Initialize the Express WebApp
   *
   * @returns none
   */
  Init() {
    this.App = Express();
    this.App.use(Express.json());
  }

  /**
   * Initialize and connect Database
   *
   * @returns none
   */
  async ConnectToPrisma() {
    await prisma.$connect();
  }

  /**
   * Check files at a Path and create a class of every one of them
   *
   * @param Path - Path for the modules folder
   *
   * @returns none
   */
  async LoadModules(Path: string) {
    // Read Files
    const files = fs.readdirSync(Path);
    for (const file of files) {
      try {
        const ModuleFile = await import(
          path.join(process.cwd(), `${Path}/${file}`)
        );
        const ModuleClass = ModuleFile.default as typeof APIModule;

        let Module = new ModuleClass(this);

        if (Module.Path == '/') {
          this.App.use(await Module.CreateRouter(await Module.RegisterRoutes()));
        } else {
          this.App.use(
            `/${Module.Path || file}`,
            Module.CreateRouter(Module.RegisterRoutes())
          );
        }
      } catch (err) {
        console.error(`Failed to load module ${file}:`, err);
      }
    }
  }
}
