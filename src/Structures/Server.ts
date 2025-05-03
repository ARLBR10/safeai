// Modules and Packages
import Express from "express";
import { PrismaClient } from "@prisma/client";
import APIModule from "./Modules";
import * as fs from "fs";
import * as path from "path";
import { ServerConfigSchema } from "./Config";

const prisma = new PrismaClient();

import Logger from "../Tools/logger";
import { info } from "console";

// Interfaces/Types

// Main Class
export default class WebServer {
  App!: Express.Application;
  Config: ServerConfigSchema;

  constructor(Config: ServerConfigSchema) {
    this.Config = Config;
    this.Init();
  }

  /**
   * Initialize the Express WebApp
   *
   * @returns none
   */
  Init() {
    this.App = Express();
    this.App.use(Express.json());

    Logger("box", "Staring SafeAI Backend. Powered by ExpressJS")
  }

  /**
   * Initialize and connect Database
   *
   * @returns none
   */
  async ConnectToPrisma() {
    await prisma.$connect();
    Logger("start", "Prisma connected to database.");
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
            `/${Module.Path}`,
            Module.CreateRouter(Module.RegisterRoutes())
          );
        }
        Logger("success", `Loaded Module '${Module.About?.Description}' at ${`${Path}/${file}`}.`);
      } catch (err) {
        Logger("warn", `Module non-existent at ${`${Path}/${file}`}.`);
        Logger(
          "error", err
        );
      }
    }
  }
}
