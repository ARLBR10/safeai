// Modules and Packages
import Express from "express";
import { PrismaClient } from "@prisma/client";
import APIModule from "./Modules";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient()

// Interfaces/Types

interface WebServer_Config {
  Port: number;
}

// Main Class
export default class WebServer {
  Port: number;
  App!: Express.Application;

  constructor(Config: WebServer_Config) {
    this.Port = Config.Port;
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
    fs.readdirSync(Path).forEach(async (file: string) => {
      try {
        const ModuleFile = await import(
          "../modules/root"
        ); /* (await import(path.join(Path, file))) as APIModule; */
        const ModuleClass = ModuleFile.default || ModuleFile;
        const Module = new ModuleClass(this);

        this.App.use(
          `/${Module.Path || file}`,
          Module.CreateRouter(Module.Routes)
        );
      } catch (err) {
        console.error(`Failed to load module ${file}:`, err);
      }
    });
  }
}