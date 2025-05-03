// Imports/Libs
import Consola, { InputLogObject } from "consola";
require('dotenv').config()

// Interfaces/Types/Enums
export type LogType =
  // Level 0
  | "silent" // -999
  | "fatal"
  | "error"
  // Level 1
  | "warn"
  // Level 2
  | "log"
  // Level 3
  | "info"
  | "success"
  | "fail"
  | "ready"
  | "start"
  | "box"
  // Verbose
  | "debug" // 4
  | "trace" // 5
  | "verbose"; // +999

// Config
const Debug = process.env.DEBUG == "true"

if (Debug) {
  Consola.level = 5
}

// Exports
export default function Logger(Type: LogType, Message: InputLogObject | string | any) {
  if (Type != 'box') {
    if (typeof Message == "string") {
      Message = `${Type.toUpperCase()}: ${Message}`;
    } else if (Message.message) {
      Message = `${Type.toUpperCase()}: ${Message.message}`;
    };
  }

  return (Consola[Type] as (msg: any) => void)(Message);
}