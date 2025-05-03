export interface ServerConfigSchema {
  WebServer: {
    Port: number;
    Modules: {
      Path: string;
    };
    CorsPolicy?: {
      origin?: any;
      optionsSuccessStatus?: number;
      methods?: any;
      allowedHeaders?: any;
      exposedHeaders?: any;
      credentials?: boolean;
      maxAge?: number;
      preflightContinue: any;
    }
  }
}

export interface ConfigSchema {
  [key: string]: ServerConfigSchema;
}
