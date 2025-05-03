import { ConfigSchema } from "../Structures/Config";

// Config
const Config = {
  Development: {
    WebServer: {
      Port: 3333,
      Modules: {
        Path: "src/Modules/",
      },
    },
  },
} as unknown as ConfigSchema;

export default Config;
