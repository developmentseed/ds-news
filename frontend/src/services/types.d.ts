import {} from "typesafe-actions";
import { services } from "./index";

declare module "typesafe-actions" {
  export type Services = typeof services;
}
